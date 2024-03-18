import React, { useEffect, useState } from "react";
import { supabase } from "../../supabase/supabaseClient";
import FileViewer from "../../components/FileViewer";

const UserAcciona = ({ elementoId }) => {
  const [accionaInfo, setAccionaInfo] = useState(null);

  useEffect(() => {
    const fetchAccionaInfo = async () => {
      try {
        // Aquí haces la consulta para obtener la información del acciona correspondiente al elementoId
        const { data, error } = await supabase
          .from("acciona")
          .select("*")
          .eq("elemento_id", elementoId)
          .single();

        if (error) {
          throw error;
        }

        setAccionaInfo(data);
      } catch (error) {
        console.error(
          "Error al obtener información del acciona:",
          error.message
        );
      }
    };

    fetchAccionaInfo();
  }, [elementoId]);

  if (!accionaInfo) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="flex flex-col gap-5">
      <h1>{accionaInfo && accionaInfo.titulo}</h1>
      <h2>{accionaInfo && accionaInfo.enunciado}</h2>
      {accionaInfo && accionaInfo.video_enunciado && (
        <FileViewer
          key={accionaInfo.video_enunciado}
          archivoUrl={accionaInfo.video_enunciado}
          titulo={accionaInfo.titulo}
        />
      )}
      {accionaInfo && accionaInfo.archivo_url && (
        <FileViewer
          key={accionaInfo.archivo_url}
          archivoUrl={accionaInfo.archivo_url}
          titulo={accionaInfo.titulo}
        />
      )}
    </div>
  );
};

export default UserAcciona;
