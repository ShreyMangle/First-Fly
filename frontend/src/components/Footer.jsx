function Footer() {
  return (
    <footer style={footerStyle}>
      <div>
        © {new Date().getFullYear()} First Fly
      </div>

      <div>
        <a href="/privacy" style={linkStyle}>Privacy Policy</a>
        <a href="/terms" style={linkStyle}>Terms</a>
      </div>
    </footer>
  );
}

const footerStyle = {
  borderTop: "1px solid #ddd",
  padding: "1rem 2rem",
  display: "flex",
  justifyContent: "space-between",
};

const linkStyle = {
  marginLeft: "1rem",
  textDecoration: "none",
  color: "#555",
};

export default Footer;