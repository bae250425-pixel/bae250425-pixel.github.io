// ============================
// NAVEGACIÓN SPA
// ============================

const pages    = document.querySelectorAll('.page');
const navLinks = document.querySelectorAll('.nav-link');
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

/**
 * Navega a la página indicada y actualiza el estado de los links.
 * @param {string} pageName - 'inicio' | 'nosotros' | 'alojamiento' | 'salamanca' | 'chapultepec'
 */
function navigateTo(pageName) {
  // Ocultar todas las páginas
  pages.forEach(p => p.classList.remove('active'));

  // Mostrar la página destino
  const target = document.getElementById('page-' + pageName);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Actualizar link activo en navbar
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.dataset.page === pageName) link.classList.add('active');
    // Las subpáginas marcan "Alojamiento" como activo
    if (['salamanca', 'chapultepec'].includes(pageName) && link.dataset.page === 'alojamiento') {
      link.classList.add('active');
    }
  });

  // Cerrar menú móvil si está abierto
  mobileMenu.classList.remove('open');

  // Actualizar título del documento
  document.title = pageName.charAt(0).toUpperCase() + pageName.slice(1) + ' — BAE';
}

/**
 * Adjunta eventos de navegación a todos los elementos con [data-page].
 * Se llama también después de renderizar nuevos elementos si fuera necesario.
 */
function attachNavEvents() {
  document.querySelectorAll('[data-page]').forEach(el => {
    // Evitar doble-binding
    if (el._navBound) return;
    el._navBound = true;

    el.addEventListener('click', e => {
      e.preventDefault();
      const page = el.dataset.page;
      if (page) navigateTo(page);
    });
  });
}

// ============================
// HAMBURGER / MENÚ MÓVIL
// ============================

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

// Cerrar menú al hacer clic fuera
document.addEventListener('click', e => {
  if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
    mobileMenu.classList.remove('open');
  }
});

// ============================
// CALENDARIOS — FLATPICKR
// ============================

let fpLlegada, fpSalida;

function initCalendars() {
  fpLlegada = flatpickr('#llegada', {
    locale: 'es',
    dateFormat: 'd/m/Y',
    minDate: 'today',
    disableMobile: false,
    onChange(selectedDates) {
      if (selectedDates[0]) {
        const nextDay = new Date(selectedDates[0]);
        nextDay.setDate(nextDay.getDate() + 1);
        fpSalida.set('minDate', nextDay);

        // Limpiar salida si quedó antes de la llegada
        if (fpSalida.selectedDates[0] && fpSalida.selectedDates[0] <= selectedDates[0]) {
          fpSalida.clear();
        }
      }
    }
  });

  fpSalida = flatpickr('#salida', {
    locale: 'es',
    dateFormat: 'd/m/Y',
    minDate: new Date(Date.now() + 86400000), // mañana
    disableMobile: false,
  });
}

// ============================
// TOAST
// ============================

function showToast(msg, isError = false) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.className = 'toast' + (isError ? ' error' : '');
  toast.style.display = 'block';
  setTimeout(() => { toast.style.display = 'none'; }, 4500);
}

// ============================
// FORMULARIO DE RESERVA
// ============================

function enviarReserva() {
  const llegada     = document.getElementById('llegada').value.trim();
  const salida      = document.getElementById('salida').value.trim();
  const nombre      = document.getElementById('nombre').value.trim();
  const telefono    = document.getElementById('telefono').value.trim();
  const alojamiento = document.getElementById('alojamiento').value.trim();

  // Validación básica
  if (!llegada || !salida || !nombre || !telefono) {
    showToast('Por favor completa todos los campos requeridos.', true);
    return;
  }

  // Construir email prellenado
  const asunto = encodeURIComponent(`Solicitud de reserva — ${nombre}`);
  const cuerpo = encodeURIComponent(
    `Nueva solicitud de reserva — BAE\n\n` +
    `Nombre:       ${nombre}\n` +
    `Teléfono:     ${telefono}\n` +
    `Alojamiento:  ${alojamiento || 'No especificado'}\n` +
    `Llegada:      ${llegada}\n` +
    `Salida:       ${salida}\n\n` +
    `Por favor confirmar disponibilidad y responder al huésped.`
  );

  window.location.href = `mailto:bae250425@gmail.com?subject=${asunto}&body=${cuerpo}`;
  showToast('✔ Abriendo tu correo para enviar la solicitud…');
}

// ============================
// INIT
// ============================

document.addEventListener('DOMContentLoaded', () => {
  attachNavEvents();
  navigateTo('inicio');
  initCalendars();

  // Botón de reserva
  const btnReservar = document.getElementById('btnReservar');
  if (btnReservar) {
    btnReservar.addEventListener('click', enviarReserva);
  }
});
