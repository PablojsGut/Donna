import React from "react";

function Sidebar({ active, onSelect }) {
  const menuItems = [
    { id: "ingresarPesaje", label: "Ingresar Pesaje" },
    { id: "verRegistros", label: "Ver Registros" },
    { id: "empleados", label: "Empleados" },
    { id: "productos", label: "Productos" },
  ];

  return (
    <div
      className="d-flex flex-column bg-light shadow p-3"
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        height: "100vh",
        width: "220px",
        zIndex: 1000,
      }}
    >
      <h5 className="text-center mb-4">Menú</h5>
      <ul className="nav nav-pills flex-column">
        {menuItems.map((item) => (
          <li className="nav-item mb-2" key={item.id}>
            <button
              className={`btn w-100 text-start ${
                active === item.id ? "btn-primary" : "btn-outline-primary"
              }`}
              onClick={() => onSelect(item.id)}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
