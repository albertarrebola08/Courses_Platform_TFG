import React, { useEffect, useState } from "react";
import { supabase } from "../../supabase/supabaseClient";
import FileViewer from "../../components/FileViewer";

const UserMaterial = ({ elementoId }) => {
  const [materialInfo, setMaterialInfo] = useState(null);

  useEffect(() => {
    const fetchMaterialInfo = async () => {
      try {
        // Aquí haces la consulta para obtener la información del material correspondiente al elementoId
        const { data, error } = await supabase
          .from("material")
          .select("*")
          .eq("elemento_id", elementoId)
          .single();

        if (error) {
          throw error;
        }

        setMaterialInfo(data);
      } catch (error) {
        console.error(
          "Error al obtener información del material:",
          error.message
        );
      }
    };

    fetchMaterialInfo();
  }, [elementoId]);

  if (!materialInfo) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="flex flex-col gap-5">
      <h1>{materialInfo && materialInfo.titulo}</h1>
      <h2>{materialInfo && materialInfo.descripcion}</h2>
      <FileViewer
        key={materialInfo && materialInfo.archivo_url}
        archivoUrl={materialInfo && materialInfo.archivo_url}
        titulo={materialInfo && materialInfo.titulo}
      />
    </div>
  );
};

export default UserMaterial;
