import React from "react";

function ResponsableSelect({ value, onChange, opciones = [] }) {
  return (
    <select
      className="form-select"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">Selecciona un responsable</option>
      {opciones.map((r, i) => (
        <option key={i} value={r}>
          {r}
        </option>
      ))}
    </select>
  );
}

export default ResponsableSelect;
