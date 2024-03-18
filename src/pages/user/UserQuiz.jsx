import React, { useEffect, useState } from "react";
import { supabase } from "../../supabase/supabaseClient";

import PreviewQuestions from "../../components/PreviewQuestions";
import { useParams } from "react-router-dom";

const UserQuiz = ({ elementoId }) => {
  const [quizInfo, setQuizInfo] = useState(null);
  const { tipo } = useParams();
  useEffect(() => {
    const fetchQuizInfo = async () => {
      try {
        // Aquí haces la consulta para obtener la información del quiz correspondiente al elementoId
        const { data, error } = await supabase
          .from("actividad_quiz")
          .select("*")
          .eq("elemento_id", elementoId)
          .single();

        if (error) {
          throw error;
        }

        setQuizInfo(data);
      } catch (error) {
        console.error("Error al obtener información del quiz:", error.message);
      }
    };

    fetchQuizInfo();
  }, [elementoId]);

  if (!quizInfo) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="flex flex-col gap-5">
      <h1>{quizInfo && quizInfo.titulo}</h1>
      <h2>{quizInfo && quizInfo.enunciado}</h2>
      <PreviewQuestions contentType={tipo}></PreviewQuestions>
    </div>
  );
};

export default UserQuiz;
