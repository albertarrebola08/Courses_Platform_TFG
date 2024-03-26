import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabase/supabaseClient";
import { Alert, Banner, Button, Checkbox, Input, Toaster, toast } from "pol-ui";

import { UserContext } from "../UserContext";
import { MdLock } from "react-icons/md";
import { AiFillAlert } from "react-icons/ai";

const PreviewQuestions = ({ contentType }) => {
  const [content, setContent] = useState(null);
  const [intentos, setIntentos] = useState(null);
  const [respuestasUsuario, setRespuestasUsuario] = useState({});
  const { elementoId } = useParams();
  const { user } = useContext(UserContext);
  const [showBanner, setShowBanner] = useState(false);
  const [nota, setNota] = useState(null); // Estado para almacenar la nota

  useEffect(() => {
    handleFetchContent();
    fetchIntentos(); // Llamar a la función para obtener el número de intentos al cargar el componente
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

  const fetchIntentos = async () => {
    try {
      const { data, error } = await supabase
        .from("examen_usuario")
        .select("intento")
        .eq("examen_id", Number(elementoId))
        .eq("usuario_id", user.id);

      if (error) {
        console.error("Error al obtener el número de intentos:", error.message);
      } else {
        if (data && data.length > 0) {
          setIntentos(data[0].intento);
        }
      }
    } catch (error) {
      console.error("Error al obtener el número de intentos:", error.message);
    }
  };

  const handleChangeRespuesta = (preguntaId, respuestaId) => {
    setRespuestasUsuario((prevRespuestas) => ({
      ...prevRespuestas,
      [preguntaId]: respuestaId,
    }));
  };

  const calcularNota = () => {
    let puntaje = 0;
    let totalPreguntas = 0;

    if (!content) return 0;

    content.preguntas.forEach((pregunta) => {
      const respuestaUsuario = respuestasUsuario[pregunta.id];
      console.log("Respuesta del usuario:", respuestaUsuario);

      if (pregunta.tipo === "test") {
        // Para preguntas de opción múltiple
        const respuestaCorrectaIndex = pregunta.respuestas.findIndex(
          (respuesta) => respuesta.esCorrecta
        );

        if (respuestaCorrectaIndex !== -1) {
          totalPreguntas++;
          if (
            respuestaUsuario !== undefined &&
            respuestaCorrectaIndex === parseInt(respuestaUsuario)
          ) {
            puntaje++; // Incrementar el puntaje si la respuesta del usuario es correcta
          }
        }
      } else if (pregunta.tipo === "numeral") {
        // Para preguntas numéricas
        const respuestaCorrecta = pregunta.respuestas.find(
          (respuesta) => respuesta.esCorrecta
        );

        if (respuestaCorrecta) {
          totalPreguntas++;
          if (
            respuestaUsuario !== undefined &&
            respuestaCorrecta.texto === respuestaUsuario
          ) {
            puntaje++; // Incrementar el puntaje si la respuesta del usuario es correcta
          }
        }
      }
    });

    // Calcular la nota en base al puntaje y la cantidad total de preguntas
    const nota = (puntaje / totalPreguntas) * 10;
    return nota.toFixed(2);
  };
  const actualizarNotaEnBaseDeDatos = async (nota) => {
    try {
      const { data: existingData, error: existingError } = await supabase
        .from("examen_usuario")
        .select("*")
        .eq("examen_id", Number(elementoId))
        .eq("usuario_id", user.id);

      if (existingError) {
        console.error(
          "Error al consultar el registro existente en examen_usuario:",
          existingError.message
        );
      } else {
        if (existingData && Object.keys(existingData).length > 0) {
          // Si ya existe un registro
          const intento = existingData[0].intento;
          if (intento >= 2) {
            toast({
              title: "Has superat el màxim d'intents... ",
              type: "error",
            });
            return;
          } else {
            // Actualizar el intento
            await supabase
              .from("examen_usuario")
              .update({
                nota: nota,
                intento: intento + 1,
              })
              .eq("id", existingData[0].id);
          }
        } else {
          // Si no existe un registro, insertar uno nuevo
          await supabase.from("examen_usuario").insert([
            {
              examen_id: Number(elementoId),
              usuario_id: user.id,
              nota: nota,
              intento: 1,
            },
          ]);
        }
      }
    } catch (error) {
      console.error(
        "Error al consultar o actualizar el registro en examen_usuario:",
        error.message
      );
    }
  };

  const handleFinalizarExamen = async () => {
    try {
      let notaCalculada;
      if (contentType === "examen") {
        // Si es un examen, realizar la lógica para calcular la nota y actualizar en la base de datos
        notaCalculada = calcularNota();
        await actualizarNotaEnBaseDeDatos(notaCalculada);
      } else {
        // Si no es un examen, simplemente calcular la nota
        notaCalculada = calcularNota();
      }
      console.log("Nota calculada:", notaCalculada); // Agregar este console.log para depurar
      console.log("Respuesta del usuario:", respuestasUsuario); // Agregar este console.log para depurar
      setNota(notaCalculada); // Actualizar el estado de la nota
      setShowBanner(true); // Mostrar el banner
    } catch (error) {
      console.error("Error al finalizar el examen:", error.message);
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
                        <Checkbox
                          onChange={() =>
                            handleChangeRespuesta(pregunta.id, respuesta.id)
                          }
                          checked={
                            respuestasUsuario[pregunta.id] === respuesta.id
                          }
                        />
                        {respuesta.texto}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <Input
                    type="number"
                    placeholder="Indica un número"
                    className="w-fit mt-2"
                    onChange={(e) =>
                      handleChangeRespuesta(
                        pregunta.id,
                        e.target.value.toString()
                      )
                    }
                    value={respuestasUsuario[pregunta.id] || ""}
                  />
                )}
              </div>
            ))}
            <Button onClick={handleFinalizarExamen}>
              Enviar prova
              {intentos === 2 && <MdLock />}
            </Button>
            <Alert className="text-[14px]" bordered="true" color="info">
              <div className="flex gap-2 items-center p-2 bg-info-300 rounded-md mt-3">
                <AiFillAlert />
                <div className="">
                  Aquesta es una prova NO avaluable per practicar per l'examen.
                  Pots fer-la tants cops com vulguis
                </div>
              </div>
            </Alert>
          </div>
        )}
        {showBanner && nota !== null && nota !== undefined && (
          <Banner className="bg-green-200 mt-8">
            <span>Nota: {nota} </span>
          </Banner>
        )}
      </div>
      <Toaster />
    </div>
  );
};

export default PreviewQuestions;
