import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../supabase/supabaseClient";
import UserHeader from "./Home/UserHeader";

function UserHomePage() {
  const { id } = useParams();
  const [perfilInfo, setPerfilInfo] = useState(null);

  useEffect(() => {
    const obtenerDetallePerfil = async (id) => {
      try {
        const { data: perfilData, error } = await supabase
          .from("perfiles")
          .select("*")
          .eq("user_id", id);

        if (error) {
          console.error(
            "Error al obtener el detalle del perfil:",
            error.message
          );
        } else {
          console.log("Detalle perfil:", perfilData);
          setPerfilInfo(perfilData);
        }
      } catch (error) {
        console.error("Error al obtener el detalle del perfil:", error.message);
      }
    };

    obtenerDetallePerfil(id);
  }, []);

  return (
    <div className="p-8">
      <UserHeader />
      {perfilInfo && (
        <>
          <h1>Benvingut {perfilInfo[0].nombre}</h1>
          <h2>{perfilInfo[0].apellidos}</h2>
          <img src={perfilInfo[0].avatar} alt="" />
          <h3>{perfilInfo[0].telefono}</h3>
        </>
      )}
    </div>
  );
}

export default UserHomePage;
