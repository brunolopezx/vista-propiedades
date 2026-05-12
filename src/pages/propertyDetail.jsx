import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { properties } from "../data/properties";

function Calculadora({ price, currency }) {
  const [entrada, setEntrada] = useState(30);
  const [plazo, setPlazo] = useState(10);
  const tasa = 0.09;

  const montoEntrada = (price * entrada) / 100;
  const montoFinanciado = price - montoEntrada;
  const tasaMensual = tasa / 12;
  const cuotas = plazo * 12;
  const cuota =
    (montoFinanciado * (tasaMensual * Math.pow(1 + tasaMensual, cuotas))) /
    (Math.pow(1 + tasaMensual, cuotas) - 1);

  return (
    <div className="p-6" style={{ background: "#F0F0EB" }}>
      <p
        className="text-xs uppercase tracking-widest mb-6"
        style={{ color: "#6B7B6B" }}
      >
        Calculadora de hipoteca
      </p>

      {/* Entrada */}
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <p className="text-xs" style={{ color: "#6B7B6B" }}>
            Entrada
          </p>
          <p className="text-xs font-medium" style={{ color: "#1A3A2A" }}>
            {entrada}% — {currency}{" "}
            {Math.round(montoEntrada).toLocaleString("es-AR")}
          </p>
        </div>
        <input
          type="range"
          min="10"
          max="70"
          value={entrada}
          onChange={(e) => setEntrada(Number(e.target.value))}
          className="w-full accent-green-900"
        />
        <div
          className="flex justify-between text-xs mt-1"
          style={{ color: "#6B7B6B" }}
        >
          <span>10%</span>
          <span>70%</span>
        </div>
      </div>

      {/* Plazo */}
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <p className="text-xs" style={{ color: "#6B7B6B" }}>
            Plazo
          </p>
          <p className="text-xs font-medium" style={{ color: "#1A3A2A" }}>
            {plazo} años
          </p>
        </div>
        <input
          type="range"
          min="5"
          max="30"
          step="5"
          value={plazo}
          onChange={(e) => setPlazo(Number(e.target.value))}
          className="w-full accent-green-900"
        />
        <div
          className="flex justify-between text-xs mt-1"
          style={{ color: "#6B7B6B" }}
        >
          <span>5 años</span>
          <span>30 años</span>
        </div>
      </div>

      {/* Resultado */}
      <div className="p-4 text-center" style={{ background: "#1A3A2A" }}>
        <p
          className="text-xs uppercase tracking-widest mb-2"
          style={{ color: "#4A6A5A" }}
        >
          Cuota mensual estimada
        </p>
        <p
          className="font-serif text-3xl font-bold"
          style={{ color: "#A8C5A8" }}
        >
          {currency} {Math.round(cuota).toLocaleString("es-AR")}
        </p>
        <p className="text-xs mt-2" style={{ color: "#4A6A5A" }}>
          Tasa anual referencial: 9% — A modo ilustrativo
        </p>
      </div>
    </div>
  );
}

function PropertyDetail() {
  const { id } = useParams();
  const property = properties.find((p) => p.id === Number(id));
  const [activeImage, setActiveImage] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (!property)
    return (
      <div className="text-center py-40">
        <p className="font-serif text-2xl" style={{ color: "#1A1A1A" }}>
          Propiedad no encontrada
        </p>
        <Link
          to="/propiedades"
          className="text-sm mt-4 block"
          style={{ color: "#1A3A2A" }}
        >
          ← Volver al catálogo
        </Link>
      </div>
    );

  const related = properties
    .filter((p) => p.type === property.type && p.id !== property.id)
    .slice(0, 3);

  const onSubmit = () => setSubmitted(true);

  return (
    <div>
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <div className="flex gap-2 text-xs mb-8" style={{ color: "#6B7B6B" }}>
          <Link to="/" className="hover:text-stone-800 transition-colors">
            Inicio
          </Link>
          <span>/</span>
          <Link
            to="/propiedades"
            className="hover:text-stone-800 transition-colors"
          >
            Propiedades
          </Link>
          <span>/</span>
          <span style={{ color: "#1A1A1A" }}>{property.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Columna izquierda — fotos + info */}
          <div className="lg:col-span-2">
            {/* Galería */}
            <div
              className="mb-4 relative cursor-pointer"
              onClick={() => setLightbox(true)}
            >
              <div className="aspect-[16/9] overflow-hidden">
                <img
                  key={activeImage}
                  src={property.images[activeImage]}
                  alt={property.title}
                  className="w-full h-full object-cover"
                  style={{ animation: "fadeIn .3s ease" }}
                />
              </div>
              <div
                className="absolute bottom-4 right-4 px-3 py-1 text-xs tracking-widest uppercase"
                style={{ background: "rgba(0,0,0,0.6)", color: "white" }}
              >
                Ver fotos
              </div>
            </div>
            <div className="flex gap-2 mb-8">
              {property.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className="flex-1 aspect-[4/3] overflow-hidden"
                  style={{
                    opacity: activeImage === i ? 1 : 0.5,
                    transition: "opacity .2s",
                  }}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Info */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span
                className="px-3 py-1 text-xs uppercase tracking-widest"
                style={{ background: "#1A3A2A", color: "#A8C5A8" }}
              >
                {property.operation}
              </span>
              <span
                className="px-3 py-1 text-xs uppercase tracking-widest"
                style={{ background: "#F0F0EB", color: "#6B7B6B" }}
              >
                {property.type}
              </span>
              <span
                className="px-3 py-1 text-xs uppercase tracking-widest"
                style={{ background: "#F0F0EB", color: "#6B7B6B" }}
              >
                {property.zone}
              </span>
            </div>

            <h1
              className="font-serif text-4xl font-bold mb-2"
              style={{ color: "#1A1A1A" }}
            >
              {property.title}
            </h1>
            <p className="text-sm mb-4" style={{ color: "#6B7B6B" }}>
              ◎ {property.address}
            </p>
            <p className="text-3xl font-bold mb-8" style={{ color: "#1A3A2A" }}>
              {property.currency} {property.price.toLocaleString("es-AR")}
            </p>

            {/* Características */}
            <div
              className="grid grid-cols-3 gap-4 py-8 mb-8"
              style={{
                borderTop: "1px solid #E5E5E0",
                borderBottom: "1px solid #E5E5E0",
              }}
            >
              {[
                { label: "Ambientes", value: property.ambientes },
                { label: "Baños", value: property.bathrooms },
                { label: "Superficie", value: `${property.area}m²` },
              ].map(({ label, value }) => (
                <div key={label} className="text-center">
                  <p
                    className="font-serif text-2xl font-bold mb-1"
                    style={{ color: "#1A3A2A" }}
                  >
                    {value}
                  </p>
                  <p
                    className="text-xs uppercase tracking-widest"
                    style={{ color: "#6B7B6B" }}
                  >
                    {label}
                  </p>
                </div>
              ))}
            </div>

            {/* Descripción */}
            <h2
              className="font-serif text-xl font-bold mb-4"
              style={{ color: "#1A1A1A" }}
            >
              Descripción
            </h2>
            <p
              className="text-sm leading-relaxed mb-8"
              style={{ color: "#6B7B6B" }}
            >
              {property.description}
            </p>

            {/* Features */}
            <h2
              className="font-serif text-xl font-bold mb-4"
              style={{ color: "#1A1A1A" }}
            >
              Características
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-12">
              {property.features.map((f) => (
                <div key={f} className="flex items-center gap-2">
                  <span className="text-xs" style={{ color: "#1A3A2A" }}>
                    ✦
                  </span>
                  <p className="text-sm" style={{ color: "#6B7B6B" }}>
                    {f}
                  </p>
                </div>
              ))}
            </div>

            {/* Calculadora — solo para venta */}
            {property.operation === "venta" && (
              <Calculadora
                price={property.price}
                currency={property.currency}
              />
            )}
          </div>

          {/* Columna derecha — formulario */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="p-6" style={{ background: "#F0F0EB" }}>
                <p
                  className="text-xs uppercase tracking-widest mb-1"
                  style={{ color: "#6B7B6B" }}
                >
                  ¿Te interesa esta propiedad?
                </p>
                <p
                  className="font-serif text-xl font-bold mb-6"
                  style={{ color: "#1A1A1A" }}
                >
                  Consultá sin compromiso
                </p>

                {submitted ? (
                  <div className="text-center py-8">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-lg mx-auto mb-4"
                      style={{ background: "#1A3A2A", color: "#A8C5A8" }}
                    >
                      ✓
                    </div>
                    <p
                      className="font-serif text-lg mb-2"
                      style={{ color: "#1A1A1A" }}
                    >
                      ¡Consulta enviada!
                    </p>
                    <p className="text-xs" style={{ color: "#6B7B6B" }}>
                      Te contactamos en menos de 24hs.
                    </p>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-4"
                  >
                    <div>
                      <input
                        {...register("nombre", { required: "Requerido" })}
                        placeholder="Tu nombre"
                        className="w-full px-4 py-3 text-sm outline-none bg-white"
                        style={{
                          border: errors.nombre
                            ? "1px solid #cc0000"
                            : "1px solid transparent",
                          color: "#1A1A1A",
                        }}
                      />
                      {errors.nombre && (
                        <p
                          className="text-xs mt-1"
                          style={{ color: "#cc0000" }}
                        >
                          {errors.nombre.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <input
                        {...register("telefono", { required: "Requerido" })}
                        placeholder="Tu teléfono"
                        className="w-full px-4 py-3 text-sm outline-none bg-white"
                        style={{
                          border: errors.telefono
                            ? "1px solid #cc0000"
                            : "1px solid transparent",
                          color: "#1A1A1A",
                        }}
                        onKeyDown={(e) => {
                          if (
                            !/[\d\s+\-()]/.test(e.key) &&
                            ![
                              "Backspace",
                              "Delete",
                              "Tab",
                              "ArrowLeft",
                              "ArrowRight",
                            ].includes(e.key)
                          ) {
                            e.preventDefault();
                          }
                        }}
                      />
                      {errors.telefono && (
                        <p
                          className="text-xs mt-1"
                          style={{ color: "#cc0000" }}
                        >
                          {errors.telefono.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <textarea
                        {...register("mensaje")}
                        placeholder="¿Alguna pregunta sobre la propiedad?"
                        rows={4}
                        className="w-full px-4 py-3 text-sm outline-none resize-none bg-white"
                        style={{
                          border: "1px solid transparent",
                          color: "#1A1A1A",
                        }}
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-4 text-xs tracking-widest uppercase transition-colors"
                      style={{ background: "#1A3A2A", color: "#F8F8F6" }}
                    >
                      Enviar consulta
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            style={{ background: "rgba(0,0,0,0.95)" }}
            onClick={() => setLightbox(false)}
          >
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              src={property.images[activeImage]}
              alt={property.title}
              className="max-w-5xl max-h-[90vh] w-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="absolute bottom-6 flex gap-3">
              {property.images.map((img, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImage(i);
                  }}
                  className="w-16 h-10 overflow-hidden"
                  style={{ opacity: activeImage === i ? 1 : 0.4 }}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
            <button
              onClick={() => setLightbox(false)}
              className="absolute top-6 right-6 text-2xl"
              style={{ color: "white" }}
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Relacionadas */}
      {related.length > 0 && (
        <div className="max-w-6xl mx-auto px-6 py-16">
          <h2
            className="font-serif text-2xl font-bold mb-8"
            style={{ color: "#1A1A1A" }}
          >
            Propiedades similares
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {related.map((p) => (
              <Link to={`/propiedad/${p.id}`} key={p.id} className="group">
                <div className="aspect-[4/3] overflow-hidden mb-3">
                  <img
                    src={p.images[0]}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <p
                  className="text-xs uppercase tracking-widest mb-1"
                  style={{ color: "#6B7B6B" }}
                >
                  {p.zone}
                </p>
                <p
                  className="text-sm font-medium mb-1"
                  style={{ color: "#1A1A1A" }}
                >
                  {p.title}
                </p>
                <p className="text-sm font-bold" style={{ color: "#1A3A2A" }}>
                  {p.currency} {p.price.toLocaleString("es-AR")}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}

      <style>{`@keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }`}</style>
    </div>
  );
}

export default PropertyDetail;
