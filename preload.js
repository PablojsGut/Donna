import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("api", {
  // ---- Empleados ----
  listarEmpleados: () => ipcRenderer.invoke("empleado:listar"),
  insertarEmpleado: (nombre) => ipcRenderer.invoke("empleado:insertar", nombre),

  // ---- Limpieza ----
  limpiarAntiguos: () => ipcRenderer.invoke("db:limpiar-antiguos"),
});
