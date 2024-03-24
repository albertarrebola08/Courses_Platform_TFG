import { Reorder } from "framer-motion";
import React, { useState } from "react";
import { obtenerIconoPorTipo } from "../../pages/dashboard/ModuloPage";
import { ColorsEnum, IconButton, Tooltip } from "pol-ui";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useParams } from "react-router-dom";

const ItemModuloRow = ({ item, onDelete }) => {
  const { moduleId } = useParams();

  const [hasClickedDelete, setHasClickedDelete] = useState(false);

  return (
    <Reorder.Item
      value={item}
      className="bg-secondary-50 justify-between flex gap-2 items-center p-3 rounded-xl cursor-pointer"
    >
      <header className="flex gap-2 items-center">
        <Tooltip content={item.tipo}>{obtenerIconoPorTipo(item.tipo)}</Tooltip>
        {item.titulo}
      </header>
      <div className="flex gap-2 items-center">
        <IconButton href={`${moduleId}/${item.tipo}/${item.id}`}>
          <FaEdit />
        </IconButton>
        <IconButton
          loading={hasClickedDelete}
          color={ColorsEnum.error}
          onClick={() => {
            onDelete(item.id);
            setHasClickedDelete(true);
          }}
        >
          <FaTrash />
        </IconButton>
      </div>
    </Reorder.Item>
  );
};

export default ItemModuloRow;
