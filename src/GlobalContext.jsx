import { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [detalleModulo, setDetalleModulo] = useState([]);

  return (
    <GlobalContext.Provider
      value={{
        detalleModulo,
        setDetalleModulo,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
