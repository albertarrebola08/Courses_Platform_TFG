import { createContext, useState } from 'react';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [saludo, setSaludo] = useState('hola');
  const [detalleModulo, setDetalleModulo] = useState([]);



  return (

    <GlobalContext.Provider value={
      {
        saludo, setSaludo,
        detalleModulo, setDetalleModulo 
      }
      
    }>
      
      {children}
    </GlobalContext.Provider>
  );
};
