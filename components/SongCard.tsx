"use client"; // <--- DODAJ TO TUTAJ, KONIECZNIE W 1. LINII

interface SongCardProps {
  title: string;
  artist: string;
  onClick: () => void;
}

export default function SongCard({ title, artist, onClick }: SongCardProps) {
  return (
    <div 
      onClick={onClick}
      style={{
        background: "rgba(255, 255, 255, 0.1)",
        borderRadius: "15px",
        padding: "1rem",
        textAlign: "center",
        cursor: "pointer",
        transition: "transform 0.2s",
        border: "1px solid rgba(255,255,255,0.2)"
    }}
    // Te zdarzenia wymagają "use client"
    onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
    onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
    >
      <div style={{
        width: "100%",
        height: "150px",
        background: "linear-gradient(45deg, #ff00cc, #333399)",
        borderRadius: "10px",
        marginBottom: "1rem"
      }}></div>
      
      <h3 style={{ margin: "0 0 5px 0", fontSize: "1.1rem" }}>{title}</h3>
      <p style={{ margin: 0, color: "#aaa", fontSize: "0.9rem" }}>{artist}</p>
    </div>
  );
}