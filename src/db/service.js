import db from "./database.js";

/* ===================== EMPLEADO ===================== */

// Crear empleado
export function insertarEmpleado(nombre, estado = "Disponible") {
  const stmt = db.prepare(`
    INSERT INTO empleado (nombre, estado)
    VALUES (?, ?)
  `);
  return stmt.run(nombre, estado);
}

// Listar todos los empleados
export function listarEmpleados() {
  const stmt = db.prepare("SELECT * FROM empleado ORDER BY nombre ASC");
  return stmt.all();
}

// Actualizar empleado
export function actualizarEmpleado(id, nombre, estado) {
  const stmt = db.prepare(`
    UPDATE empleado
    SET nombre = ?, estado = ?
    WHERE id = ?
  `);
  return stmt.run(nombre, estado, id);
}

// Eliminar empleado
export function eliminarEmpleado(id) {
  const stmt = db.prepare("DELETE FROM empleado WHERE id = ?");
  return stmt.run(id);
}


/* ===================== PRODUCTO ===================== */

// Crear producto
export function insertarProducto(nombre, peso) {
  const stmt = db.prepare(`
    INSERT INTO producto (nombre, peso)
    VALUES (?, ?)
  `);
  return stmt.run(nombre, peso);
}

// Listar todos los productos
export function listarProductos() {
  const stmt = db.prepare("SELECT * FROM producto ORDER BY nombre ASC");
  return stmt.all();
}

// Actualizar producto
export function actualizarProducto(id, nombre, peso) {
  const stmt = db.prepare(`
    UPDATE producto
    SET nombre = ?, peso = ?
    WHERE id = ?
  `);
  return stmt.run(nombre, peso, id);
}

// Eliminar producto
export function eliminarProducto(id) {
  const stmt = db.prepare("DELETE FROM producto WHERE id = ?");
  return stmt.run(id);
}


/* ===================== PESAJE ===================== */

// Crear pesaje
export function insertarPesaje({
  id_pesaje,
  id_empleado,
  id_producto,
  fecha_pesaje,
  id_empleado_produccion = null,
  fecha_produccion = null,
}) {
  const stmt = db.prepare(`
    INSERT INTO pesaje (id_pesaje, id_empleado, id_producto, fecha_pesaje, id_empleado_produccion, fecha_produccion)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  return stmt.run(
    id_pesaje,
    id_empleado,
    id_producto,
    fecha_pesaje,
    id_empleado_produccion,
    fecha_produccion
  );
}

// Listar todos los pesajes
export function listarPesajes() {
  const stmt = db.prepare(`
    SELECT p.*, e.nombre AS empleado_nombre, pr.nombre AS producto_nombre
    FROM pesaje p
    LEFT JOIN empleado e ON p.id_empleado = e.id
    LEFT JOIN producto pr ON p.id_producto = pr.id
    ORDER BY fecha_pesaje DESC
  `);
  return stmt.all();
}

// Actualizar pesaje
export function actualizarPesaje({
  id_pesaje,
  id_empleado,
  id_producto,
  fecha_pesaje,
  id_empleado_produccion = null,
  fecha_produccion = null,
}) {
  const stmt = db.prepare(`
    UPDATE pesaje
    SET id_empleado = ?, id_producto = ?, fecha_pesaje = ?, id_empleado_produccion = ?, fecha_produccion = ?
    WHERE id_pesaje = ?
  `);
  return stmt.run(
    id_empleado,
    id_producto,
    fecha_pesaje,
    id_empleado_produccion,
    fecha_produccion,
    id_pesaje
  );
}

// Eliminar pesaje
export function eliminarPesaje(id_pesaje) {
  const stmt = db.prepare("DELETE FROM pesaje WHERE id_pesaje = ?");
  return stmt.run(id_pesaje);
}


/* ===================== BOLSA ===================== */

// Crear bolsa
export function insertarBolsa({
  id_bolsa,
  peso_total = null,
  cant_product = null,
  num_bolsa,
  id_pesaje,
}) {
  const stmt = db.prepare(`
    INSERT INTO bolsa (id_bolsa, peso_total, cant_product, num_bolsa, id_pesaje)
    VALUES (?, ?, ?, ?, ?)
  `);
  return stmt.run(id_bolsa, peso_total, cant_product, num_bolsa, id_pesaje);
}

// Listar todas las bolsas
export function listarBolsas() {
  const stmt = db.prepare(`
    SELECT b.*, p.id_producto, p.fecha_pesaje
    FROM bolsa b
    LEFT JOIN pesaje p ON b.id_pesaje = p.id_pesaje
    ORDER BY num_bolsa ASC
  `);
  return stmt.all();
}

// Actualizar bolsa
export function actualizarBolsa({
  id_bolsa,
  peso_total = null,
  cant_product = null,
  num_bolsa,
  id_pesaje,
}) {
  const stmt = db.prepare(`
    UPDATE bolsa
    SET peso_total = ?, cant_product = ?, num_bolsa = ?, id_pesaje = ?
    WHERE id_bolsa = ?
  `);
  return stmt.run(peso_total, cant_product, num_bolsa, id_pesaje, id_bolsa);
}

// Eliminar bolsa
export function eliminarBolsa(id_bolsa) {
  const stmt = db.prepare("DELETE FROM bolsa WHERE id_bolsa = ?");
  return stmt.run(id_bolsa);
}
