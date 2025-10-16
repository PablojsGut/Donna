import React, { useState, useEffect } from "react";
import EmpleadoForm from "../components/empleados/EmpleadoForm";
import EmpleadosTable from "../components/empleados/EmpleadosTable";
import ActionButtons from "../components/ActionButtons";

function EmpleadosPage() {
  const [empleados, setEmpleados] = useState([]);
  const [nuevoEmpleado, setNuevoEmpleado] = useState("");
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState(null);
  const [editandoId, setEditandoId] = useState(null);
  const [nombreEditado, setNombreEditado] = useState("");

  const cargarEmpleados = async () => {
    const data = await window.api.listarEmpleados();
    const disponibles = data.filter((emp) => emp.estado === "Disponible");
    setEmpleados(disponibles);
  };

  const agregarEmpleado = async () => {
    if (!nuevoEmpleado.trim()) return;
    await window.api.insertarEmpleado(nuevoEmpleado);
    setNuevoEmpleado("");
    cargarEmpleados();
  };

  const iniciarEdicion = () => {
    if (!empleadoSeleccionado)
      return alert("Selecciona un empleado para editar");
    setEditandoId(empleadoSeleccionado.id);
    setNombreEditado(empleadoSeleccionado.nombre);
  };

  const guardarCambios = async () => {
    if (!nombreEditado.trim() || !editandoId) return;
    await window.api.actualizarEmpleado(editandoId, nombreEditado, "Disponible");
    setEditandoId(null);
    setEmpleadoSeleccionado(null);
    setNombreEditado("");
    cargarEmpleados();
  };

  const eliminarEmpleado = async () => {
    if (!empleadoSeleccionado)
      return alert("Selecciona un empleado para eliminar");
    const confirmacion = confirm("¿Seguro que deseas eliminar este empleado?");
    if (!confirmacion) return;

    await window.api.eliminarEmpleado(empleadoSeleccionado.id);
    setEmpleadoSeleccionado(null);
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

          <EmpleadoForm
            nuevoEmpleado={nuevoEmpleado}
            setNuevoEmpleado={setNuevoEmpleado}
            onAgregar={agregarEmpleado}
          />

          <ActionButtons
            onSave={guardarCambios}
            onEdit={iniciarEdicion}
            onDelete={eliminarEmpleado}
            isEditing={!!editandoId}
          />

          <EmpleadosTable
            empleados={empleados}
            editandoId={editandoId}
            nombreEditado={nombreEditado}
            setNombreEditado={setNombreEditado}
            onSelect={setEmpleadoSeleccionado}
          />
        </div>
      </div>
    </div>
  );
}

export default EmpleadosPage;
