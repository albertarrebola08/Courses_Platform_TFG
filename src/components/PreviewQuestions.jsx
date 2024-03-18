import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabase/supabaseClient";
import { Checkbox, Input } from "pol-ui";

const PreviewQuestions = ({ contentType }) => {
  const [content, setContent] = useState(null);
  const { elementoId } = useParams();

  useEffect(() => {
    // Llamar a la función para obtener el contenido al montar el componente
    handleFetchContent();
  }, []); // Ejecutar el efecto cada vez que cambie el contentType o elementoId

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
      }
    } catch (error) {
      console.error(`Error al obtener el ${contentType}:`, error.message);
    }
  };

  return (
    <div className="flex gap-8">
      <div className="flex flex-col">
        {content && (
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
