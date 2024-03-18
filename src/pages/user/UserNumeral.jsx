import React, { useEffect, useState } from "react";
import { supabase } from "../../supabase/supabaseClient";
import PreviewQuestions from "../../components/PreviewQuestions";
import { useParams } from "react-router-dom";
const UserNumeral = ({ elementoId }) => {
  const [numeralInfo, setNumeralInfo] = useState(null);
  const { tipo } = useParams();
  useEffect(() => {
    const fetchNumeralInfo = async () => {
      try {
        // Aquí haces la consulta para obtener la información del numeral correspondiente al elementoId
        const { data, error } = await supabase
          .from("actividad_numeral")
          .select("*")
          .eq("elemento_id", elementoId)
          .single();

        if (error) {
          throw error;
        }

        setNumeralInfo(data);
      } catch (error) {
        console.error(
          "Error al obtener información del numeral:",
          error.message
        );
      }
    };

    fetchNumeralInfo();
  }, [elementoId]);

  if (!numeralInfo) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="flex flex-col gap-5">
      <h1>{numeralInfo && numeralInfo.titulo}</h1>
      <h2>{numeralInfo && numeralInfo.enunciado}</h2>
      <PreviewQuestions contentType={tipo}></PreviewQuestions>
    </div>
  );
};

export default UserNumeral;
