import React from "react";
import saveIcon from "../assets/save.svg";
import editIcon from "../assets/edit.svg";
import deleteIcon from "../assets/delete.svg";

function ActionButtons({ onSave, onEdit, onDelete, isEditing }) {
  return (
    <div className="d-flex gap-2 mb-3">
      {isEditing ? (
        <button
          type="button"
          className="btn btn-success d-flex align-items-center gap-2"
          onClick={onSave}
        >
          <img src={saveIcon} alt="Guardar" width="20" height="20" />
          Guardar
        </button>
      ) : (
        <button
          type="button"
          className="btn btn-primary d-flex align-items-center gap-2"
          onClick={onEdit}
        >
          <img src={editIcon} alt="Editar" width="20" height="20" />
          Editar
        </button>
      )}

      <button
        type="button"
        className="btn btn-danger d-flex align-items-center gap-2"
        onClick={onDelete}
      >
        <img src={deleteIcon} alt="Eliminar" width="20" height="20" />
        Eliminar
      </button>
    </div>
  );
}

export default ActionButtons;
