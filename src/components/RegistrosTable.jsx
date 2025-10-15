import React from "react";

function RegistrosTable({ registros }) {
  return (
    <table className="table table-striped table-bordered mt-2">
      <thead>
        <tr>
          <th>Producción</th>
          <th>Pesaje</th>
          <th>Producto</th>
          <th>Responsable</th>
        </tr>
      </thead>
      <tbody>
        {registros.map((r, i) => (
          <tr key={i}>
            <td>{r.fechaProduccion}</td>
            <td>{r.fechaPesaje}</td>
            <td>{r.producto}</td>
            <td>{r.responsable}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default RegistrosTable;
