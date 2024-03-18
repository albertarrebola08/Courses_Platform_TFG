import { createContext, useState } from "react";

import { TiHome } from "react-icons/ti";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [detalleModulo, setDetalleModulo] = useState([]);
  const [progressPercent, setProgressPercent] = useState([]);
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
        progressPercent,
        setProgressPercent,

        itemsBreadcrumb,
        setItemsBreadcrumb,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
