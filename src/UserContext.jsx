import { createContext, useEffect, useState } from "react";
import { supabase } from "./supabase/supabaseClient";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [perfilInfo, setPerfilInfo] = useState(() => {
    const storedPerfilInfo = localStorage.getItem("perfilInfo");
    return storedPerfilInfo ? JSON.parse(storedPerfilInfo) : null;
  });

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem("perfilInfo", JSON.stringify(perfilInfo));
  }, [perfilInfo]);

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setPerfilInfo(null);
      localStorage.removeItem("user");
      localStorage.removeItem("perfilInfo");
    } catch (error) {
      console.error("Error al cerrar sesión:", error.message);
    }
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, perfilInfo, setPerfilInfo, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};
