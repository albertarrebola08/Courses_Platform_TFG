import { createContext, useState } from "react";
import {
  AiFillAlipayCircle,
  AiOutlineRead,
  AiTwotoneDatabase,
} from "react-icons/ai";
import { TiHome } from "react-icons/ti";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [detalleModulo, setDetalleModulo] = useState([]);
  const [itemsBreadcrumb, setItemsBreadcrumb] = useState([
    {
      icono: TiHome,
      texto: "Els meus cursos",
    },
  ]);

  return (
    <GlobalContext.Provider
      value={{
        detalleModulo,
        setDetalleModulo,

        itemsBreadcrumb,
        setItemsBreadcrumb,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
