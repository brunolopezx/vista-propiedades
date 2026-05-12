# VISTA Propiedades

Plataforma inmobiliaria desarrollada con React. Proyecto de portfolio que simula un sitio real de compra y alquiler de propiedades en Buenos Aires.

🔗 [Ver demo en vivo](#) ← actualizá con la URL de Vercel

---

## Funcionalidades

- Home con buscador integrado que filtra por operación y zona
- Catálogo con filtros por tipo, zona, operación y precio
- Hover en cards muestra segunda foto de la propiedad
- Detalle de propiedad con galería fullscreen y lightbox
- Calculadora de hipoteca interactiva con sliders (solo propiedades en venta)
- Formulario de consulta por propiedad con validación
- Propiedades similares al pie de cada detalle
- Diseño 100% responsive

## Tecnologías

- React 19 + Vite
- Tailwind CSS
- Framer Motion (animaciones y transiciones)
- React Hook Form (formulario de consulta)
- React Router v6

## Correr el proyecto localmente

Requisitos: Node.js v18 o superior

```bash
git clone https://github.com/brunolopezx/vista-propiedades.git
cd vista-propiedades
npm install
npm run dev
```

Abrir [http://localhost:5173](http://localhost:5173) en el navegador.

## Estructura del proyecto

```text
src/
├── components/    # Navbar, Footer
├── pages/         # Home, Properties, PropertyDetail
└── data/          # Propiedades en JS
```

## Adaptabilidad

Este proyecto fue diseñado como template reutilizable. Con cambios mínimos puede adaptarse a:

- Alquiler de vehículos o maquinaria
- Catálogo de productos para cualquier rubro
- Cualquier negocio que necesite listar y filtrar items
