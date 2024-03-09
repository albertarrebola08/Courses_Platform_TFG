import React, { useContext } from "react";

import UserHeader from "./Home/UserHeader";
//contexto con info del perfil y del user actual
import { UserContext } from "../../UserContext";
import AllCursos from "../../components/Cursos/AllCursos";
import SidebarDefault from "../../components/Layout/SidebarDefault";

function UserHomePage() {
  const { user, perfilInfo } = useContext(UserContext);
  console.log("profile desde context: ", perfilInfo);
  return (
    <div className="p-8">
      <UserHeader />
      {/* <SidebarDefault></SidebarDefault> */}

    {/* MIRAR LAYOUT EN USER OCN POL !!! */}




      {perfilInfo && (
        <>
          <h1>Benvingut, {perfilInfo.nombre}</h1>
          <hr className="my-4" />
          {/* <h2>{perfilInfo.apellidos}</h2>

          <h3>{perfilInfo.telefono}</h3>
          {user.user && <h5>{user.user.email}</h5>} */}

          <h2 className="text-xl text-gray-500 ">Oferta de cursos</h2>
          <AllCursos></AllCursos>
        </>
      )}
    </div>
  );
}

export default UserHomePage;
