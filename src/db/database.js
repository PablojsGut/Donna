// database.js
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, "pesajes.db");

if (!fs.existsSync(path.dirname(dbPath))) fs.mkdirSync(path.dirname(dbPath), { recursive: true });

const db = new Database(dbPath);

// Crear todas las tablas aquí mismo
db.prepare(`
  CREATE TABLE IF NOT EXISTS empleado (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    estado TEXT CHECK(estado IN ('Disponible', 'No Disponible')) DEFAULT 'Disponible'
  )
`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS producto (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    peso REAL NOT NULL
  )
`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS pesaje (
    id_pesaje TEXT PRIMARY KEY,
    id_empleado INTEGER NOT NULL,
    id_producto INTEGER NOT NULL,
    fecha_pesaje TEXT NOT NULL,
    id_empleado_produccion INTEGER,
    fecha_produccion TEXT,
    FOREIGN KEY (id_empleado) REFERENCES empleado(id),
    FOREIGN KEY (id_producto) REFERENCES producto(id),
    FOREIGN KEY (id_empleado_produccion) REFERENCES empleado(id)
  )
`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS bolsa (
    id_bolsa TEXT PRIMARY KEY,
    peso_total REAL,
    cant_product REAL,
    num_bolsa INTEGER,
    id_pesaje TEXT NOT NULL,
    FOREIGN KEY (id_pesaje) REFERENCES pesaje(id_pesaje)
  )
`).run();

export default db;
