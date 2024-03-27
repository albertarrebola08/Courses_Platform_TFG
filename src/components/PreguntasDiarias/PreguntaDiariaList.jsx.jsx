import React, { useState, useEffect } from "react";
import { supabase } from "../../supabase/supabaseClient";
import { Button, Loader } from "pol-ui";
import { RiEditFill } from "react-icons/ri";
import PreguntaDiariaForm from "./PreguntaDiariaForm";

const PreguntaDiariaList = () => {
  const [preguntas, setPreguntas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPregunta, setSelectedPregunta] = useState(null);
  const [selectedPreguntaData, setSelectedPreguntaData] = useState(null); // Nuevo estado para almacenar la información de la pregunta seleccionada

  useEffect(() => {
    const fetchPreguntas = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("preguntas_diarias")
          .select("*");

        if (error) {
          throw new Error(error.message);
        }

        setPreguntas(data);
      } catch (error) {
        console.error("Error al obtener las preguntas diarias:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPreguntas();
  }, []);

  const handleEditPregunta = async (preguntaId) => {
    setSelectedPregunta(preguntaId);

    // Obtener la información de la pregunta seleccionada
    const pregunta = preguntas.find((pregunta) => pregunta.id === preguntaId);
    setSelectedPreguntaData(pregunta);
  };

  return (
    <div className="flex flex-col gap-3 pl-5">
      <div>{loading && <Loader />}</div>
      <ul className="flex flex-col gap-2">
        {preguntas.map((pregunta) => (
          <li
            key={pregunta.id}
            className="bg-primary-400 rounded-xl p-3 flex gap-2 items-center"
          >
            <div>
              <h4>{pregunta && pregunta.fecha_pregunta}</h4>
              <p>{pregunta && pregunta.desarrollo.pregunta[0].enunciado}</p>
            </div>
            <Button onClick={() => handleEditPregunta(pregunta.id)}>
              <RiEditFill />
            </Button>
          </li>
        ))}
      </ul>
      {selectedPregunta && (
        <PreguntaDiariaForm
          preguntaId={selectedPregunta}
          preguntaData={selectedPreguntaData} // Pasar la información de la pregunta seleccionada al formulario
          onClose={() => setSelectedPregunta(null)}
        />
      )}
      <Button className="bg-primary-900" onClick={() => setSelectedPregunta(0)}>
        Añadir Nueva Pregunta
      </Button>
    </div>
  );
};

export default PreguntaDiariaList;
