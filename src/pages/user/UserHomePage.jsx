import React, { useContext } from "react";

import UserHeader from "./Home/UserHeader";
//contexto con info del perfil y del user actual
import { UserContext } from "../../UserContext";
import AllCursos from "../../components/Cursos/AllCursos";
import { Button } from "pol-ui";
import { RiUser3Fill } from "react-icons/ri";

function UserHomePage() {
  const { user, perfilInfo } = useContext(UserContext);
  console.log("profile desde context: ", perfilInfo);
  return (
    <div className="p-8">
      <section className="flex h-full overflow-y-auto gap-4">
        <div className="bg-primary-50 w-fit shadow-md"></div>
        <div className="overflow-y-auto flex-1 mt-4 rounded-lg px-4 pb-8">
          <div className="my-3">
            <h3 className="text-2xl">
              {perfilInfo &&
                perfilInfo.nombre &&
                perfilInfo.apellidos &&
                `${perfilInfo.nombre} ${perfilInfo.apellidos}`}
            </h3>
          </div>
          <hr />

          <h3 className="text-xl ">Oferta de cursos</h3>
          <AllCursos></AllCursos>

          <Button href="/mis-cursos" color="success" className="w-fit">
            <RiUser3Fill/> Els meus cursos
          </Button>
        </div>
      </section>
    </div>
  );
}

export default UserHomePage;
