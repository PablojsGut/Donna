const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  // === EMPLEADOS ===
  listarEmpleados: () => ipcRenderer.invoke("empleado:listar"),
  insertarEmpleado: (nombre) => ipcRenderer.invoke("empleado:insertar", nombre),
  actualizarEmpleado: (id, nombre, estado) => ipcRenderer.invoke("empleado:actualizar", id, nombre, estado),
  eliminarEmpleado: (id) => ipcRenderer.invoke("empleado:eliminar", id),

  // === PRODUCTOS ===
  listarProductos: () => ipcRenderer.invoke("producto:listar"),
  insertarProducto: (nombre, peso) => ipcRenderer.invoke("producto:insertar", nombre, peso),

  // === PESAJE ===
  listarPesajes: () => ipcRenderer.invoke("pesaje:listar"),
  insertarPesaje: (data) => ipcRenderer.invoke("pesaje:insertar", data),

  // === BOLSAS ===
  listarBolsas: () => ipcRenderer.invoke("bolsa:listar"),
  insertarBolsa: (data) => ipcRenderer.invoke("bolsa:insertar", data),

  // === LIMPIEZA ===
  limpiarAntiguos: () => ipcRenderer.invoke("db:limpiar-antiguos"),
});
