import { useEffect, useState } from "react";

import { supabase } from "../../supabase/supabaseClient";
import {} from "react";
import PreviewQuestions from "../../components/PreviewQuestions";
import { useParams } from "react-router-dom";

const UserExamen = ({ elementoId }) => {
  const [examenInfo, setExamenInfo] = useState(null);
  const { tipo } = useParams();

  useEffect(() => {
    const fetchExamenInfo = async () => {
      try {
        // Aquí haces la consulta para obtener la información del examen correspondiente al elementoId
        const { data, error } = await supabase
          .from("examen")
          .select("*")
          .eq("elemento_id", elementoId)
          .single();

        if (error) {
          throw error;
        }

        setExamenInfo(data);
      } catch (error) {
        console.error(
          "Error al obtener información del examen:",
          error.message
        );
      }
    };

    fetchExamenInfo();
  }, [elementoId]);

  if (!examenInfo) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="flex flex-col gap-5">
      <h1>{examenInfo && examenInfo.titulo}</h1>
      <h2>{examenInfo && examenInfo.enunciado}</h2>

      <PreviewQuestions contentType={tipo}></PreviewQuestions>
    </div>
  );
};

export default UserExamen;
