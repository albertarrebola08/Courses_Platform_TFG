import React, { useState } from "react";
import { IconButton, Checkbox, Input } from "pol-ui";
import { RiEyeFill, RiEyeCloseFill } from "react-icons/ri";
import { useParams } from "react-router-dom";
import { supabase } from "../supabase/supabaseClient";

const PreviewQuestions = ({ contentType }) => {
  const [content, setContent] = useState(null);
  const [previewVisible, setPreviewVisible] = useState(false);
  const { elementoId } = useParams();

  const handleTogglePreview = () => {
    setPreviewVisible((prevPreviewVisible) => !prevPreviewVisible);
  };

  const handleFetchContent = async () => {
    try {
      // Obtener el contenido de la base de datos según el tipo
      let table = "";
      let column = "";
      if (contentType === "examen") {
        table = "examen";
        column = "desarrollo";
      } else if (contentType === "quiz") {
        table = "actividad_quiz";
        column = "desarrollo";
      } else if (contentType === "numeral") {
        table = "actividad_numeral";
        column = "desarrollo";
      }

      const { data, error } = await supabase
        .from(table)
        .select(column)
        .eq("elemento_id", parseInt(elementoId))
        .single();

      if (error) {
        console.error(`Error al obtener el ${contentType}:`, error.message);
      } else {
        console.log(`${contentType} obtenido:`, data);
        setContent(data?.desarrollo ?? null);
        setPreviewVisible(true);
      }
    } catch (error) {
      console.error(`Error al obtener el ${contentType}:`, error.message);
    }
  };

  return (
    <div className="flex gap-8">
      <div className="flex flex-col">
        <h1>Vista previa del {contentType}</h1>
        <IconButton
          onClick={previewVisible ? handleTogglePreview : handleFetchContent}
        >
          {previewVisible ? <RiEyeCloseFill /> : <RiEyeFill />}
        </IconButton>
        {previewVisible && content && (
          <div className="rounded-xl flex flex-col gap-5">
            {content.preguntas.map((pregunta) => (
              <div key={pregunta.id} className="flex flex-col">
                <p>{`${pregunta.id}) ${pregunta.enunciado}`}</p>
                {pregunta.imagen && (
                  <img src={pregunta.imagen} className="max-w-[30%]" alt="" />
                )}
                {pregunta.tipo === "test" ? (
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
                ) : (
                  <Input
                    type="number"
                    placeholder="Indica un número"
                    className="w-fit mt-2"
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewQuestions;
