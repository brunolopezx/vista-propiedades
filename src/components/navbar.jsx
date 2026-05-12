import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(248,248,246,0.97)" : "transparent",
        borderBottom: scrolled ? "1px solid #E5E5E0" : "none",
        backdropFilter: scrolled ? "blur(10px)" : "none",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="font-serif text-xl font-bold tracking-wide"
          style={{ color: "#1A3A2A" }}
        >
          VISTA
          <span
            className="text-xs font-sans font-normal tracking-widest ml-2"
            style={{ color: "#6B7B6B" }}
          >
            PROPIEDADES
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className="text-xs tracking-widest uppercase transition-colors"
            style={{ color: location.pathname === "/" ? "#1A3A2A" : "#6B7B6B" }}
          >
            Inicio
          </Link>
          <Link
            to="/propiedades"
            className="text-xs tracking-widest uppercase transition-colors"
            style={{
              color:
                location.pathname === "/propiedades" ? "#1A3A2A" : "#6B7B6B",
            }}
          >
            Propiedades
          </Link>
          <Link
            to="/propiedades"
            className="text-xs tracking-widest uppercase px-6 py-2 transition-colors"
            style={{ background: "#1A3A2A", color: "#F8F8F6" }}
          >
            Consultar
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
