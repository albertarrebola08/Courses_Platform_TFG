import React, { useState } from "react";
import { IconButton, Checkbox } from "pol-ui";
import { RiEyeFill, RiEyeCloseFill } from "react-icons/ri";
import { useParams } from "react-router-dom";
import { supabase } from "../../supabase/supabaseClient";

const PreviewExam = () => {
  const [examen, setExamen] = useState(null);
  const [previewVisible, setPreviewVisible] = useState(false);
  const { elementoId } = useParams();

  const handleTogglePreview = () => {
    setPreviewVisible((prevPreviewVisible) => !prevPreviewVisible);
  };

  const handleFetchExamen = async () => {
    try {
      // Obtener el examen de la base de datos
      const { data, error } = await supabase
        .from("examen")
        .select("desarrollo")
        .eq("elemento_id", parseInt(elementoId))
        .single();

      if (error) {
        console.error("Error al obtener el examen:", error.message);
      } else {
        console.log("Examen obtenido:", data);
        setExamen(data?.desarrollo ?? null);
        setPreviewVisible(true);
      }
    } catch (error) {
      console.error("Error al obtener el examen:", error.message);
    }
  };

  return (
    <div className="flex gap-8">
      <div className="flex flex-col">
        <h1>Vista previa del examen</h1>
        <IconButton
          onClick={previewVisible ? handleTogglePreview : handleFetchExamen}
        >
          {previewVisible ? <RiEyeCloseFill /> : <RiEyeFill />}
        </IconButton>
        {previewVisible && examen && (
          <div className="rounded-xl flex flex-col gap-2">
            {examen.preguntas.map((pregunta) => (
              <div key={pregunta.id}>
                <p>{`${pregunta.id}) ${pregunta.enunciado}`}</p>
                <ul className="flex flex-col gap-2 mt-2">
                  {pregunta.respuestas.map((respuesta) => (
                    <li
                      key={respuesta.id}
                      className="flex items-center gap-2 text-gray-400"
                    >
                      <Checkbox />
                      {respuesta.texto}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewExam;
