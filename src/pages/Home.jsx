import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { properties } from "../data/properties";

function Home() {
  const [operation, setOperation] = useState("venta");
  const [search, setSearch] = useState("");
  const featured = properties.filter((p) => p.featured).slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600"
          alt="hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.6) 100%)",
          }}
        />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-xs tracking-[.4em] uppercase mb-4"
            style={{ color: "#A8C5A8" }}
          >
            Tu próximo hogar te espera
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-6xl md:text-7xl font-bold text-white mb-4"
          >
            Encontrá la propiedad ideal
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/70 text-lg mb-12"
          >
            Más de 500 propiedades en Buenos Aires y GBA
          </motion.p>

          {/* Buscador */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-white p-4 flex flex-col md:flex-row gap-3"
          >
            <div className="flex gap-0 border border-gray-200">
              {["venta", "alquiler"].map((op) => (
                <button
                  key={op}
                  onClick={() => setOperation(op)}
                  className="px-6 py-2 text-xs tracking-widest uppercase transition-colors capitalize"
                  style={{
                    background: operation === op ? "#1A3A2A" : "transparent",
                    color: operation === op ? "#F8F8F6" : "#6B7B6B",
                  }}
                >
                  {op}
                </button>
              ))}
            </div>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Zona, barrio o dirección..."
              className="flex-1 px-4 py-2 text-sm outline-none"
              style={{ color: "#1A1A1A" }}
            />
            <Link
              to={`/propiedades?operation=${operation}&search=${search}`}
              className="px-8 py-2 text-xs tracking-widest uppercase text-center transition-colors"
              style={{ background: "#1A3A2A", color: "#F8F8F6" }}
            >
              Buscar
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6" style={{ background: "#1A3A2A" }}>
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { num: "+500", label: "Propiedades" },
            { num: "+12 años", label: "De experiencia" },
            { num: "+1.200", label: "Clientes felices" },
            { num: "4.9★", label: "Calificación" },
          ].map(({ num, label }) => (
            <div key={label}>
              <p
                className="font-serif text-3xl font-bold mb-1"
                style={{ color: "#A8C5A8" }}
              >
                {num}
              </p>
              <p
                className="text-xs tracking-widest uppercase"
                style={{ color: "#4A6A5A" }}
              >
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Propiedades destacadas */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <p
                className="text-xs tracking-[.3em] uppercase mb-2"
                style={{ color: "#6B7B6B" }}
              >
                Selección especial
              </p>
              <h2
                className="font-serif text-4xl font-bold"
                style={{ color: "#1A1A1A" }}
              >
                Propiedades destacadas
              </h2>
            </div>
            <Link
              to="/propiedades"
              className="text-xs tracking-widest uppercase transition-colors hidden md:block"
              style={{ color: "#1A3A2A" }}
            >
              Ver todas →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((property, i) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link to={`/propiedad/${property.id}`} className="group block">
                  <div className="aspect-[4/3] overflow-hidden mb-3 relative">
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div
                      className="absolute top-3 left-3 px-2 py-1 text-xs tracking-widest uppercase"
                      style={{ background: "#1A3A2A", color: "#A8C5A8" }}
                    >
                      {property.operation}
                    </div>
                  </div>
                  <p
                    className="text-xs uppercase tracking-widest mb-1"
                    style={{ color: "#6B7B6B" }}
                  >
                    {property.zone}
                  </p>
                  <p
                    className="text-sm font-medium mb-1"
                    style={{ color: "#1A1A1A" }}
                  >
                    {property.title}
                  </p>
                  <p className="text-sm font-bold" style={{ color: "#1A3A2A" }}>
                    {property.currency} {property.price.toLocaleString("es-AR")}
                  </p>
                  <p className="text-xs mt-1" style={{ color: "#6B7B6B" }}>
                    {property.ambientes} amb · {property.bathrooms} baños ·{" "}
                    {property.area}m²
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6" style={{ background: "#F0F0EB" }}>
        <div className="max-w-3xl mx-auto text-center">
          <p
            className="text-xs tracking-[.3em] uppercase mb-4"
            style={{ color: "#6B7B6B" }}
          >
            ¿No encontrás lo que buscás?
          </p>
          <h2
            className="font-serif text-4xl font-bold mb-6"
            style={{ color: "#1A1A1A" }}
          >
            Hablá con un asesor
          </h2>
          <p
            className="text-sm leading-relaxed mb-10"
            style={{ color: "#6B7B6B" }}
          >
            Nuestro equipo de asesores te ayuda a encontrar la propiedad
            perfecta según tus necesidades y presupuesto. Sin compromiso.
          </p>
          <Link
            to="/propiedades"
            className="text-xs tracking-widest uppercase px-12 py-4 transition-colors"
            style={{ background: "#1A3A2A", color: "#F8F8F6" }}
          >
            Ver todas las propiedades
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
