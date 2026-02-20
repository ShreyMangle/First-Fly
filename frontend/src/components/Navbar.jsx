import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={navStyle}>
      <div>
        <Link to="/" style={logoStyle}>First Fly</Link>
      </div>

      <div>
        <Link to="/about" style={linkStyle}>About</Link>
        <Link to="/pricing" style={linkStyle}>Pricing</Link>
        <Link to="/contact" style={linkStyle}>Contact</Link>
        <Link to="/app" style={buttonStyle}>Check My Chances</Link>
      </div>
    </nav>
  );
}

const navStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "1rem 2rem",
  borderBottom: "1px solid #ddd",
  backgroundColor: "#fff",
};

const logoStyle = {
  fontSize: "1.4rem",
  fontWeight: "bold",
  textDecoration: "none",
  color: "#000",
};

const linkStyle = {
  marginRight: "1.5rem",
  textDecoration: "none",
  color: "#333",
};

const buttonStyle = {
  padding: "0.5rem 1rem",
  backgroundColor: "#007bff",
  color: "#fff",
  textDecoration: "none",
  borderRadius: "5px",
};

export default Navbar;