import React, { useState, useEffect } from "react";
import { supabase } from "../../supabase/supabaseClient";
import { Button, IconButton, Input, Checkbox } from "pol-ui";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "pol-ui/lib/esm/components/Carousel/Carousel";

import { RiAddFill, RiDeleteBin3Fill } from "react-icons/ri";
import { useParams } from "react-router-dom";

const ExamenForm = () => {
  const [examen, setExamen] = useState({
    preguntas: [],
  });
  const { elementoId } = useParams();

  useEffect(() => {
    const fetchExamen = async () => {
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
          setExamen(data?.desarrollo ?? { preguntas: [] });
        }
      } catch (error) {
        console.error("Error al obtener el examen:", error.message);
      }
    };

    fetchExamen();
  }, [elementoId]);

  const handleAgregarPregunta = () => {
    const nuevaPregunta = {
      id: examen.preguntas.length + 1,
      enunciado: "",
      respuestas: [],
    };
    setExamen((prevState) => ({
      ...prevState,
      preguntas: [...prevState.preguntas, nuevaPregunta],
    }));
  };

  const handleModificarEnunciado = (preguntaId, enunciado) => {
    setExamen((prevState) => ({
      ...prevState,
      preguntas: prevState.preguntas.map((pregunta) =>
        pregunta.id === preguntaId
          ? { ...pregunta, enunciado: enunciado }
          : pregunta
      ),
    }));
  };

  const handleAgregarRespuesta = (preguntaId) => {
    setExamen((prevState) => ({
      ...prevState,
      preguntas: prevState.preguntas.map((pregunta) =>
        pregunta.id === preguntaId
          ? {
              ...pregunta,
              respuestas: [
                ...pregunta.respuestas,
                {
                  id: pregunta.respuestas.length + 1,
                  texto: "",
                  esCorrecta: false,
                },
              ],
            }
          : pregunta
      ),
    }));
  };

  const handleModificarRespuesta = (preguntaId, respuestaId, texto) => {
    setExamen((prevState) => ({
      ...prevState,
      preguntas: prevState.preguntas.map((pregunta) =>
        pregunta.id === preguntaId
          ? {
              ...pregunta,
              respuestas: pregunta.respuestas.map((respuesta) =>
                respuesta.id === respuestaId
                  ? { ...respuesta, texto: texto }
                  : respuesta
              ),
            }
          : pregunta
      ),
    }));
  };

  const handleModificarCorrecta = (preguntaId, respuestaId) => {
    setExamen((prevState) => ({
      ...prevState,
      preguntas: prevState.preguntas.map((pregunta) =>
        pregunta.id === preguntaId
          ? {
              ...pregunta,
              respuestas: pregunta.respuestas.map(
                (respuesta) =>
                  respuesta.id === respuestaId
                    ? { ...respuesta, esCorrecta: !respuesta.esCorrecta }
                    : { ...respuesta, esCorrecta: false } // Desmarca las otras respuestas como correctas
              ),
            }
          : pregunta
      ),
    }));
  };
  const handleModificarNumeric = (preguntaId, respuestaId) => {
    setExamen((prevState) => ({
      ...prevState,
      preguntas: prevState.preguntas.map((pregunta) =>
        pregunta.id === preguntaId
          ? {
              ...pregunta,
              respuestas: pregunta.respuestas.map((respuesta) =>
                respuesta.id === respuestaId
                  ? { ...respuesta, esNumeral: !respuesta.esNumeral }
                  : respuesta
              ),
            }
          : pregunta
      ),
    }));
  };

  const handleEliminarRespuesta = (preguntaId, respuestaId) => {
    setExamen((prevState) => ({
      ...prevState,
      preguntas: prevState.preguntas.map((pregunta) =>
        pregunta.id === preguntaId
          ? {
              ...pregunta,
              respuestas: pregunta.respuestas.filter(
                (respuesta) => respuesta.id !== respuestaId
              ),
            }
          : pregunta
      ),
    }));
  };

  const handleSubmit = async () => {
    try {
      // Guardar el examen en la base de datos
      await supabase
        .from("examen")
        .update({ desarrollo: examen })
        .eq("elemento_id", parseInt(elementoId));

      console.log("Examen guardado en la base de datos");

      // Actualizar el estado del examen con el examen guardado
      setExamen((prevState) => ({ ...prevState, preguntas: [] }));
    } catch (error) {
      console.error(
        "Error al guardar el examen en la base de datos:",
        error.message
      );
    }
  };

  return (
    <div className="flex flex-col gap-3 pl-5">
      <Carousel
        options={{ startIndex: examen.preguntas.length }}
        className="max-w-[600px]"
      >
        <CarouselContent className="">
          {examen.preguntas.map((pregunta) => (
            <CarouselItem key={pregunta.id}>
              <div className="bg-primary-400 rounded-xl p-3 flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                  <h3 className="font-bold">Pregunta {pregunta.id}</h3>
                  <IconButton color="error" className="pb-1">
                    <RiDeleteBin3Fill />
                  </IconButton>
                </div>

                <Input
                  type="text"
                  value={pregunta.enunciado}
                  onChange={(e) =>
                    handleModificarEnunciado(pregunta.id, e.target.value)
                  }
                  placeholder="Ingrese el enunciado"
                />
                <h4>Respuestas</h4>
                <IconButton
                  color="warning"
                  onClick={() => handleAgregarRespuesta(pregunta.id)}
                >
                  <RiAddFill></RiAddFill>
                </IconButton>
                {pregunta.respuestas.map((respuesta) => (
                  <div key={respuesta.id} className="flex gap-2 items-center">
                    <Input
                      type="text"
                      className="py-2"
                      value={respuesta.texto}
                      onChange={(e) =>
                        handleModificarRespuesta(
                          pregunta.id,
                          respuesta.id,
                          e.target.value
                        )
                      }
                      placeholder="Ingrese la respuesta"
                    />
                    <Checkbox
                      label="Correcta? "
                      checked={respuesta.esCorrecta}
                      onChange={() =>
                        handleModificarCorrecta(pregunta.id, respuesta.id)
                      }
                    />
                    <Checkbox
                      label="Numeral? "
                      checked={respuesta.esNumeral}
                      onChange={() =>
                        handleModificarNumeric(pregunta.id, respuesta.id)
                      }
                    />
                    <IconButton
                      color="error"
                      onClick={() =>
                        handleEliminarRespuesta(pregunta.id, respuesta.id)
                      }
                    >
                      <RiDeleteBin3Fill />
                    </IconButton>
                  </div>
                ))}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <Button className="w-fit bg-primary-900" onClick={handleAgregarPregunta}>
        <RiAddFill></RiAddFill>
      </Button>
      <Button className=" bg-success-700 mb-6" onClick={handleSubmit}>
        Guardar Examen
      </Button>
    </div>
  );
};
export default ExamenForm;
