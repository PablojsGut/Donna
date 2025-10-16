import React, { useState } from "react";
import menuIcon from "../assets/menu.svg";

function Sidebar({ active, onSelect }) {
  const [open, setOpen] = useState(false);

  const menuItems = [
    { id: "ingresarPesaje", label: "Ingresar Pesaje" },
    { id: "verRegistros", label: "Ver Registros" },
    { id: "empleados", label: "Empleados" },
    { id: "productos", label: "Productos" },
  ];

  return (
    <>
      {/* Botón para abrir/cerrar el menú */}
      <button
        className="btn btn-light position-fixed top-0 start-0 m-3 shadow-sm"
        style={{ zIndex: 1100, borderRadius: "50%", width: "48px", height: "48px" }}
        onClick={() => setOpen(!open)}
      >
        <img
          src={menuIcon}
          alt="Menú"
          style={{ width: "24px", height: "24px" }}
        />
      </button>

      {/* Sidebar lateral */}
      <div
        className={`d-flex flex-column bg-light shadow p-3 transition-all`}
        style={{
          position: "fixed",
          top: 0,
          left: open ? 0 : "-240px",
          height: "100vh",
          width: "220px",
          zIndex: 1000,
          transition: "left 0.3s ease-in-out",
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
                onClick={() => {
                  onSelect(item.id);
                  setOpen(false); // Cierra el menú al seleccionar
                }}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
