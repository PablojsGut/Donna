import React, { useState } from "react";
import RegistroForm from "../components/pesaje/RegistroForm";
import RegistrosTable from "../components/pesaje/RegistrosTable";

function RegistroPesajePage() {
  const [registros, setRegistros] = useState([]);

  const handleNuevoRegistro = (nuevoRegistro) => {
    setRegistros((prev) => [...prev, nuevoRegistro]);
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h3 className="card-title mb-4 text-center text-primary">
            Registro de Pesaje
          </h3>

          <RegistroForm onNuevoRegistro={handleNuevoRegistro} />

          {registros.length > 0 && (
            <div className="mt-4">
              <h5>Registros Guardados</h5>
              <RegistrosTable registros={registros} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RegistroPesajePage;
