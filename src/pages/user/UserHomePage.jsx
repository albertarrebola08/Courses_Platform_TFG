import React, { useContext } from "react";

import UserHeader from "./Home/UserHeader";
//contexto con info del perfil y del user actual
import { UserContext } from "../../UserContext";
import { supabase } from "../../supabase/supabaseClient";

function UserHomePage() {
  const { user, perfilInfo } = useContext(UserContext);
  console.log("profile desde context: ", perfilInfo);
  return (
    <div className="p-8">
      <UserHeader />
      {perfilInfo && (
        <>
          <h1>Benvingut {perfilInfo.nombre}</h1>
          <h2>{perfilInfo.apellidos}</h2>

          <h3>{perfilInfo.telefono}</h3>
          {user.user && <h5>{user.user.email}</h5>}
          <a href="/curso">ir al curso</a>
        </>
      )}
    </div>
  );
}

export default UserHomePage;
