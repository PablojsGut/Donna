import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { fileURLToPath } from "url";
import db from "./src/db/database.js"; // ✅ Conexión SQLite
import { insertarEmpleado, listarEmpleados } from "./src/db/service.js"; // Ejemplo de funciones CRUD

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1100,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
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

// ✅ Empleados
ipcMain.handle("empleado:listar", () => listarEmpleados());
ipcMain.handle("empleado:insertar", (event, nombre) => insertarEmpleado(nombre));

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
