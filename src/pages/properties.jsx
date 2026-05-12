import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { properties } from "../data/properties";

const zones = [
  "Todas",
  "Palermo",
  "Belgrano",
  "Recoleta",
  "Puerto Madero",
  "Villa Crespo",
  "San Isidro",
  "Tigre",
  "Microcentro",
];
const types = ["Todos", "departamento", "casa", "ph", "local"];

function Properties() {
  const [searchParams] = useSearchParams();
  const [operation, setOperation] = useState(
    searchParams.get("operation") || "todos",
  );
  const [type, setType] = useState("Todos");
  const [zone, setZone] = useState("Todas");
  const [maxPrice, setMaxPrice] = useState("");
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [sortBy, setSortBy] = useState("default");

  const filtered = properties
    .filter((p) => operation === "todos" || p.operation === operation)
    .filter((p) => type === "Todos" || p.type === type)
    .filter((p) => zone === "Todas" || p.zone === zone)
    .filter((p) => !maxPrice || p.price <= Number(maxPrice))
    .filter(
      (p) =>
        !search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.zone.toLowerCase().includes(search.toLowerCase()) ||
        p.address.toLowerCase().includes(search.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      return a.id - b.id;
    });

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Encabezado */}
      <div className="mb-10">
        <p
          className="text-xs tracking-[.3em] uppercase mb-2"
          style={{ color: "#6B7B6B" }}
        >
          Catálogo completo
        </p>
        <h1
          className="font-serif text-4xl font-bold"
          style={{ color: "#1A1A1A" }}
        >
          Propiedades
        </h1>
      </div>

      {/* Filtros */}
      <div className="p-6 mb-10" style={{ background: "#F0F0EB" }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {/* Búsqueda */}
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Zona o dirección..."
            className="px-4 py-3 text-sm outline-none border border-transparent focus:border-stone-300 bg-white"
            style={{ color: "#1A1A1A" }}
          />

          {/* Tipo */}
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="px-4 py-3 text-sm outline-none bg-white capitalize"
            style={{ color: "#1A1A1A" }}
          >
            {types.map((t) => (
              <option key={t} value={t} className="capitalize">
                {t}
              </option>
            ))}
          </select>

          {/* Zona */}
          <select
            value={zone}
            onChange={(e) => setZone(e.target.value)}
            className="px-4 py-3 text-sm outline-none bg-white"
            style={{ color: "#1A1A1A" }}
          >
            {zones.map((z) => (
              <option key={z} value={z}>
                {z}
              </option>
            ))}
          </select>

          {/* Ordenar */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 text-sm outline-none bg-white"
            style={{ color: "#1A1A1A" }}
          >
            <option value="default">Ordenar por</option>
            <option value="price-asc">Menor precio</option>
            <option value="price-desc">Mayor precio</option>
          </select>
        </div>

        {/* Operación */}
        <div className="flex gap-2">
          {["todos", "venta", "alquiler"].map((op) => (
            <button
              key={op}
              onClick={() => setOperation(op)}
              className="px-5 py-2 text-xs tracking-widest uppercase transition-colors capitalize"
              style={{
                background: operation === op ? "#1A3A2A" : "white",
                color: operation === op ? "#F8F8F6" : "#6B7B6B",
                border: "1px solid",
                borderColor: operation === op ? "#1A3A2A" : "#E5E5E0",
              }}
            >
              {op}
            </button>
          ))}
          <p
            className="ml-auto text-xs self-center"
            style={{ color: "#6B7B6B" }}
          >
            {filtered.length}{" "}
            {filtered.length === 1 ? "propiedad" : "propiedades"}
          </p>
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-24">
          <p className="font-serif text-2xl mb-4" style={{ color: "#1A1A1A" }}>
            No encontramos propiedades
          </p>
          <p className="text-sm" style={{ color: "#6B7B6B" }}>
            Probá cambiando los filtros de búsqueda
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((property, i) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
            >
              <Link to={`/propiedad/${property.id}`} className="group block">
                <div className="aspect-[4/3] overflow-hidden mb-4 relative">
                  <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <img
                    src={property.images[1]}
                    alt={property.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  <div
                    className="absolute top-3 left-3 px-2 py-1 text-xs tracking-widest uppercase"
                    style={{ background: "#1A3A2A", color: "#A8C5A8" }}
                  >
                    {property.operation}
                  </div>
                  <div
                    className="absolute top-3 right-3 px-2 py-1 text-xs tracking-widest uppercase"
                    style={{ background: "white", color: "#1A3A2A" }}
                  >
                    {property.type}
                  </div>
                </div>
                <p
                  className="text-xs uppercase tracking-widest mb-1"
                  style={{ color: "#6B7B6B" }}
                >
                  {property.zone}
                </p>
                <p
                  className="text-sm font-medium mb-2"
                  style={{ color: "#1A1A1A" }}
                >
                  {property.title}
                </p>
                <p
                  className="text-lg font-bold mb-2"
                  style={{ color: "#1A3A2A" }}
                >
                  {property.currency} {property.price.toLocaleString("es-AR")}
                </p>
                <div
                  className="flex gap-4 pt-3"
                  style={{ borderTop: "1px solid #E5E5E0" }}
                >
                  <span className="text-xs" style={{ color: "#6B7B6B" }}>
                    {property.ambientes} amb
                  </span>
                  <span className="text-xs" style={{ color: "#6B7B6B" }}>
                    {property.bathrooms} baños
                  </span>
                  <span className="text-xs" style={{ color: "#6B7B6B" }}>
                    {property.area}m²
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Properties;
