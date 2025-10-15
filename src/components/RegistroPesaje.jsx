import React, { useState } from "react";

function RegistroPesaje() {
  const [formData, setFormData] = useState({
    fechaProduccion: "",
    fechaPesaje: "",
    producto: "",
    responsable: "",
  });

  const [registros, setRegistros] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.fechaProduccion || !formData.fechaPesaje || !formData.producto || !formData.responsable) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    setRegistros((prev) => [...prev, formData]);
    setFormData({ fechaProduccion: "", fechaPesaje: "", producto: "", responsable: "" });
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6 max-w-lg mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Fecha de producción</label>
          <input
            type="date"
            name="fechaProduccion"
            value={formData.fechaProduccion}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Fecha de pesaje</label>
          <input
            type="date"
            name="fechaPesaje"
            value={formData.fechaPesaje}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Nombre del producto</label>
          <input
            type="text"
            name="producto"
            value={formData.producto}
            onChange={handleChange}
            placeholder="Ej. Yogur natural"
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Responsable</label>
          <input
            type="text"
            name="responsable"
            value={formData.responsable}
            onChange={handleChange}
            placeholder="Ej. Juan Pérez"
            className="w-full border rounded-lg p-2"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Guardar Registro
        </button>
      </form>

      {registros.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-3">Registros Guardados</h2>
          <table className="w-full border border-gray-200 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Producción</th>
                <th className="border p-2">Pesaje</th>
                <th className="border p-2">Producto</th>
                <th className="border p-2">Responsable</th>
              </tr>
            </thead>
            <tbody>
              {registros.map((r, i) => (
                <tr key={i} className="text-center">
                  <td className="border p-2">{r.fechaProduccion}</td>
                  <td className="border p-2">{r.fechaPesaje}</td>
                  <td className="border p-2">{r.producto}</td>
                  <td className="border p-2">{r.responsable}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default RegistroPesaje;
