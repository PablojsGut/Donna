import React from "react";
import RegistroPesaje from "./components/RegistroPesaje";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Registro de Pesaje de Productos
      </h1>
      <RegistroPesaje />
    </div>
  );
}

export default App;
