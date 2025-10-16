import React from "react";

function EmpleadosTable({
  empleados,
  editandoId,
  nombreEditado,
  setNombreEditado,
  onSelect,
}) {
  return (
    <table className="table table-bordered align-middle">
      <thead className="table-light">
        <tr>
          <th>ID</th>
          <th>Nombre</th>
        </tr>
      </thead>
      <tbody>
        {empleados.map((emp) => (
          <tr
            key={emp.id}
            className={editandoId === emp.id ? "table-warning" : ""}
            // ⚠️ Solo permite seleccionar si NO se está editando
            onClick={() => {
              if (!editandoId) onSelect(emp);
            }}
            style={{ cursor: "pointer" }}
          >
            <td>{emp.id}</td>
            <td>
              {editandoId === emp.id ? (
                <input
                  type="text"
                  className="form-control"
                  value={nombreEditado}
                  onChange={(e) => setNombreEditado(e.target.value)}
                  onClick={(e) => e.stopPropagation()} // Evita deseleccionar al hacer clic dentro
                  autoFocus
                />
              ) : (
                emp.nombre
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default EmpleadosTable;
