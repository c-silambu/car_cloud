import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { getStyles } from "../utils/styles";

export default function Navbar({ page, setPage, session, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const styles = getStyles(isDark);

  const navItems = [
    { key: "home", label: "Home" },
    { key: "booknow", label: "Book Now" },
    session?.user_email ? { key: "mycart", label: "My Trips" } : null,
    session?.admin_logged_in ? { key: "dashboard", label: "Dashboard" } : null,
  ].filter(Boolean);

  return (
    <nav style={styles.nav}>
      <div style={styles.navInner}>
        <div style={styles.navBrand} onClick={() => setPage("home")}>
          <div style={styles.navLogo}>GM</div>
          <span style={styles.navTitle}>GOLD MEDAL</span>
        </div>

        <div
          style={{ ...styles.navLinks, display: menuOpen ? "flex" : undefined }}
          className="nav-links"
        >
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => { setPage(item.key); setMenuOpen(false); }}
              style={{
                ...styles.navBtn,
                ...(page === item.key ? styles.navBtnActive : {}),
              }}
            >
              {item.label}
            </button>
          ))}

          {session?.user_email || session?.admin_logged_in ? (
            <button onClick={onLogout} style={styles.navBtnLogout}>
              Logout
            </button>
          ) : (
            <>
              <button
                onClick={() => { setPage("login"); setMenuOpen(false); }}
                style={styles.navBtn}
              >
                Login
              </button>
              <button
                onClick={() => { setPage("driver-login"); setMenuOpen(false); }}
                style={{
                  ...styles.navBtn,
                  color: "#d4a017",
                  border: "1px solid #d4a01740",
                  borderRadius: 8,
                }}
              >
                🚖 Driver
              </button>
              <button
                onClick={() => { setPage("register"); setMenuOpen(false); }}
                style={styles.navBtnCta}
              >
                Sign Up
              </button>
            </>
          )}

          <button
            onClick={toggleTheme}
            style={styles.themeToggleBtn}
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDark ? "☀️" : "🌙"}
          </button>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button
            onClick={toggleTheme}
            style={{ ...styles.themeToggleBtn, display: "none" }}
            className="mobile-theme-btn"
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDark ? "☀️" : "🌙"}
          </button>
          <button style={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </button>
        </div>
      </div>
    </nav>
  );
}
