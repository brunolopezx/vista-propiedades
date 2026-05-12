import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer style={{ background: "#1A3A2A" }}>
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-3 gap-12">
        {/* Marca */}
        <div>
          <p
            className="font-serif text-2xl font-bold mb-1"
            style={{ color: "#A8C5A8" }}
          >
            VISTA
          </p>
          <p
            className="text-xs tracking-widest uppercase mb-6"
            style={{ color: "#4A6A5A" }}
          >
            Propiedades
          </p>
          <p
            className="text-xs leading-relaxed mb-6"
            style={{ color: "#4A6A5A" }}
          >
            Más de 12 años conectando personas con sus hogares ideales en Buenos
            Aires y GBA.
          </p>
          <div className="flex gap-4">
            {["Instagram", "LinkedIn", "Facebook"].map((red) => (
              <button
                key={red}
                className="text-xs transition-colors"
                style={{ color: "#4A6A5A" }}
                onMouseEnter={(e) => (e.target.style.color = "#A8C5A8")}
                onMouseLeave={(e) => (e.target.style.color = "#4A6A5A")}
              >
                {red}
              </button>
            ))}
          </div>
        </div>

        {/* Links */}
        <div>
          <p
            className="text-xs uppercase tracking-widest mb-6"
            style={{ color: "#4A6A5A" }}
          >
            Navegación
          </p>
          <div className="flex flex-col gap-3">
            {[
              { label: "Inicio", to: "/" },
              {
                label: "Propiedades en venta",
                to: "/propiedades?operation=venta",
              },
              {
                label: "Propiedades en alquiler",
                to: "/propiedades?operation=alquiler",
              },
              { label: "Departamentos", to: "/propiedades" },
              { label: "Casas", to: "/propiedades" },
            ].map(({ label, to }) => (
              <Link
                key={label}
                to={to}
                className="text-xs transition-colors"
                style={{ color: "#4A6A5A" }}
                onMouseEnter={(e) => (e.target.style.color = "#A8C5A8")}
                onMouseLeave={(e) => (e.target.style.color = "#4A6A5A")}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Contacto */}
        <div>
          <p
            className="text-xs uppercase tracking-widest mb-6"
            style={{ color: "#4A6A5A" }}
          >
            Contacto
          </p>
          <div className="flex flex-col gap-3">
            {[
              { icon: "◎", text: "Av. Santa Fe 1234, Palermo, CABA" },
              { icon: "✆", text: "+54 11 4800-1234" },
              { icon: "✉", text: "info@vistapropiedades.com.ar" },
              { icon: "◷", text: "Lun a Vie 9hs — 18hs" },
            ].map(({ icon, text }) => (
              <div key={text} className="flex gap-3 items-start">
                <span className="text-xs mt-0.5" style={{ color: "#A8C5A8" }}>
                  {icon}
                </span>
                <p className="text-xs" style={{ color: "#4A6A5A" }}>
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        style={{ borderTop: "1px solid #2A4A3A" }}
        className="py-6 text-center"
      >
        <p className="text-xs" style={{ color: "#2A4A3A" }}>
          © 2026 VISTA Propiedades · Todos los derechos reservados
        </p>
      </div>
    </footer>
  );
}

export default Footer;
