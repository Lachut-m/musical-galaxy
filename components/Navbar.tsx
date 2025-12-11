export default function Navbar() {
  return (
    <nav style={{ 
      padding: "1rem 2rem", 
      display: "flex", 
      justifyContent: "space-between", 
      alignItems: "center",
      background: "rgba(0,0,0,0.5)", /* Półprzezroczyste tło */
      borderBottom: "1px solid #444"
    }}>
      <h2 style={{ margin: 0 }}>🎵 Musical Galaxy</h2>
      <div>
        <span style={{ cursor: "pointer" }}>Zaloguj</span>
      </div>
    </nav>
  );
}