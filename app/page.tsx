"use client";

import { useState, useEffect, useRef } from "react";
import { Space_Grotesk } from 'next/font/google'

// STYL AESTHETIC
const spaceFont = Space_Grotesk({ 
  weight: '700', 
  subsets: ['latin'],
})

// --- KONFIGURACJA ---
const ROUND_TIME = 30;

// --- DANE (Czyste nazwy, bez PL/US) ---
const CATEGORIES_LIST = [
  { id: 'polski-rap-modern', name: 'Polski Rap', gradient: 'linear-gradient(135deg, #141E30, #243B55)', icon: '🎤' },
  { id: 'dad-music', name: 'Dad Music', gradient: 'linear-gradient(135deg, #2C3E50, #4CA1AF)', icon: '🎸' },
  { id: 'usa-rap-modern', name: 'USA Rap', gradient: 'linear-gradient(135deg, #1D4350, #A43931)', icon: '💸' },
  { id: 'usa-rap-classics', name: 'Old School Rap', gradient: 'linear-gradient(135deg, #480048, #C04848)', icon: '📻' },
  { id: 'rock-legends', name: 'Rock Legends', gradient: 'linear-gradient(135deg, #232526, #414345)', icon: '🤘' },
  { id: 'polski-rock', name: 'Polski Rock', gradient: 'linear-gradient(135deg, #3D065F, #8E05C2)', icon: '🥁' },
  { id: 'pop-global-now', name: 'Global Pop', gradient: 'linear-gradient(135deg, #360033, #0b8793)', icon: '💃' },
  { id: 'tiktok-viral', name: 'TikTok Hity', gradient: 'linear-gradient(135deg, #1A2980, #26D0CE)', icon: '🎵' },
];

const ARTIST_CATEGORIES = [
  { id: 'artist-kendrick', name: 'Kendrick Lamar', gradient: 'linear-gradient(to right, #000000, #434343)', icon: '👑' },
  { id: 'artist-eminem', name: 'Eminem', gradient: 'linear-gradient(to right, #232526, #414345)', icon: '🧔🏻‍♂️' },
  { id: 'artist-kanye', name: 'Kanye West', gradient: 'linear-gradient(to right, #3C3B3F, #605C3C)', icon: '🐻' },
  { id: 'artist-travis', name: 'Travis Scott', gradient: 'linear-gradient(to right, #56ab2f, #a8e063)', icon: '🌵' },
  { id: 'artist-weeknd', name: 'The Weeknd', gradient: 'linear-gradient(to right, #480048, #C04848)', icon: '🕶️' },
  { id: 'artist-otsochodzi', name: 'Otsochodzi', gradient: 'linear-gradient(to right, #2980B9, #6DD5FA)', icon: '🧢' },
  { id: 'artist-podsiadlo', name: 'Dawid Podsiadło', gradient: 'linear-gradient(to right, #24C6DC, #514A9D)', icon: '🥸' },
  { id: 'artist-sanah', name: 'Sanah', gradient: 'linear-gradient(to right, #BA5370, #F4E2D8)', icon: '🎻' },
  { id: 'artist-taco', name: 'Taco Hemingway', gradient: 'linear-gradient(to right, #000428, #004e92)', icon: '🍷' },
  { id: 'artist-kukon', name: 'Kukon', gradient: 'linear-gradient(to right, #200122, #6f0000)', icon: '🌑' },
  { id: 'artist-queen', name: 'Queen', gradient: 'linear-gradient(to right, #870000, #190A05)', icon: '👑' },
  { id: 'artist-bambi', name: 'bambi', gradient: 'linear-gradient(to right, #fc00ff, #00dbde)', icon: '💖' },
];

// --- INTERAKTYWNY NAPIS ---
const InteractiveTitle = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;

    canvas.width = 1000;
    canvas.height = 400;
    
    const mouse = { x: -1000, y: -1000, radius: 30 };

    class Particle {
      x: number; y: number; baseX: number; baseY: number; size: number; density: number;
      constructor(x: number, y: number) {
        this.x = x; this.y = y;
        this.baseX = x; this.baseY = y;
        this.size = 2;
        this.density = (Math.random() * 30) + 5;
      }
      draw() {
        if (!ctx) return;
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }
      update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxDistance = mouse.radius;
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;

        if (distance < mouse.radius) {
          this.x -= directionX * 5;
          this.y -= directionY * 5;
        } else {
          if (this.x !== this.baseX) { let dx = this.x - this.baseX; this.x -= dx / 10; }
          if (this.y !== this.baseY) { let dy = this.y - this.baseY; this.y -= dy / 10; }
        }
      }
    }

    const init = () => {
      particles = [];
      ctx.fillStyle = 'white';
      ctx.font = `700 110px ${spaceFont.style.fontFamily}, sans-serif`; 
      ctx.textAlign = 'center';
      ctx.fillText('MUSIC GALAXY', canvas.width / 2, 250); 

      const textCoordinates = ctx.getImageData(0, 0, canvas.width, canvas.height);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let y = 0, y2 = textCoordinates.height; y < y2; y++) {
        for (let x = 0, x2 = textCoordinates.width; x < x2; x++) {
          if (textCoordinates.data[(y * 4 * textCoordinates.width) + (x * 4) + 3] > 128) {
             if (x % 3 === 0 && y % 3 === 0) { 
               particles.push(new Particle(x, y));
             }
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].draw();
        particles[i].update();
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    };
    const handleTouchMove = (e: TouchEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.touches[0].clientX - rect.left;
        mouse.y = e.touches[0].clientY - rect.top;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div style={{ width: '100%', overflow: 'hidden', display: 'flex', justifyContent: 'center', marginBottom: '-50px', marginTop: '-50px', position: 'relative', zIndex: 2 }}>
      <canvas ref={canvasRef} style={{ width: '100%', maxWidth: '1000px', height: '400px' }} />
    </div>
  );
};


// --- LOGIKA GRY ---
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
const isSingleMatch = (input: string, target: string) => {
  const cleanInput = normalize(input);
  const cleanTarget = normalize(target);
  if (!cleanInput || !cleanTarget) return false;
  if (cleanInput.includes(cleanTarget)) return true;
  if (cleanTarget.includes(cleanInput) && cleanInput.length > 3) return true;
  if (Math.abs(cleanInput.length - cleanTarget.length) < 5) {
      const distance = levenshteinDistance(cleanInput, cleanTarget);
      return distance <= Math.floor(cleanTarget.length / 3.0);
  }
  return false;
};
const checkMatch = (userInput: string, targetString: string, type: 'ARTIST' | 'TITLE') => {
  const rawInput = userInput;
  if (type === 'TITLE') {
    const cleanTitle = targetString.split('(')[0].split('[')[0].split('-')[0].split(/feat\./i)[0].trim();
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
const getTimerColor = (timeLeft: number) => {
  const percentage = timeLeft / ROUND_TIME;
  if (percentage > 0.66) return '#2ecc71';
  if (percentage > 0.33) return '#f1c40f';
  if (percentage > 0.15) return '#e67e22';
  return '#e74c3c';
};

export default function Home() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
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
  // DYNAMICZNY LIMIT RUND
  const [roundsTarget, setRoundsTarget] = useState(15);

  // --- EFEKT TŁA ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const stars: {x: number, y: number, vx: number, vy: number, size: number, alpha: number}[] = [];
    const numStars = 180;
    const connectionDistance = 120;
    const mouse = { x: -1000, y: -1000 };

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2.5,
        alpha: Math.random()
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      stars.forEach((star, i) => {
        star.x += star.vx; star.y += star.vy;
        if (star.x < 0 || star.x > width) star.vx *= -1;
        if (star.y < 0 || star.y > height) star.vy *= -1;
        star.alpha += (Math.random() - 0.5) * 0.05;
        if (star.alpha < 0.2) star.alpha = 0.2; if (star.alpha > 1) star.alpha = 1;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fill();

        for (let j = i + 1; j < stars.length; j++) {
          const other = stars[j];
          const dx = star.x - other.x;
          const dy = star.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(star.x, star.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.15 * (1 - dist / connectionDistance)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
        const dx = star.x - mouse.x;
        const dy = star.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180) {
            ctx.beginPath();
            ctx.moveTo(star.x, star.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(88, 101, 242, ${0.6 * (1 - dist / 180)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
        }
      });
      requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => { width = window.innerWidth; height = window.innerHeight; canvas.width = width; canvas.height = height; };
    const handleMouseMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    return () => { window.removeEventListener('resize', handleResize); window.removeEventListener('mousemove', handleMouseMove); };
  }, []);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setAppMode("GAME");
    setScore(0);
    setCurrentIndex(0);
    setSongsPool([]); 
    setHasStarted(false);
    
    // Ustawienie liczby rund (5 dla artystów, 15 dla reszty)
    if (categoryId.startsWith('artist-')) {
        setRoundsTarget(5);
    } else {
        setRoundsTarget(15);
    }

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
      
      const target = categoryId.startsWith('artist-') ? 5 : 15;

      if (validSongs.length >= target) {
          setSongsPool(validSongs.slice(0, target));
      } else if (validSongs.length >= 5) {
          setSongsPool(validSongs);
      } else {
          setFeedback("Błąd komunikacji z bazą. Odśwież.");
      }
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

  useEffect(() => {
    const handleEnterStart = (e: KeyboardEvent) => {
      if (e.key === "Enter" && !hasStarted && songsPool.length > 0 && appMode === "GAME") {
        handleStartGame();
      }
    };
    window.addEventListener("keydown", handleEnterStart);
    return () => window.removeEventListener("keydown", handleEnterStart);
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasStarted, songsPool, appMode]);

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

  const handleSkip = () => {
    setTimeLeft(0);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && (gameState === "SUCCESS" || gameState === "FAILED")) nextRound();
      if (gameState === "PLAYING" && e.key === 'Escape') handleSkip();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState, songsPool, currentIndex]);

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
            newTitleState = true; pointsGained++; somethingGuessed = true; setFeedback("🎵 Dobry Tytuł!");
        }
        if (!newArtistState && checkMatch(userGuess, targetSong.artistName, 'ARTIST')) {
            newArtistState = true; pointsGained++; somethingGuessed = true; setFeedback("🎤 Dobry Artysta!");
        }
    }

    if (somethingGuessed) {
      setGuessTitle(newTitleState);
      setGuessArtist(newArtistState);
      setScore(s => s + pointsGained);
      setUserGuess("");
      if (newTitleState && newArtistState) {
        setGameState("SUCCESS"); setFeedback("🏆 BRAWO! KOMPLET!"); if (audioRef.current) audioRef.current.pause();
      }
    } else {
      setFeedback("❌ Pudło...");
      const form = document.getElementById("guess-form");
      form?.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(-10px)' }, { transform: 'translateX(10px)' }, { transform: 'translateX(0)' }], { duration: 300 });
    }
  };

  const currentSong = songsPool[currentIndex];

  const CategoryCard = ({ item, onClick }: { item: any, onClick: () => void }) => {
    return (
       <div onClick={onClick} style={{ position: "relative", borderRadius: "15px", overflow: "hidden", cursor: "pointer", height: "140px", boxShadow: "0 10px 20px rgba(0,0,0,0.3)", transition: "transform 0.3s", background: item.gradient, backdropFilter: "blur(5px)", border: "1px solid rgba(255,255,255,0.1)" }} onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"} onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}>
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "10px" }}>
            <div style={{ fontSize: "3rem", marginBottom: "5px", textShadow: "0 5px 10px rgba(0,0,0,0.3)" }}>{item.icon}</div>
            <h3 style={{ fontSize: "1.2rem", color: "white", textShadow: "0 2px 4px rgba(0,0,0,0.5)", fontWeight: "bold", margin: 0 }}>{item.name}</h3>
          </div>
       </div>
    );
  };

  const ArtistCard = ({ item, onClick }: { item: any, onClick: () => void }) => {
    return (
      <div onClick={onClick} style={{ position: "relative", borderRadius: "50%", overflow: "hidden", cursor: "pointer", width: "120px", height: "120px", boxShadow: "0 5px 15px rgba(0,0,0,0.3)", transition: "transform 0.3s", background: item.gradient, border: "1px solid rgba(255,255,255,0.1)" }} onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"} onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
          <span style={{ fontSize: "2.5rem" }}>{item.icon}</span>
          <span style={{ color: "white", fontWeight: "bold", textShadow: "0 2px 4px rgba(0,0,0,0.5)", fontSize: "0.8rem", marginTop: "5px" }}>{item.name}</span>
        </div>
      </div>
    );
  };

  return (
    <main style={{ 
      background: "radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%)", 
      minHeight: "100vh", color: "#dcddde", display: "flex", flexDirection: "column", fontFamily: "sans-serif", position: "relative", overflow: "hidden" 
    }}>
      <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }} />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "20px", width: "100%", position: "relative", zIndex: 1 }}>
      <audio ref={audioRef} />

      {appMode === "MENU" && (
        <div style={{width: "100%", maxWidth: "1000px", textAlign: "center"}}>
          
          <InteractiveTitle />

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
             Twój wynik: <strong style={{color: "#5865F2"}}>{score}</strong> / {songsPool.length * (selectedCategory?.startsWith('artist-') ? 1 : 2)}
           </div>
           <button onClick={backToMenu} style={{ padding: "15px 40px", fontSize: "1.2rem", background: "#3ba55c", color: "white", border: "none", borderRadius: "50px", cursor: "pointer" }}>🏠 Wróć do Menu</button>
        </div>
      )}

      {appMode === "GAME" && (
        <>
          <div style={{ marginBottom: "1rem", textAlign: "center", width: "100%", position: "relative", maxWidth: "600px" }}>
            <button onClick={backToMenu} style={{ position: "absolute", left: 0, top: "5px", background: "rgba(255,255,255,0.1)", border: "none", color: "white", padding: "8px 15px", borderRadius: "20px", cursor: "pointer", fontSize: "0.9rem" }}>⬅ Menu</button>
            <h1 style={{ margin: 0, fontSize: "1.5rem", color: "#fff" }}>Utwór {currentIndex + 1} / {songsPool.length}</h1>
            <div style={{ fontSize: "1.2rem", marginTop: "5px", color: "#5865F2", fontWeight: "bold" }}>Wynik: {score}</div>
          </div>

          {!hasStarted ? (
            <div style={{ textAlign: "center", animation: "fadeIn 0.5s" }}>
              <div style={{ background: "rgba(45, 52, 54, 0.8)", backdropFilter: "blur(10px)", padding: "3rem", borderRadius: "20px", boxShadow: "0 10px 30px rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.1)" }}>
                {songsPool.length > 0 ? (
                  <>
                    <h2>Playlista gotowa!</h2>
                    <p style={{marginBottom: "2rem", color: "#aaa"}}>Ilość utworów: {songsPool.length}</p>
                    <button onClick={handleStartGame} style={{ padding: "15px 50px", fontSize: "1.5rem", background: "#5865F2", color: "white", border: "none", borderRadius: "50px", cursor: "pointer", fontWeight: "bold", boxShadow: "0 0 20px rgba(88, 101, 242, 0.5)" }}>▶️ START</button>
                  </>
                ) : (
                   <div style={{color: "white"}}><div style={{fontSize: "3rem", marginBottom: "1rem"}}>⏳</div><h3>{feedback}</h3></div>
                )}
              </div>
            </div>
          ) : (
            <>
              <div style={{ width: "100%", maxWidth: "500px", height: "8px", background: "rgba(64, 68, 75, 0.5)", borderRadius: "5px", overflow: "hidden", marginBottom: "20px" }}>
                <div style={{ 
                  height: "100%", 
                  width: `${(timeLeft / ROUND_TIME) * 100}%`, 
                  background: getTimerColor(timeLeft), 
                  transition: "width 1s linear, background 1s linear", 
                  boxShadow: `0 0 15px ${getTimerColor(timeLeft)}`,
                  borderRadius: "10px"
                }}></div>
              </div>
              <div style={{ background: "rgba(45, 52, 54, 0.8)", backdropFilter: "blur(10px)", padding: "2rem", borderRadius: "20px", boxShadow: "0 10px 30px rgba(0,0,0,0.5)", width: "90%", maxWidth: "500px", textAlign: "center", border: "1px solid rgba(255,255,255,0.1)" }}>
                <div style={{ marginBottom: "20px", display: "flex", flexDirection: "column", gap: "15px" }}>
                  <div style={{ background: guessArtist ? "rgba(39, 174, 96, 0.8)" : "rgba(0,0,0,0.3)", padding: "12px", borderRadius: "10px", border: guessArtist ? "1px solid #27ae60" : "1px solid rgba(255,255,255,0.1)", transition: "0.3s" }}>
                    <span style={{ fontSize: "0.75rem", textTransform: "uppercase", opacity: 0.7, letterSpacing: "1px" }}>Wykonawca</span><br/><strong style={{ fontSize: "1.2rem", color: "white" }}>{guessArtist || gameState !== "PLAYING" ? currentSong.artistName : "???"}</strong>
                  </div>
                  <div style={{ background: guessTitle ? "rgba(39, 174, 96, 0.8)" : "rgba(0,0,0,0.3)", padding: "12px", borderRadius: "10px", border: guessTitle ? "1px solid #27ae60" : "1px solid rgba(255,255,255,0.1)", transition: "0.3s" }}>
                    <span style={{ fontSize: "0.75rem", textTransform: "uppercase", opacity: 0.7, letterSpacing: "1px" }}>Tytuł</span><br/><strong style={{ fontSize: "1.2rem", color: "white" }}>{guessTitle || gameState !== "PLAYING" ? currentSong.trackName : "???"}</strong>
                  </div>
                </div>
                {gameState === "PLAYING" && (
                  <>
                    <form id="guess-form" onSubmit={handleSubmit}>
                      <input 
                        ref={inputRef} 
                        type="text" 
                        value={userGuess} 
                        onChange={(e) => setUserGuess(e.target.value)} 
                        placeholder="Wpisz tytuł lub wykonawcę..." 
                        autoComplete="off" 
                        style={{ 
                          width: "100%", 
                          padding: "15px", 
                          borderRadius: "10px", 
                          background: "rgba(0,0,0,0.5)", 
                          color: "white", 
                          fontSize: "1.2rem", 
                          outline: "none", 
                          textAlign: "center", 
                          border: "1px solid rgba(255,255,255,0.2)", 
                          transition: "0.3s" 
                        }} 
                        onFocus={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"} 
                        onBlur={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"}
                      />
                      <div style={{ marginTop: "10px", color: "#ed4245", minHeight: "24px", fontWeight: "bold", textShadow: "0 0 5px rgba(237, 66, 69, 0.5)" }}>{feedback}</div>
                    </form>
                    
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", marginTop: "20px" }}>
                        <button 
                          onClick={handleSkip} 
                          type="button" 
                          style={{ 
                            background: "rgba(255, 82, 82, 0.1)", 
                            border: "1px solid #e74c3c", 
                            color: "#e74c3c", 
                            padding: "10px 25px", 
                            borderRadius: "12px", 
                            cursor: "pointer", 
                            fontSize: "0.9rem", 
                            transition: "0.3s", 
                            display: "flex", 
                            alignItems: "center", 
                            gap: "8px", 
                            boxShadow: "0 0 10px rgba(231, 76, 60, 0.2)" 
                          }}
                          onMouseEnter={(e) => {
                             e.currentTarget.style.background = "rgba(231, 76, 60, 0.3)";
                             e.currentTarget.style.boxShadow = "0 0 20px rgba(231, 76, 60, 0.6)";
                          }}
                          onMouseLeave={(e) => {
                             e.currentTarget.style.background = "rgba(255, 82, 82, 0.1)";
                             e.currentTarget.style.boxShadow = "0 0 10px rgba(231, 76, 60, 0.2)";
                          }}
                        >
                          <span>⏭️ Pomiń</span>
                          <span style={{ fontSize: "0.7rem", opacity: 0.8, border: "1px solid #e74c3c", borderRadius: "4px", padding: "1px 5px", background: "rgba(0,0,0,0.3)" }}>ESC</span>
                        </button>
                    </div>
                  </>
                )}
                {(gameState === "SUCCESS" || gameState === "FAILED") && (
                  <div style={{ animation: "fadeIn 0.5s" }}>
                    <h2 style={{ color: gameState === "SUCCESS" ? "#2ecc71" : "#e74c3c", marginTop: 0, textShadow: "0 0 10px currentColor" }}>{gameState === "SUCCESS" ? "🔥 Brawo!" : "❌ Koniec czasu"}</h2>
                    {currentSong?.artworkUrl100 && <img src={currentSong.artworkUrl100.replace('100x100', '300x300')} alt="Cover" style={{ borderRadius: "15px", margin: "15px 0", boxShadow: "0 5px 20px rgba(0,0,0,0.6)", width: "150px", height: "150px" }} />}
                    <button onClick={nextRound} style={{ marginTop: "15px", padding: "12px 30px", background: "#5865F2", color: "white", border: "none", borderRadius: "10px", cursor: "pointer", fontSize: "1.1rem", fontWeight: "bold", width: "100%", transition: "0.2s", boxShadow: "0 0 15px rgba(88, 101, 242, 0.5)" }}>Następna Runda (ENTER) ➡️</button>
                  </div>
                )}
              </div>
            </>
          )}
        </>
      )}
      </div>
      <footer style={{ width: "100%", padding: "20px", textAlign: "center", color: "#aaa", borderTop: "1px solid rgba(255,255,255,0.1)", fontSize: "0.9rem", background: "rgba(0,0,0,0.3)", backdropFilter: "blur(5px)", position: "relative", zIndex: 1 }}>
        <p style={{margin: 0}}>Stworzone przez: <strong style={{color: "#fff", textShadow: "0 0 5px rgba(255,255,255,0.5)"}}>Michał Łachut</strong> | 2025 Music Galaxy 🌌</p>
      </footer>
    </main>
  );
}