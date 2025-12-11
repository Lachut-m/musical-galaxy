"use client";

import { useState, useEffect, useRef } from "react";

// --- KONFIGURACJA ---
const TOTAL_ROUNDS = 15;
const ROUND_TIME = 30;

// --- GENERATIVE ART (Zamiast psujących się zdjęć) ---
// Używamy nowoczesnych gradientów, które wyglądają jak wygenerowane przez AI
const CATEGORIES_LIST = [
  { 
    id: 'polski-rap-modern', name: '🇵🇱 Polski Rap (New)', 
    gradient: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)', 
    icon: '🎤'
  },
  { 
    id: 'usa-rap-modern', name: '🇺🇸 USA Rap (Top)', 
    gradient: 'linear-gradient(135deg, #11998e, #38ef7d)', 
    icon: '💸'
  },
  { 
    id: 'usa-rap-classics', name: '👑 Old School Rap', 
    gradient: 'linear-gradient(135deg, #cb2d3e, #ef473a)', 
    icon: '📻'
  },
  { 
    id: 'rock-legends', name: '🎸 Rock Legends', 
    gradient: 'linear-gradient(135deg, #000000, #434343)', 
    icon: '🤘'
  },
  { 
    id: 'polski-rock', name: '🇵🇱 Polski Rock', 
    gradient: 'linear-gradient(135deg, #ff00cc, #333399)', 
    icon: '🥁'
  },
  { 
    id: 'pop-global-now', name: '✨ Global Pop', 
    gradient: 'linear-gradient(135deg, #8E2DE2, #4A00E0)', 
    icon: '💃'
  },
  { 
    id: 'tiktok-viral', name: '📱 TikTok Hity', 
    gradient: 'linear-gradient(135deg, #00F260, #0575E6)', 
    icon: '🎵'
  },
];

const ARTIST_CATEGORIES = [
  { id: 'artist-eminem', name: 'Eminem', gradient: 'linear-gradient(to right, #232526, #414345)', icon: '🧔🏻‍♂️' },
  { id: 'artist-weeknd', name: 'The Weeknd', gradient: 'linear-gradient(to right, #ed213a, #93291e)', icon: '🕶️' },
  { id: 'artist-sanah', name: 'Sanah', gradient: 'linear-gradient(to right, #ff9a9e, #fecfef)', icon: '🎻' },
  { id: 'artist-queen', name: 'Queen', gradient: 'linear-gradient(to right, #f12711, #f5af19)', icon: '👑' },
  { id: 'artist-taco', name: 'Taco Hemingway', gradient: 'linear-gradient(to right, #2c3e50, #4ca1af)', icon: '🍷' },
];

// --- LOGIKA DOPASOWANIA (SUPER LUŹNA) ---

const levenshteinDistance = (a: string, b: string) => {
  const matrix = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) == a.charAt(j - 1)) matrix[i][j] = matrix[i - 1][j - 1];
      else matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1));
    }
  }
  return matrix[b.length][a.length];
};

const normalize = (str: string) => str.toLowerCase().trim().replace(/[^a-z0-9 ]/g, "");

// Funkcja sprawdzająca
const isSingleMatch = (input: string, target: string) => {
  const cleanInput = normalize(input);
  const cleanTarget = normalize(target);

  if (!cleanInput || !cleanTarget) return false;
  
  // 1. CZY WPISANO POPRAWNĄ FRAZĘ GDZIEKOLWIEK?
  // Target: "Ale jazz"
  // Input: "ale jazz hardkorowo pada deszcz" -> TRUE
  if (cleanInput.includes(cleanTarget)) return true;
  
  // 2. CZY TARGET ZAWIERA INPUT? (dla odwrotnych sytuacji)
  // Target: "Lose Yourself"
  // Input: "lose your" -> TRUE (jeśli wpisano min. 4 znaki)
  if (cleanTarget.includes(cleanInput) && cleanInput.length > 3) return true;
  
  // 3. LITERÓWKI
  if (Math.abs(cleanInput.length - cleanTarget.length) < 5) {
      const distance = levenshteinDistance(cleanInput, cleanTarget);
      // Bardzo wyrozumiały algorytm (1 błąd na 3 litery)
      return distance <= Math.floor(cleanTarget.length / 3.0);
  }
  return false;
};

// GLÓWNA FUNKCJA LOGICZNA
const checkMatch = (userInput: string, targetString: string, type: 'ARTIST' | 'TITLE') => {
  const rawInput = userInput;

  if (type === 'TITLE') {
    // Czyszczenie tytułu (wyrzucamy featy, nawiasy)
    const cleanTitle = targetString
      .split('(')[0] 
      .split('[')[0] 
      .split('-')[0] 
      .split(/feat\./i)[0] 
      .trim();
    
    return isSingleMatch(rawInput, cleanTitle);
  }

  if (type === 'ARTIST') {
    const separators = /[,&]|feat\.|ft\.| x /i;
    const artists = targetString.split(separators).map(a => a.trim());
    return artists.some(artist => isSingleMatch(rawInput, artist));
  }

  return false;
};

const checkComboMatch = (userInput: string, title: string, artist: string) => {
    const artistMatch = checkMatch(userInput, artist, 'ARTIST');
    const titleMatch = checkMatch(userInput, title, 'TITLE');
    return artistMatch && titleMatch;
};


export default function Home() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const [appMode, setAppMode] = useState<"MENU" | "GAME" | "SUMMARY">("MENU");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const [hasStarted, setHasStarted] = useState(false);
  const [songsPool, setSongsPool] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(ROUND_TIME);
  const [gameState, setGameState] = useState<"LOADING" | "PLAYING" | "SUCCESS" | "FAILED">("LOADING");
  const [feedback, setFeedback] = useState("");
  
  const [guessTitle, setGuessTitle] = useState(false);
  const [guessArtist, setGuessArtist] = useState(false);
  const [userGuess, setUserGuess] = useState("");

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setAppMode("GAME");
    setScore(0);
    setCurrentIndex(0);
    setHasStarted(false);
    fetchMusic(categoryId);
  };

  const fetchMusic = async (categoryId: string) => {
    setGameState("LOADING");
    setFeedback("Tworzenie playlisty...");
    try {
      const res = await fetch(`/api/quiz?category=${categoryId}`);
      if (!res.ok) throw new Error("Błąd");
      const data = await res.json();
      const validSongs = data.results.filter((item: any) => item.previewUrl && item.trackName);
      if (validSongs.length >= 5) setSongsPool(validSongs.slice(0, TOTAL_ROUNDS));
      else setFeedback("Za mało utworów w tej kategorii.");
    } catch (error) {
      console.error(error);
      setFeedback("Błąd pobierania.");
    }
  };

  const backToMenu = () => {
    setAppMode("MENU");
    if (audioRef.current) audioRef.current.pause();
  };

  const handleStartGame = () => {
    setHasStarted(true);
    playRound(0);
  };

  const playRound = (index: number) => {
    if (index >= songsPool.length) {
      setAppMode("SUMMARY");
      if (audioRef.current) audioRef.current.pause();
      return;
    }

    const song = songsPool[index];
    const isArtistMode = selectedCategory?.startsWith('artist-');

    setUserGuess("");
    setFeedback("");
    setGuessTitle(false);
    setGuessArtist(!!isArtistMode); 
    setGameState("PLAYING");
    setTimeLeft(ROUND_TIME);
    
    setTimeout(() => inputRef.current?.focus(), 100);

    if (audioRef.current && song.previewUrl) {
      audioRef.current.src = song.previewUrl;
      audioRef.current.load();
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) playPromise.catch(e => console.log("Autoplay:", e));
    }
  };

  const nextRound = () => {
    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);
    playRound(nextIndex);
  };

  useEffect(() => {
    if (gameState !== "PLAYING") return;
    if (timeLeft <= 0) {
      setGameState("FAILED");
      setFeedback(`⏰ Koniec czasu!`);
      if (audioRef.current) audioRef.current.pause();
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, gameState]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && (gameState === "SUCCESS" || gameState === "FAILED")) nextRound();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState, songsPool, currentIndex]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (gameState !== "PLAYING") return;

    const targetSong = songsPool[currentIndex];
    let somethingGuessed = false;
    let newTitleState = guessTitle;
    let newArtistState = guessArtist;
    let pointsGained = 0;

    const isCombo = checkComboMatch(userGuess, targetSong.trackName, targetSong.artistName);
    
    if (isCombo) {
        if (!newTitleState) { newTitleState = true; pointsGained++; }
        if (!newArtistState) { newArtistState = true; pointsGained++; }
        somethingGuessed = true;
    } else {
        if (!newTitleState && checkMatch(userGuess, targetSong.trackName, 'TITLE')) {
            newTitleState = true;
            pointsGained++;
            somethingGuessed = true;
            setFeedback("🎵 Dobry Tytuł!");
        }
        if (!newArtistState && checkMatch(userGuess, targetSong.artistName, 'ARTIST')) {
            newArtistState = true;
            pointsGained++;
            somethingGuessed = true;
            setFeedback("🎤 Dobry Artysta!");
        }
    }

    if (somethingGuessed) {
      setGuessTitle(newTitleState);
      setGuessArtist(newArtistState);
      setScore(s => s + pointsGained);
      setUserGuess("");

      if (newTitleState && newArtistState) {
        setGameState("SUCCESS");
        setFeedback("🏆 BRAWO! KOMPLET!");
        if (audioRef.current) audioRef.current.pause();
      }
    } else {
      setFeedback("❌ Pudło...");
      const form = document.getElementById("guess-form");
      form?.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(-10px)' }, { transform: 'translateX(10px)' }, { transform: 'translateX(0)' }], { duration: 300 });
    }
  };

  const currentSong = songsPool[currentIndex];

  // Karta Kategorii z Gradientem (GENERATIVE ART)
  const CategoryCard = ({ item, onClick }: { item: any, onClick: () => void }) => {
    return (
       <div onClick={onClick} style={{ 
         position: "relative", borderRadius: "15px", overflow: "hidden", 
         cursor: "pointer", height: "140px", boxShadow: "0 10px 20px rgba(0,0,0,0.3)", 
         transition: "transform 0.3s",
         background: item.gradient // Używamy gradientu zamiast zdjęcia
       }} 
       onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"} 
       onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}>
          
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "10px" }}>
            <div style={{ fontSize: "3rem", marginBottom: "5px", textShadow: "0 5px 10px rgba(0,0,0,0.3)" }}>{item.icon}</div>
            <h3 style={{ fontSize: "1.2rem", color: "white", textShadow: "0 2px 4px rgba(0,0,0,0.5)", fontWeight: "bold", margin: 0 }}>{item.name}</h3>
          </div>
       </div>
    );
  };

  // Karta Artysty (Okrągła)
  const ArtistCard = ({ item, onClick }: { item: any, onClick: () => void }) => {
    return (
      <div onClick={onClick} style={{ 
        position: "relative", borderRadius: "50%", overflow: "hidden", 
        cursor: "pointer", width: "120px", height: "120px", 
        boxShadow: "0 5px 15px rgba(0,0,0,0.3)", transition: "transform 0.3s",
        background: item.gradient
      }} 
      onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"} 
      onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}>
        
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
          <span style={{ fontSize: "2.5rem" }}>{item.icon}</span>
          <span style={{ color: "white", fontWeight: "bold", textShadow: "0 2px 4px rgba(0,0,0,0.5)", fontSize: "0.8rem", marginTop: "5px" }}>{item.name}</span>
        </div>
      </div>
    );
  };

  return (
    <main style={{ background: "linear-gradient(135deg, #1e1e24, #2d3436)", minHeight: "100vh", color: "#dcddde", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "sans-serif", padding: "20px" }}>
      <audio ref={audioRef} />

      {appMode === "MENU" && (
        <div style={{width: "100%", maxWidth: "1000px", textAlign: "center"}}>
          <h1 style={{ fontSize: "3.5rem", color: "white", marginBottom: "10px", textShadow: "0 0 20px rgba(88, 101, 242, 0.5)" }}>Music Galaxy 🌌</h1>
          
          <h2 style={{textAlign: "left", marginLeft: "10px", marginTop: "30px", borderBottom: "2px solid #5865F2", display: "inline-block", paddingBottom: "5px"}}>Gatunki</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "20px", marginTop: "20px" }}>
            {CATEGORIES_LIST.map(cat => (
              <CategoryCard key={cat.id} item={cat} onClick={() => handleCategorySelect(cat.id)} />
            ))}
          </div>

          <h2 style={{textAlign: "left", marginLeft: "10px", marginTop: "40px", borderBottom: "2px solid #e91e63", display: "inline-block", paddingBottom: "5px"}}>Top Artyści</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginTop: "20px", justifyContent: "center" }}>
            {ARTIST_CATEGORIES.map(cat => (
              <ArtistCard key={cat.id} item={cat} onClick={() => handleCategorySelect(cat.id)} />
            ))}
          </div>
        </div>
      )}

      {appMode === "SUMMARY" && (
        <div style={{textAlign: "center", animation: "fadeIn 0.5s"}}>
           <h1 style={{fontSize: "3rem", marginBottom: "10px"}}>Koniec Gry! 🏁</h1>
           <div style={{fontSize: "1.5rem", marginBottom: "30px"}}>
             Twój wynik: <strong style={{color: "#5865F2"}}>{score}</strong> / {songsPool.length * 2}
           </div>
           <button onClick={backToMenu} style={{ padding: "15px 40px", fontSize: "1.2rem", background: "#3ba55c", color: "white", border: "none", borderRadius: "50px", cursor: "pointer" }}>
             🏠 Wróć do Menu
           </button>
        </div>
      )}

      {appMode === "GAME" && (
        <>
          <div style={{ marginBottom: "1rem", textAlign: "center", width: "100%", position: "relative", maxWidth: "600px" }}>
            <button onClick={backToMenu} style={{ position: "absolute", left: 0, top: "5px", background: "rgba(255,255,255,0.1)", border: "none", color: "white", padding: "8px 15px", borderRadius: "20px", cursor: "pointer", fontSize: "0.9rem" }}>⬅ Menu</button>
            <h1 style={{ margin: 0, fontSize: "1.5rem", color: "#fff" }}>
               Utwór {currentIndex + 1} / {songsPool.length > 0 ? songsPool.length : "?"}
            </h1>
            <div style={{ fontSize: "1.2rem", marginTop: "5px", color: "#5865F2", fontWeight: "bold" }}>Wynik: {score}</div>
          </div>

          {!hasStarted ? (
            <div style={{ textAlign: "center", animation: "fadeIn 0.5s" }}>
              <div style={{ background: "#2d3436", padding: "3rem", borderRadius: "20px", boxShadow: "0 10px 30px rgba(0,0,0,0.5)" }}>
                {songsPool.length > 0 ? (
                  <>
                    <h2>Playlista gotowa!</h2>
                    <p style={{marginBottom: "2rem", color: "#aaa"}}>Ilość utworów: {songsPool.length}</p>
                    <button onClick={handleStartGame} style={{ padding: "15px 50px", fontSize: "1.5rem", background: "#5865F2", color: "white", border: "none", borderRadius: "50px", cursor: "pointer", fontWeight: "bold" }}>▶️ START</button>
                  </>
                ) : (
                   <div style={{color: "white"}}><div style={{fontSize: "3rem", marginBottom: "1rem"}}>⏳</div><h3>{feedback}</h3></div>
                )}
              </div>
            </div>
          ) : (
            <>
              <div style={{ width: "100%", maxWidth: "500px", height: "8px", background: "#40444b", borderRadius: "5px", overflow: "hidden", marginBottom: "20px" }}>
                <div style={{ height: "100%", width: `${(timeLeft / ROUND_TIME) * 100}%`, background: timeLeft < 5 ? "#ed4245" : "#5865F2", transition: "width 1s linear" }}></div>
              </div>

              <div style={{ background: "#2d3436", padding: "2rem", borderRadius: "20px", boxShadow: "0 10px 30px rgba(0,0,0,0.5)", width: "90%", maxWidth: "500px", textAlign: "center" }}>
                <div style={{ marginBottom: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
                  <div style={{ background: guessArtist ? "#27ae60" : "rgba(0,0,0,0.2)", padding: "12px", borderRadius: "10px", border: guessArtist ? "1px solid #27ae60" : "1px solid #444", transition: "0.3s" }}>
                    <span style={{ fontSize: "0.75rem", textTransform: "uppercase", opacity: 0.7, letterSpacing: "1px" }}>Wykonawca</span><br/><strong style={{ fontSize: "1.2rem", color: "white" }}>{guessArtist || gameState !== "PLAYING" ? currentSong.artistName : "???"}</strong>
                  </div>
                  <div style={{ background: guessTitle ? "#27ae60" : "rgba(0,0,0,0.2)", padding: "12px", borderRadius: "10px", border: guessTitle ? "1px solid #27ae60" : "1px solid #444", transition: "0.3s" }}>
                    <span style={{ fontSize: "0.75rem", textTransform: "uppercase", opacity: 0.7, letterSpacing: "1px" }}>Tytuł</span><br/><strong style={{ fontSize: "1.2rem", color: "white" }}>{guessTitle || gameState !== "PLAYING" ? currentSong.trackName : "???"}</strong>
                  </div>
                </div>

                {gameState === "PLAYING" && (
                  <>
                    <form id="guess-form" onSubmit={handleSubmit}>
                      <input ref={inputRef} type="text" value={userGuess} onChange={(e) => setUserGuess(e.target.value)} placeholder="Wpisz tytuł lub wykonawcę..." autoComplete="off" style={{ width: "100%", padding: "15px", borderRadius: "10px", border: "none", background: "rgba(0,0,0,0.3)", color: "white", fontSize: "1.2rem", outline: "none", textAlign: "center" }} />
                      <div style={{ marginTop: "10px", color: "#ed4245", minHeight: "24px", fontWeight: "bold" }}>{feedback}</div>
                    </form>
                    <button onClick={() => setTimeLeft(0)} type="button" style={{ marginTop: "20px", background: "transparent", border: "1px solid #ed4245", color: "#ed4245", padding: "8px 15px", borderRadius: "5px", cursor: "pointer", fontSize: "0.9rem", opacity: 0.8 }}>⏭️ Pomiń</button>
                  </>
                )}

                {(gameState === "SUCCESS" || gameState === "FAILED") && (
                  <div style={{ animation: "fadeIn 0.5s" }}>
                    <h2 style={{ color: gameState === "SUCCESS" ? "#2ecc71" : "#e74c3c", marginTop: 0 }}>{gameState === "SUCCESS" ? "🔥 Brawo!" : "❌ Koniec czasu"}</h2>
                    {currentSong?.artworkUrl100 && <img src={currentSong.artworkUrl100} alt="Cover" style={{ borderRadius: "15px", margin: "15px 0", boxShadow: "0 5px 20px rgba(0,0,0,0.6)", width: "150px", height: "150px" }} />}
                    <button onClick={nextRound} style={{ marginTop: "15px", padding: "12px 30px", background: "#5865F2", color: "white", border: "none", borderRadius: "10px", cursor: "pointer", fontSize: "1.1rem", fontWeight: "bold", width: "100%", transition: "0.2s" }}>Następna Runda (ENTER) ➡️</button>
                  </div>
                )}
              </div>
            </>
          )}
        </>
      )}
    </main>
  );
}