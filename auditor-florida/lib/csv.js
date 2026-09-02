// Lector de CSV mínimo pero correcto: admite comillas, comas dentro de comillas,
// comillas escapadas ("") y saltos de línea Windows. Sin dependencias.

export function leerCsv(texto) {
  const filas = [];
  let campo = '';
  let fila = [];
  let entreComillas = false;

  const limpio = texto.replace(/^﻿/, '').replace(/\r\n/g, '\n').replace(/\r/g, '\n');

  for (let i = 0; i < limpio.length; i++) {
    const c = limpio[i];

    if (entreComillas) {
      if (c === '"') {
        if (limpio[i + 1] === '"') { campo += '"'; i++; }
        else entreComillas = false;
      } else campo += c;
      continue;
    }

    if (c === '"') entreComillas = true;
    else if (c === ',') { fila.push(campo); campo = ''; }
    else if (c === '\n') { fila.push(campo); filas.push(fila); fila = []; campo = ''; }
    else campo += c;
  }

  if (campo !== '' || fila.length) { fila.push(campo); filas.push(fila); }

  const conDatos = filas.filter((f) => f.some((v) => v.trim() !== ''));
  if (!conDatos.length) return [];

  const cabecera = conDatos[0].map((h) => h.trim());
  return conDatos.slice(1).map((valores) => {
    const objeto = {};
    cabecera.forEach((clave, i) => { objeto[clave] = (valores[i] ?? '').trim(); });
    return objeto;
  });
}
