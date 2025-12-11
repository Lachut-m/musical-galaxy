"use client";

import { useRef, useEffect, useState } from "react";

interface BottomPlayerProps {
  currentSong: {
    title: string;
    artist: string;
    fileUrl?: string;
  } | null;
}

export default function BottomPlayer({ currentSong }: BottomPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Ten efekt uruchamia się zawsze, gdy zmieni się piosenka (currentSong)
  useEffect(() => {
    if (currentSong && audioRef.current) {
      // 1. Pauzujemy starą
      audioRef.current.pause();
      // 2. Ładujemy nową (to rozwiązuje problem pustego src)
      audioRef.current.load();
      // 3. Odpalamy
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.log("Autoplay zablokowany lub błąd ładowania:", error);
            setIsPlaying(false);
          });
      }
    }
  }, [currentSong]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // Jeśli nie ma wybranej piosenki, nie wyświetlaj playera
  if (!currentSong) return null;

  return (
    <div style={{
      position: "fixed",
      bottom: 0,
      left: 0,
      width: "100%",
      height: "80px",
      background: "rgba(16, 16, 32, 0.95)",
      borderTop: "1px solid #444",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 2rem",
      boxSizing: "border-box",
      zIndex: 100
    }}>
      
      {/* Niewidzialny element audio */}
      <audio 
        ref={audioRef} 
        src={currentSong.fileUrl}
        // Gdy piosenka się skończy, zmień ikonkę na pauzę
        onEnded={() => setIsPlaying(false)} 
      />

      {/* Info o utworze */}
      <div>
        <h4 style={{ margin: 0, color: "white" }}>{currentSong.title}</h4>
        <span style={{ fontSize: "0.8rem", color: "#aaa" }}>{currentSong.artist}</span>
      </div>

      {/* Przyciski */}
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <button style={btnStyle}>⏮️</button>
        
        <button 
          onClick={togglePlay} 
          style={{...btnStyle, fontSize: "2rem"}}
        >
          {isPlaying ? "⏸️" : "▶️"} 
        </button>
        
        <button style={btnStyle}>⏭️</button>
      </div>

      {/* Pasek postępu (atrapa na razie) */}
      <div style={{ width: "30%", height: "4px", background: "#333", borderRadius: "2px" }}>
        <div style={{ width: "50%", height: "100%", background: "#00d4ff" }}></div>
      </div>
    </div>
  );
}

const btnStyle = {
  background: "none",
  border: "none",
  color: "white",
  fontSize: "1.2rem",
  cursor: "pointer"
};