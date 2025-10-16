import React, { useState, useEffect } from "react";
import ResponsableSelect from "./ResponsableSelect";

function RegistroForm({ onNuevoRegistro }) {
  const hoy = new Date().toISOString().split("T")[0]; // fecha yyyy-mm-dd

  const [formData, setFormData] = useState({
    fechaProduccion: hoy,
    fechaPesaje: hoy,
    producto: "",
    responsable: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.fechaProduccion ||
      !formData.fechaPesaje ||
      !formData.producto ||
      !formData.responsable
    ) {
      alert("Por favor completa todos los campos.");
      return;
    }

    onNuevoRegistro(formData);

    setFormData({
      fechaProduccion: hoy,
      fechaPesaje: hoy,
      producto: "",
      responsable: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Fecha de Producción</label>
          <input
            type="date"
            name="fechaProduccion"
            value={formData.fechaProduccion}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Fecha de Pesaje</label>
          <input
            type="date"
            name="fechaPesaje"
            value={formData.fechaPesaje}
            onChange={handleChange}
            className="form-control"
          />
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Nombre del Producto</label>
        <input
          type="text"
          name="producto"
          value={formData.producto}
          onChange={handleChange}
          placeholder="Ej. Yogur natural"
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Responsable</label>
        <ResponsableSelect
          value={formData.responsable}
          onChange={(valor) =>
            setFormData((prev) => ({ ...prev, responsable: valor }))
          }
        />
      </div>

      <button type="submit" className="btn btn-primary w-100">
        Guardar Registro
      </button>
    </form>
  );
}

export default RegistroForm;
