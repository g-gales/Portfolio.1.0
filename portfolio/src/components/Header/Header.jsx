import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./Header.scss";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(fasle);

  return (
    <header>
      <div className="nav-bar">
        <div className="logo-container">
          <Link to="/">
            <img src={logo} alt="Logo" className="logo" />
          </Link>
        </div>

        {/* Hamburger button (mobile only via SCSS) */}
        <button
          className="hamburger"
          aria-label={
            menuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}>
          <div class="bar"></div>
          <div class="bar"></div>
          <div class="bar"></div>
        </button>

        <nav className={`nav-link-container ${menuOpen ? "open" : ""}`}>
          <NavLink className="nav-link" to="/" end onClick={closeMenu}>
            Home
          </NavLink>
          <NavLink className="nav-link" to="/about" onClick={closeMenu}>
            About
          </NavLink>
          <NavLink className="nav-link" to="/connect" onClick={closeMenu}>
            Connect
          </NavLink>
          <NavLink className="nav-link" to="/projects" onClick={closeMenu}>
            Projects
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
