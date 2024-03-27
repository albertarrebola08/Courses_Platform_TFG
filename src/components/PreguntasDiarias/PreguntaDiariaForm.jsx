import React, { useState, useEffect } from "react";
import { supabase } from "../../supabase/supabaseClient";
import { Button, Input, Loader } from "pol-ui";
import { RiAddFill, RiDeleteBin3Fill } from "react-icons/ri";

const PreguntaDiariaForm = ({ preguntaId, onClose, preguntaData }) => {
  const [preguntaDiaria, setPreguntaDiaria] = useState({
    pregunta: {
      tipo: "numeral",
      enunciado: "",
      respuestas: [{ id: 0, texto: "", esCorrecta: true }],
    },
    fecha: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (preguntaData) {
      // Si hay información de pregunta, establecerla en el estado
      setPreguntaDiaria(preguntaData);
    }
  }, [preguntaData]);

  const handleAddPreguntaDiaria = async () => {
    try {
      setLoading(true);
      if (preguntaId) {
        // Si hay un ID de pregunta, actualizar la pregunta existente
        await supabase
          .from("preguntas_diarias")
          .update({
            fecha_pregunta: preguntaDiaria.fecha,
            desarrollo: preguntaDiaria.pregunta,
          })
          .eq("id", preguntaId);
      } else {
        // Si no hay un ID de pregunta, insertar una nueva pregunta
        await supabase.from("preguntas_diarias").insert([
          {
            fecha_pregunta: preguntaDiaria.fecha,
            desarrollo: preguntaDiaria.pregunta,
          },
        ]);
      }

      // Limpiar el estado después de la inserción/actualización exitosa
      setPreguntaDiaria({
        pregunta: {
          tipo: "numeral",
          enunciado: "",
          respuestas: [{ id: 0, texto: "", esCorrecta: true }],
        },
        fecha: "",
      });
    } catch (error) {
      console.error("Error al guardar la pregunta diaria:", error.message);
    } finally {
      setLoading(false);
      onClose(); // Cerrar el formulario después de guardar
    }
  };

  const handleDeleteAnswer = (respuestaId) => {
    setPreguntaDiaria((prevState) => ({
      ...prevState,
      pregunta: {
        ...prevState.pregunta,
        respuestas: prevState.pregunta.respuestas.filter(
          (respuesta) => respuesta.id !== respuestaId
        ),
      },
    }));
  };

  const handleModifyAnswer = (respuestaId, texto) => {
    setPreguntaDiaria((prevState) => ({
      ...prevState,
      pregunta: {
        ...prevState.pregunta,
        respuestas: prevState.pregunta.respuestas.map((respuesta) =>
          respuesta.id === respuestaId
            ? { ...respuesta, texto: texto }
            : respuesta
        ),
      },
    }));
  };

  const handleAddAnswer = () => {
    setPreguntaDiaria((prevState) => ({
      ...prevState,
      pregunta: {
        ...prevState.pregunta,
        respuestas: [
          ...prevState.pregunta.respuestas,
          {
            id: prevState.pregunta.respuestas.length,
            texto: "",
            esCorrecta: false,
          },
        ],
      },
    }));
  };

  return (
    <div className="flex flex-col gap-3 pl-5">
      <div>{loading && <Loader />}</div>
      <form className="bg-primary-400 rounded-xl p-3 flex flex-col gap-2">
        <h3 className="font-bold">
          {preguntaId ? "Editar Pregunta Diaria" : "Nueva Pregunta Diaria"}
        </h3>

        <h5>Fecha</h5>
        <Input
          type="date"
          required
          value={preguntaDiaria.fecha}
          onChange={(e) =>
            setPreguntaDiaria({ ...preguntaDiaria, fecha: e.target.value })
          }
        />
        {preguntaDiaria &&
          preguntaDiaria.desarrollo &&
          console.log(
            "laaaaaaaaaaaaaaaaaaaa",
            preguntaDiaria.desarrollo.pregunta[0].enunciado
          )}
        <h5>Enunciado</h5>
        <Input
          type="text"
          required
          value={
            preguntaDiaria &&
            preguntaDiaria.desarrollo &&
            preguntaDiaria.desarrollo.pregunta &&
            preguntaDiaria.desarrollo.pregunta[0] &&
            preguntaDiaria.desarrollo.pregunta[0].enunciado
              ? preguntaDiaria.desarrollo.pregunta[0].enunciado
              : "" // Valor predeterminado si alguna propiedad no está definida
          }
          onChange={(e) =>
            setPreguntaDiaria((prevState) => ({
              ...prevState,
              desarrollo: {
                ...prevState.desarrollo,
                pregunta: [
                  {
                    ...prevState.desarrollo.pregunta[0],
                    enunciado: e.target.value,
                  },
                ],
              },
            }))
          }
          placeholder="Indica la pregunta aquí:"
        />

        <h5>Respuesta</h5>
        {preguntaDiaria &&
          preguntaDiaria.desarrollo &&
          preguntaDiaria.desarrollo.pregunta[0] && // Verifica si pregunta[0] está definido
          preguntaDiaria.desarrollo.pregunta[0].respuestas && // Verifica si respuestas está definido
          preguntaDiaria.desarrollo.pregunta[0].respuestas.map((respuesta) => (
            <div key={respuesta.id} className="flex gap-2 items-center">
              <Input
                type="text"
                className="py-2"
                value={
                  respuesta.texto // Verifica si texto está definido
                    ? respuesta.texto
                    : "" // Valor predeterminado si texto no está definido
                }
                onChange={(e) =>
                  handleModifyAnswer(respuesta.id, e.target.value)
                }
                placeholder="Ingrese la respuesta"
              />
              <Button
                color="error"
                onClick={() => handleDeleteAnswer(respuesta.id)}
              >
                <RiDeleteBin3Fill />
              </Button>
            </div>
          ))}

        <Button className="w-fit bg-primary-900" onClick={handleAddAnswer}>
          <RiAddFill />
        </Button>

        <Button
          className=" bg-success-700 mb-6"
          onClick={handleAddPreguntaDiaria}
        >
          {preguntaId ? "Guardar Cambios" : "Guardar Pregunta Diaria"}
        </Button>
      </form>
    </div>
  );
};

export default PreguntaDiariaForm;
