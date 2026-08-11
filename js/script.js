// Este archivo contiene la lógica de la aplicación.
// Se usa JavaScript para generar la paleta de colores aleatoria, bloquear colores y guardar paletas.

const botonGenerar = document.getElementById('btn-generar');
const botonGuardar = document.getElementById('btn-guardar-paleta');
const botonToggleFormato = document.getElementById('btn-toggle-formato');
const selectTamanio = document.getElementById('tamanio-paleta');
const paletteGrid = document.getElementById('palette-grid');
const listaCodigos = document.getElementById('lista-codigos');
const mensajeEstado = document.getElementById('mensaje-estado');
const toast = document.getElementById('toast');
const paletasGuardadasContainer = document.getElementById('paletas-guardadas');

let mostrarSoloHex = false;

const STORAGE_KEY = 'paletas-guardadas';
let paletaActual = [];
let coloresBloqueados = [];
let paletasGuardadas = [];

function obtenerNumeroAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function hslAHex(h, s, l) {
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l);
  const convertir = (n) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };

  return `#${convertir(0)}${convertir(8)}${convertir(4)}`;
}

function crearColorAleatorio() {
  const hue = obtenerNumeroAleatorio(0, 360);
  const saturation = obtenerNumeroAleatorio(65, 95);
  const lightness = obtenerNumeroAleatorio(40, 75);
  const hsl = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  const hex = hslAHex(hue, saturation, lightness);

  return { hsl, hex };
}

function mostrarToast(texto) {
  toast.textContent = texto;
  toast.classList.add('toast--visible');

  setTimeout(() => {
    toast.classList.remove('toast--visible');
  }, 1800);
}

function actualizarBotonFormato() {
  botonToggleFormato.textContent = mostrarSoloHex ? 'Mostrar HSL' : 'Mostrar solo HEX';
}

function alternarFormato() {
  mostrarSoloHex = !mostrarSoloHex;
  actualizarBotonFormato();

  if (paletaActual.length > 0) {
    mostrarPaleta(paletaActual, false);
  }

  mostrarToast(mostrarSoloHex ? 'Formato HEX activado' : 'Formato HSL activado');
}

function ajustarEstadoBloqueo(cantidad) {
  if (coloresBloqueados.length < cantidad) {
    coloresBloqueados = [
      ...coloresBloqueados,
      ...Array(cantidad - coloresBloqueados.length).fill(false),
    ];
  } else if (coloresBloqueados.length > cantidad) {
    coloresBloqueados = coloresBloqueados.slice(0, cantidad);
  }
}

function generarPaleta() {
  const cantidad = Number(selectTamanio.value);
  ajustarEstadoBloqueo(cantidad);
  const paleta = [];

  for (let i = 0; i < cantidad; i += 1) {
    if (coloresBloqueados[i] && paletaActual[i]) {
      paleta.push(paletaActual[i]);
    } else {
      paleta.push(crearColorAleatorio());
    }
  }

  paletaActual = paleta;
  return paleta;
}

function limpiarResultados() {
  paletteGrid.innerHTML = '';
  listaCodigos.innerHTML = '';
}

function construirPaleta(paleta, visible = true) {
  paleta.forEach((color, indice) => {
    const item = document.createElement('div');
    item.className = `color-item${coloresBloqueados[indice] ? ' is-locked' : ''}${visible ? ' is-visible' : ''}`;

    const botonBloqueo = document.createElement('button');
    botonBloqueo.type = 'button';
    botonBloqueo.className = 'color-tarjeta__lock';
    botonBloqueo.textContent = coloresBloqueados[indice] ? '🔒' : '🔓';
    botonBloqueo.setAttribute('aria-label', coloresBloqueados[indice] ? 'Desbloquear color' : 'Bloquear color');
    botonBloqueo.addEventListener('click', (event) => {
      event.stopPropagation();
      alternarBloqueo(indice);
    });

    const tarjeta = document.createElement('button');
    tarjeta.type = 'button';
    tarjeta.className = 'color-tarjeta';
    tarjeta.style.backgroundColor = color.hsl;
    tarjeta.setAttribute('aria-label', `Copiar código ${color.hex}`);
    tarjeta.addEventListener('click', () => copiarHex(color.hex));

    const etiqueta = document.createElement('span');
    etiqueta.textContent = mostrarSoloHex ? color.hex : color.hsl;
    tarjeta.appendChild(etiqueta);

    item.appendChild(botonBloqueo);
    item.appendChild(tarjeta);
    paletteGrid.appendChild(item);

    const elementoCodigo = document.createElement('li');
    elementoCodigo.textContent = mostrarSoloHex ? color.hex : `${color.hex} — ${color.hsl}`;
    if (visible) elementoCodigo.classList.add('visible');
    listaCodigos.appendChild(elementoCodigo);
  });
}

function copiarHex(hex) {
  navigator.clipboard.writeText(hex)
    .then(() => mostrarToast(`Copiado ${hex}`))
    .catch(() => mostrarToast('No se pudo copiar.'));
}

function alternarBloqueo(indice) {
  coloresBloqueados[indice] = !coloresBloqueados[indice];
  mostrarPaleta(paletaActual, false);
  mostrarToast(coloresBloqueados[indice] ? 'Color bloqueado' : 'Color desbloqueado');
}

function mostrarPaleta(paleta, animated = true) {
  if (!animated) {
    limpiarResultados();
    construirPaleta(paleta, true);
    return;
  }

  paletteGrid.classList.add('paleta-colores--hidden');
  listaCodigos.classList.add('paleta-colores--hidden');

  setTimeout(() => {
    limpiarResultados();
    construirPaleta(paleta, false);

    paletteGrid.classList.remove('paleta-colores--hidden');
    listaCodigos.classList.remove('paleta-colores--hidden');

    requestAnimationFrame(() => {
      document.querySelectorAll('.color-item').forEach((item) => item.classList.add('is-visible'));
      document.querySelectorAll('.lista-codigos li').forEach((item) => item.classList.add('visible'));
    });
  }, 180);
}

function actualizarMensaje(cantidad) {
  mensajeEstado.textContent = `Paleta generada con ${cantidad} colores. Usa el candado para fijar los tonos que prefieras.`;
}

function cargarPaletasGuardadas() {
  try {
    const guardadas = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    paletasGuardadas = Array.isArray(guardadas) ? guardadas : [];
  } catch (error) {
    paletasGuardadas = [];
  }
}

function guardarPaletasEnStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(paletasGuardadas));
}

function renderizarPaletasGuardadas() {
  paletasGuardadasContainer.innerHTML = '';

  if (paletasGuardadas.length === 0) {
    paletasGuardadasContainer.innerHTML = '<p class="texto-secundario">Aún no hay paletas guardadas.</p>';
    return;
  }

  paletasGuardadas.forEach((paletaGuardada) => {
    const tarjeta = document.createElement('article');
    tarjeta.className = 'paleta-guardada';

    const encabezado = document.createElement('div');
    encabezado.className = 'paleta-guardada__encabezado';

    const titulo = document.createElement('strong');
    titulo.textContent = paletaGuardada.nombre;

    const acciones = document.createElement('div');
    acciones.className = 'paleta-guardada__acciones';

    const botonCargar = document.createElement('button');
    botonCargar.type = 'button';
    botonCargar.className = 'paleta-guardada__boton';
    botonCargar.textContent = 'Cargar';
    botonCargar.addEventListener('click', () => cargarPaletaGuardada(paletaGuardada));

    const botonEliminar = document.createElement('button');
    botonEliminar.type = 'button';
    botonEliminar.className = 'paleta-guardada__boton paleta-guardada__boton--secundario';
    botonEliminar.textContent = 'Eliminar';
    botonEliminar.addEventListener('click', () => eliminarPaletaGuardada(paletaGuardada.id));

    acciones.appendChild(botonCargar);
    acciones.appendChild(botonEliminar);
    encabezado.appendChild(titulo);
    encabezado.appendChild(acciones);

    const chips = document.createElement('div');
    chips.className = 'paleta-guardada__colores';
    paletaGuardada.colores.forEach((color) => {
      const chip = document.createElement('span');
      chip.className = 'paleta-guardada__chip';
      chip.style.backgroundColor = color.hsl;
      chip.setAttribute('title', color.hex);
      chips.appendChild(chip);
    });

    tarjeta.appendChild(encabezado);
    tarjeta.appendChild(chips);
    paletasGuardadasContainer.appendChild(tarjeta);
  });
}

function guardarPaletaActual() {
  const nombreBase = `Paleta ${paletasGuardadas.length + 1}`;
  const nombre = window.prompt('Nombre de la paleta', nombreBase) || nombreBase;
  const nuevaPaleta = {
    id: Date.now(),
    nombre,
    colores: paletaActual.map((color) => ({ ...color })),
    bloqueados: [...coloresBloqueados],
  };

  paletasGuardadas.unshift(nuevaPaleta);
  guardarPaletasEnStorage();
  renderizarPaletasGuardadas();
  mostrarToast(`Paleta guardada: ${nombre}`);
}

function cargarPaletaGuardada(paletaGuardada) {
  paletaActual = paletaGuardada.colores.map((color) => ({ ...color }));
  coloresBloqueados = Array.isArray(paletaGuardada.bloqueados)
    ? [...paletaGuardada.bloqueados]
    : Array(paletaActual.length).fill(false);

  selectTamanio.value = String(paletaActual.length);
  mostrarPaleta(paletaActual);
  actualizarMensaje(paletaActual.length);
  mostrarToast(`Cargada ${paletaGuardada.nombre}`);
}

function eliminarPaletaGuardada(id) {
  paletasGuardadas = paletasGuardadas.filter((paletaGuardada) => paletaGuardada.id !== id);
  guardarPaletasEnStorage();
  renderizarPaletasGuardadas();
  mostrarToast('Paleta eliminada');
}

function manejarGeneracion() {
  const paleta = generarPaleta();
  mostrarPaleta(paleta);
  actualizarMensaje(paleta.length);
}

botonGenerar.addEventListener('click', manejarGeneracion);
botonGuardar.addEventListener('click', guardarPaletaActual);
botonToggleFormato.addEventListener('click', alternarFormato);

actualizarBotonFormato();

cargarPaletasGuardadas();
renderizarPaletasGuardadas();

manejarGeneracion();
