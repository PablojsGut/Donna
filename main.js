import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { fileURLToPath } from "url";
import db from "./src/db/database.js"; // ✅ Conexión SQLite
import {
  listarEmpleados,
  insertarEmpleado,
  listarProductos,
  insertarProducto,
  listarPesajes,
  insertarPesaje,
  listarBolsas,
  insertarBolsa,
} from "./src/db/service.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1100,
    height: 800,
    webPreferences: {
      preload: path.join(
        app.isPackaged
          ? path.join(process.resourcesPath, "preload.js") // ✅ producción
          : path.join(__dirname, "preload.js") // ✅ desarrollo
      ),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (!app.isPackaged) {
    mainWindow.loadURL("http://localhost:5173");
  } else {
    mainWindow.loadFile(path.join(__dirname, "dist", "index.html"));
  }
};

// ================== IPC COMUNICACIÓN ==================

// Empleados
ipcMain.handle("empleado:listar", () => listarEmpleados());
ipcMain.handle("empleado:insertar", (event, nombre) => insertarEmpleado(nombre));
ipcMain.handle("empleado:actualizar", (event, id, nombre, estado) => actualizarEmpleado(id, nombre, estado));
ipcMain.handle("empleado:eliminar", (event, id) => eliminarEmpleado(id));

ipcMain.handle("producto:listar", () => listarProductos());
ipcMain.handle("producto:insertar", (event, nombre, peso) => insertarProducto(nombre, peso));

ipcMain.handle("pesaje:listar", () => listarPesajes());
ipcMain.handle("pesaje:insertar", (event, data) => insertarPesaje(data));

ipcMain.handle("bolsa:listar", () => listarBolsas());
ipcMain.handle("bolsa:insertar", (event, data) => insertarBolsa(data));

// ✅ Limpieza automática
ipcMain.handle("db:limpiar-antiguos", () => {
  db.prepare(`
    DELETE FROM bolsa WHERE id_pesaje IN (
      SELECT id_pesaje FROM pesaje
      WHERE DATE(fecha_pesaje) <= DATE('now', '-30 days')
    )
  `).run();

  db.prepare(`
    DELETE FROM pesaje
    WHERE DATE(fecha_pesaje) <= DATE('now', '-30 days')
  `).run();
});

app.whenReady().then(() => {
  // Ejecutar limpieza al iniciar la app
  db.prepare(`
    DELETE FROM bolsa WHERE id_pesaje IN (
      SELECT id_pesaje FROM pesaje
      WHERE DATE(fecha_pesaje) <= DATE('now', '-30 days')
    )
  `).run();

  db.prepare(`
    DELETE FROM pesaje
    WHERE DATE(fecha_pesaje) <= DATE('now', '-30 days')
  `).run();

  createWindow();
});
