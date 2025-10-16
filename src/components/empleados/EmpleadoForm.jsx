import React from "react";

function EmpleadoForm({ nuevoEmpleado, setNuevoEmpleado, onAgregar }) {
  return (
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Nombre del empleado"
        value={nuevoEmpleado}
        onChange={(e) => setNuevoEmpleado(e.target.value)}
      />
      <button className="btn btn-success" onClick={onAgregar}>
        Agregar
      </button>
    </div>
  );
}

export default EmpleadoForm;
