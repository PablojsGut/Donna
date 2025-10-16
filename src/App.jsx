import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import RegistroPesajePage from "./pages/RegistroPesajePage";
import EmpleadosPage from "./pages/EmpleadosPage";

function App() {
  const [activePage, setActivePage] = useState("ingresarPesaje");

  const renderPage = () => {
    switch (activePage) {
      case "ingresarPesaje":
        return <RegistroPesajePage />;
      case "verRegistros":
        return <VerRegistrosPage />;
      case "empleados":
        return <EmpleadosPage />;
      case "productos":
        return <ProductosPage />;
      default:
        return <RegistroPesajePage />;
    }
  };

  return (
    <div className="d-flex">
      <div className="flex-grow-1">{renderPage()}</div>
      <Sidebar active={activePage} onSelect={setActivePage} />
    </div>
  );
}

export default App;
