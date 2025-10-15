import React, { useState, useEffect } from "react";

function EmpleadosPage() {
  const [empleados, setEmpleados] = useState([]);
  const [nuevoEmpleado, setNuevoEmpleado] = useState("");

  const cargarEmpleados = async () => {
    const data = await window.api.listarEmpleados();
    setEmpleados(data);
  };

  const agregarEmpleado = async () => {
    if (!nuevoEmpleado.trim()) return;
    await window.api.insertarEmpleado(nuevoEmpleado);
    setNuevoEmpleado("");
    cargarEmpleados();
  };

  useEffect(() => {
    cargarEmpleados();
  }, []);

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h3 className="text-primary mb-3">Gestión de Empleados</h3>

          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Nombre del empleado"
              value={nuevoEmpleado}
              onChange={(e) => setNuevoEmpleado(e.target.value)}
            />
            <button className="btn btn-success" onClick={agregarEmpleado}>
              Agregar
            </button>
          </div>

          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {empleados.map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.id}</td>
                  <td>{emp.nombre}</td>
                  <td>{emp.estado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default EmpleadosPage;
