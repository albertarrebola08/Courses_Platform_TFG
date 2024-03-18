import React, { useEffect, useState } from "react";
import { supabase } from "../../supabase/supabaseClient";
import FileViewer from "../../components/FileViewer";

const UserVideo = ({ elementoId }) => {
  const [videoInfo, setVideoInfo] = useState(null);

  useEffect(() => {
    const fetchVideoInfo = async () => {
      try {
        // Aquí haces la consulta para obtener la información del video correspondiente al elementoId
        const { data, error } = await supabase
          .from("video")
          .select("*")
          .eq("elemento_id", elementoId)
          .single();

        if (error) {
          throw error;
        }

        setVideoInfo(data);
      } catch (error) {
        console.error("Error al obtener información del video:", error.message);
      }
    };

    fetchVideoInfo();
  }, [elementoId]);

  if (!videoInfo) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="flex flex-col gap-5">
      <h1>{videoInfo && videoInfo.titulo}</h1>
      <FileViewer
        key={videoInfo && videoInfo.url}
        archivoUrl={videoInfo && videoInfo.url}
        titulo={videoInfo && videoInfo.titulo}
      />
    </div>
  );
};

export default UserVideo;
