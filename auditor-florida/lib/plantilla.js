// Relleno de la plantilla y traducción de los datos crudos a las frases que se
// imprimen. Regla del documento: números, nunca adjetivos.

const SIN_DATO = '—';

const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
const MESES_CORTOS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun',
  'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

export function escapar(valor) {
  return String(valor ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function rellenar(plantilla, variables) {
  return plantilla.replace(/\{\{(\w+)\}\}/g, (_, clave) => {
    const valor = variables[clave];
    return escapar(valor ?? SIN_DATO);
  });
}

export function fechaLarga(d) {
  return `${d.getDate()} de ${MESES[d.getMonth()]} de ${d.getFullYear()}`;
}

function fechaCorta(d) {
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  return `${d.getDate()} ${MESES_CORTOS[d.getMonth()]} · ${hh}:${mm}`;
}

function aFecha(texto) {
  if (!texto) return null;
  const d = new Date(String(texto).trim().replace(' ', 'T'));
  return Number.isNaN(d.getTime()) ? null : d;
}

function esSi(texto) {
  return /^(s[íi]|si|yes|y|1|true|ok)$/i.test(String(texto ?? '').trim());
}

function numero(texto) {
  const n = Number(String(texto ?? '').replace(/[^\d.-]/g, ''));
  return Number.isFinite(n) ? n : null;
}

function conDecimal(n) {
  return String(Math.round(n * 10) / 10).replace('.', ',');
}

/**
 * Convierte una fila del CSV en las variables de la plantilla.
 * @param {object} fila     fila de negocios.csv
 * @param {object} config   config.json (contacto del cierre)
 * @param {object} extras   datos medidos al vuelo: { velocidad, segundos, menciones }
 *                          cualquiera de ellos puede ser null si la API falló
 * @param {Date}   ahora    momento de generación del informe
 */
export function construirVariables(fila, config, extras = {}, ahora = new Date()) {
  const v = {};

  v.negocio = fila.nombre || SIN_DATO;
  v.ciudad = fila.ciudad || SIN_DATO;
  v.fecha = fechaLarga(ahora);
  v.consulta = fila.servicio && fila.ciudad
    ? `${fila.servicio} en ${fila.ciudad}`
    : (fila.servicio || fila.ciudad || SIN_DATO);

  // 1 · Búsqueda local
  v.comp1 = fila.competidor1 || SIN_DATO;
  v.comp2 = fila.competidor2 || SIN_DATO;
  v.comp3 = fila.competidor3 || SIN_DATO;
  const pos = numero(fila.posicion_google);
  v.posicion = pos ? String(pos) : SIN_DATO;

  // 2 · Ficha de Google
  v.lider = fila.competidor1 || 'Competidor líder';
  v.fotos_negocio = fila.fotos_ficha || SIN_DATO;
  v.fotos_lider = fila.lider_fotos || SIN_DATO;

  const res = numero(fila.resenas);
  const resLider = numero(fila.lider_resenas);
  v.resenas_negocio = res !== null ? String(res) : SIN_DATO;
  v.resenas_lider = resLider !== null ? String(resLider) : SIN_DATO;

  const resp = numero(fila.resenas_respondidas);
  const respLider = numero(fila.lider_resenas_respondidas);
  v.respondidas_negocio = resp !== null && res !== null ? `${resp} de ${res}` : SIN_DATO;
  v.respondidas_lider = respLider !== null && resLider !== null ? `${respLider} de ${resLider}` : SIN_DATO;

  v.horario_negocio = fila.horario_ok ? (esSi(fila.horario_ok) ? 'Sí' : 'No') : SIN_DATO;
  v.horario_lider = fila.lider_horario_ok ? (esSi(fila.lider_horario_ok) ? 'Sí' : 'No') : SIN_DATO;

  // 3 · Prueba de respuesta
  const envio = aFecha(fila.hora_mensaje_enviado);
  const respuesta = aFecha(fila.hora_respuesta);
  v.envio = envio ? fechaCorta(envio) : SIN_DATO;
  v.respuesta = respuesta ? fechaCorta(respuesta) : 'Sin respuesta';

  if (envio) {
    const hasta = respuesta || ahora;
    const horas = Math.floor((hasta - envio) / 3600000);
    v.horas = `${horas} horas`;
    v.horas_nota = respuesta
      ? 'desde el mensaje hasta la respuesta'
      : 'y sigue sin respuesta';
  } else {
    v.horas = SIN_DATO;
    v.horas_nota = '';
  }

  // 4 · Sitio web
  v.web = fila.web || 'Sin sitio web';
  v.velocidad = extras.velocidad !== null && extras.velocidad !== undefined
    ? `${extras.velocidad} / 100`
    : SIN_DATO;
  v.velocidad_nota = extras.segundos !== null && extras.segundos !== undefined
    ? `${conDecimal(extras.segundos)} segundos hasta ver la página`
    : '';

  if (extras.menciones === null || extras.menciones === undefined) {
    v.ciudad_web = SIN_DATO;
    v.ciudad_web_nota = '';
  } else if (extras.menciones === 0) {
    v.ciudad_web = 'No aparece';
    v.ciudad_web_nota = 'ni una vez en el texto de la página';
  } else {
    v.ciudad_web = `${extras.menciones} ${extras.menciones === 1 ? 'vez' : 'veces'}`;
    v.ciudad_web_nota = 'en el texto de la página';
  }

  // Cierre
  v.contacto_nombre = config?.contacto?.nombre || SIN_DATO;
  v.contacto_telefono = config?.contacto?.telefono || SIN_DATO;
  v.contacto_email = config?.contacto?.email || SIN_DATO;

  return v;
}
