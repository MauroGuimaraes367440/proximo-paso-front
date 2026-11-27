# Próximo Paso — Frontend

Organizador de búsqueda laboral: registrá tus postulaciones, seguí en qué estado está cada una, buscá ofertas reales y pedile a la IA una preparación para la entrevista.

🔗 **App publicada:** https://proximo-paso-front.vercel.app
🔗 **API (backend):** [dfs-obligatorio-api](https://github.com/MauroGuimaraes367440/dfs-obligatorio-api)

<!-- Agregá acá una o dos capturas, por ejemplo: ![Resumen](docs/resumen.png) -->

## Funcionalidades

- **Registro e inicio de sesión** con validación en tiempo real y sesión persistente.
- **Postulaciones:** alta, edición en línea, eliminación y filtros por estado y categoría, con paginación.
- **Seguimiento por estado:** guardada, enviada, entrevista, aceptada o rechazada, con un gráfico resumen.
- **Preparación de entrevista con IA:** genera posibles preguntas, temas para repasar y consejos a partir de la postulación.
- **Búsqueda de ofertas reales** (Jooble) que se guardan como postulación con un clic.
- **Planes Plus y Premium**, con límite de postulaciones según el plan.
- **Panel de administrador** para gestionar categorías y sus imágenes.

## Stack

- React 19 + Vite
- Redux Toolkit (estado global) y React Router (rutas protegidas por sesión y por rol)
- React Hook Form + Joi (validación de formularios)
- Axios con interceptores (token JWT y cierre de sesión al expirar)
- Chart.js, React Toastify, Lucide
- Deploy en Vercel

## Estructura

```
src/
├── api/          instancia de axios e interceptores
├── app/guards/   rutas protegidas, públicas y de administrador
├── components/   componentes de interfaz por funcionalidad
├── features/     slices de Redux
├── pages/        una página por ruta
├── services/     llamadas a la API
├── store/        configuración del store
├── utils/        funciones auxiliares
└── validators/   esquemas Joi (mismas reglas que el backend)
```

## Cómo correrlo localmente

```bash
npm install
cp .env.example .env   # completar VITE_API_URL con la URL de la API
npm run dev
```

---

Proyecto realizado por **Mauro Guimaraes** para la materia Desarrollo Full Stack — Universidad ORT Uruguay.
