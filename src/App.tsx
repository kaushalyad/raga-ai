import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Analytics from "./pages/Analytics";
import PatientDetails from "./pages/PatientDetails";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { logout } from "./store/authSlice";
import logo from "./assets/logo.svg";
import "./App.css";

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.auth.user);
  const [menuOpen, setMenuOpen] = useState(false);

  React.useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  const userLabel = (() => {
    const name = user?.displayName?.trim();
    if (name) return name;

    const email = user?.email?.trim();
    if (!email) return null;

    const local = email.split("@")[0] ?? email;
    const cleaned = local.replace(/[._-]+/g, " ").trim();
    if (!cleaned) return email;

    return cleaned.replace(/\b\w/g, (c) => c.toUpperCase());
  })();

  return (
    <header className="header">
      <div
        className={menuOpen ? "mobile-backdrop mobile-backdrop-open" : "mobile-backdrop"}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />
      <nav className={menuOpen ? "nav nav-open" : "nav"}>
        <div className="nav-top">
          <NavLink className="brand" to="/" onClick={() => setMenuOpen(false)}>
            <img className="brand-logo" src={logo} alt="Raga AI" />
          </NavLink>

          <button
            className="hamburger"
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            aria-controls="app-nav"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="hamburger-line" />
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>
        </div>

        <div id="app-nav" className="nav-menu">
          <div className="mobile-drawer-head">
            <div className="mobile-drawer-title">Menu</div>
            <button
              className="mobile-drawer-close"
              type="button"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
            >
              ×
            </button>
          </div>
          <div className="nav-center" aria-label="Primary navigation">
            <div className="nav-pill">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link nav-link-active" : "nav-link"
                }
                to="/"
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link nav-link-active" : "nav-link"
                }
                to="/analytics"
                onClick={() => setMenuOpen(false)}
              >
                Analytics
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link nav-link-active" : "nav-link"
                }
                to="/patients"
                onClick={() => setMenuOpen(false)}
              >
                Patients
              </NavLink>
            </div>
          </div>

          <div className="nav-actions">
            {user ? (
              <>
                <span className="nav-user">
                  {userLabel ?? "Signed in"}
                </span>
                <button
                  className="header-cta header-cta-outline"
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    dispatch(logout());
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  className="button button-ghost header-cta header-cta-outline"
                  type="button"
                >
                  Book Demo
                </button>
                <NavLink
                  className="header-cta header-cta-primary"
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                >
                  Join Us
                  <span className="cta-arrow-badge" aria-hidden="true">
                    <svg
                      className="cta-arrow-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 12H16"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 8L16 12L12 16"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </NavLink>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <ProtectedRoute>
                <Analytics />
              </ProtectedRoute>
            }
          />
          <Route
            path="/patients"
            element={
              <ProtectedRoute>
                <PatientDetails />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
