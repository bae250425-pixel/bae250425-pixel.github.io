# MiServicio — Sitio Web

Sitio web estático de una sola página (SPA) construido con HTML, CSS y JavaScript vanilla. Diseñado para publicarse directamente en **GitHub Pages**.

## 📁 Estructura de archivos

```
/
├── index.html      # Estructura principal y todas las páginas
├── index.css       # Estilos y diseño visual
├── index.js        # Lógica de navegación SPA
└── README.md       # Este archivo
```

## 🗺️ Páginas incluidas

| Página | Ruta lógica | Descripción |
|---|---|---|
| Inicio | `inicio` | Hero principal y sección de características |
| Nosotros | `nosotros` | Misión, visión, valores y estadísticas |
| Alojamiento | `alojamiento` | Tarjetas de selección de ubicación |
| Salamanca | `salamanca` | Subpágina de alojamiento Salamanca |
| Chapultepec | `chapultepec` | Subpágina de alojamiento Chapultepec |

## 🎨 Paleta de colores

| Uso | Valor HEX |
|---|---|
| Fondo | `#f3f3f3` |
| Títulos | `#00754b` |
| Subtítulos | `#6a9a8b` |

## 🚀 Cómo publicar en GitHub Pages

1. Crea un repositorio en GitHub (ej. `mi-servicio`)
2. Sube los 4 archivos a la rama `main`
3. Ve a **Settings → Pages**
4. En **Source**, selecciona `Deploy from a branch` → rama `main` → carpeta `/ (root)`
5. Haz clic en **Save**
6. Tu sitio estará disponible en:
   ```
   https://tu-usuario.github.io/mi-servicio/
   ```

## ✏️ Cómo personalizar

### Cambiar el nombre de la marca
En `index.html`, busca todas las ocurrencias de `MiServicio` y reemplázalas con el nombre de tu negocio.

### Cambiar colores
En `index.css`, modifica las variables en `:root`:
```css
:root {
  --bg: #f3f3f3;       /* Fondo */
  --title: #00754b;    /* Títulos */
  --subtitle: #6a9a8b; /* Subtítulos */
}
```

### Agregar imágenes reales
En las secciones de alojamiento (`alo-card-img`), reemplaza el gradiente por una imagen real:
```css
.salamanca-img {
  background: url('img/salamanca.jpg') center/cover no-repeat;
}
```

### Agregar más páginas
1. En `index.html`, agrega un `<section class="page" id="page-nueva-pagina">...</section>`
2. Agrega el link en el navbar: `<a href="#" class="nav-link" data-page="nueva-pagina">Nueva</a>`
3. El JavaScript lo detecta automáticamente.

## 🛠️ Tecnologías usadas

- HTML5 semántico
- CSS3 con variables personalizadas y diseño responsivo
- JavaScript vanilla (sin dependencias)
- Fuentes Google: [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) + [Lato](https://fonts.google.com/specimen/Lato)

## 📱 Diseño responsivo

El sitio se adapta a móviles con:
- Menú hamburguesa para pantallas pequeñas
- Grid flexible con `auto-fit`
- Tipografía fluida con `clamp()`

---

*Generado con ❤️ para publicar en GitHub Pages.*
