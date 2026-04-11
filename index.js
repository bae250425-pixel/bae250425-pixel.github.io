// ============================
// NAVEGACIÓN SPA
// ============================

const pages = document.querySelectorAll('.page');
const navLinks = document.querySelectorAll('.nav-link');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

/**
 * Muestra la página con el id dado y actualiza los links activos.
 * @param {string} pageName - ej: 'inicio', 'nosotros', 'alojamiento', 'salamanca', 'chapultepec'
 */
function navigateTo(pageName) {
  // Ocultar todas las páginas
  pages.forEach(p => p.classList.remove('active'));

  // Mostrar la página seleccionada
  const target = document.getElementById('page-' + pageName);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Actualizar nav link activo
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.dataset.page === pageName) {
      link.classList.add('active');
    }
    // Si es subpágina, marcar "Alojamiento" como activo
    if (['salamanca', 'chapultepec'].includes(pageName) && link.dataset.page === 'alojamiento') {
      link.classList.add('active');
    }
  });

  // Cerrar menú móvil si está abierto
  mobileMenu.classList.remove('open');
  document.title = pageName.charAt(0).toUpperCase() + pageName.slice(1) + ' — MiServicio';
}

/**
 * Adjunta el evento de navegación a todos los elementos con [data-page].
 */
function attachNavEvents() {
  document.querySelectorAll('[data-page]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const page = el.dataset.page;
      if (page) navigateTo(page);
    });
  });
}

// ============================
// HAMBURGER MENÚ
// ============================
hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

// Cerrar el menú al hacer click fuera
document.addEventListener('click', (e) => {
  if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
    mobileMenu.classList.remove('open');
  }
});

// ============================
// INICIALIZAR
// ============================
document.addEventListener('DOMContentLoaded', () => {
  attachNavEvents();
  navigateTo('inicio'); // página inicial
});
