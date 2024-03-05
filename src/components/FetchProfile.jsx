import React from 'react'


const obtenerDetallePerfil = async (id) => {
  try {
    const { data: perfilData, error } = await supabase
      .from("perfiles")
      .select("*")
      .eq("user_id", id);

    if (error) {
      console.error("Error al obtener el detalle del perfil:", error.message);
    } else {
      console.log("Detalle perfil:", perfilData);
      setPerfilInfo(perfilData);
    }
  } catch (error) {
    console.error("Error al obtener el detalle del perfil:", error.message);
  }



  return (
    obtenerDetallePerfil(id)
  )
}

export default obtenerDetallePerfil;