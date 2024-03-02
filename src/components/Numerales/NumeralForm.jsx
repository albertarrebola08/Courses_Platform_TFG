import React, { useState, useEffect } from "react";
import { supabase } from "../../supabase/supabaseClient";
import {
  Button,
  IconButton,
  Input,
  Checkbox,
  Loader,
  Select,
  Modal,
  useBoolean,
} from "pol-ui";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "pol-ui/lib/esm/components/Carousel/Carousel";

import {
  RiAddFill,
  RiCloseFill,
  RiDeleteBin3Fill,
  RiFileImageLine,
  RiFullscreenFill,
  RiPencilFill,
} from "react-icons/ri";
import { useParams } from "react-router-dom";
import ModalQuestionImg from "../ModalQuestionImg";

const NumeralForm = () => {
  const [numeral, setNumeral] = useState({
    preguntas: [],
  });
  const { elementoId } = useParams();
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [hovered, setHovered] = useState(false);

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  useEffect(() => {
    const fetchNumeral = async () => {
      try {
        // Obtener el numeral de la base de datos
        const { data, error } = await supabase
          .from("actividad_numeral")
          .select("desarrollo")
          .eq("elemento_id", parseInt(elementoId))
          .single();

        if (error) {
          console.error("Error al obtener el numeral:", error.message);
        } else {
          console.log("Numeral obtenido:", data);
          setNumeral(data?.desarrollo ?? { preguntas: [] });
        }
      } catch (error) {
        console.error("Error al obtener el numeral:", error.message);
      }
    };

    fetchNumeral();
  }, []);

  //miro el select para saber tipo pregunta

  const handleDeleteQuestion = async (preguntaId) => {
    try {
      setLoading(true);
      await handleSubmit();
      // Obtener el numeral de la base de datos
      const { data, error } = await supabase
        .from("actividad_numeral")
        .select("*") // Seleccionar todas las columnas, incluyendo el desarrollo
        .eq("elemento_id", parseInt(elementoId))
        .single();

      if (error) {
        console.error("Error al obtener el numeral:", error.message);
        return;
      }

      // Obtener el campo desarrollo del numeral
      const desarrollo = data.desarrollo || { preguntas: [] };

      // Filtrar y reorganizar las preguntas
      const nuevasPreguntas = desarrollo.preguntas
        .filter((p) => p.id !== preguntaId)
        .map((p, index) => ({
          ...p,
          id: index + 1, // Reasignar el ID de la pregunta
        }));

      // Actualizar el numeral en la base de datos
      const { data: updatedData, error: updateError } = await supabase
        .from("actividad_numeral")
        .update({ desarrollo: { preguntas: nuevasPreguntas } })
        .eq("elemento_id", parseInt(elementoId))
        .single();

      if (updateError) {
        console.error("Error al actualizar el numeral:", updateError.message);
        return;
      }

      console.log("Numeral actualizado:", updatedData);

      // Volver a obtener los datos actualizados del numeral desde la base de datos
      const { data: updatedNumeralData, error: updatedNumeralError } =
        await supabase
          .from("actividad_numeral")
          .select("*")
          .eq("elemento_id", parseInt(elementoId))
          .single();

      if (updatedNumeralError) {
        console.error(
          "Error al obtener los datos actualizados del numeral:",
          updatedNumeralError.message
        );
        return;
      }

      // Actualizar el estado local con los datos actualizados del numeral
      setNumeral(updatedNumeralData?.desarrollo ?? { preguntas: [] });
    } catch (error) {
      console.error("Error al eliminar la pregunta:", error.message);
    } finally {
      setLoading(false); // Desactivar indicador de carga
    }
  };

  //console.log("selected option: ", selectedOption);

  const handleAddQuestion = () => {
    let nuevasRespuestas = [];

    // Determinar el valor de esCorrecta según el tipo de pregunta

    // Agregar una respuesta por defecto con id 0, texto vacío y esCorrecta determinada por el tipo de pregunta
    nuevasRespuestas.push({
      id: 0,
      texto: "",
      esCorrecta: true,
    });

    const nuevaPregunta = {
      id: numeral.preguntas.length + 1,
      enunciado: "",
      imagen: "",
      respuestas: nuevasRespuestas,
      tipo:"numeral"
    };

    setNumeral((prevState) => ({
      ...prevState,
      preguntas: [...prevState.preguntas, nuevaPregunta],
    }));
  };

  const handleModifyEnun = (preguntaId, enunciado) => {
    setNumeral((prevState) => ({
      ...prevState,
      preguntas: prevState.preguntas.map((pregunta) =>
        pregunta.id === preguntaId
          ? { ...pregunta, enunciado: enunciado }
          : pregunta
      ),
    }));
  };

  const handleModifyAnswer = (preguntaId, respuestaId, texto) => {
    console.log(preguntaId, respuestaId, texto);

    setNumeral((prevState) => ({
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

  // Función para abrir el modal de una imagen específica
  const openImageModal = (preguntaId) => {
    setShowImageModal(preguntaId);
  };

  const handleModifyImage = (preguntaId, url) => {
    console.log("modalurl: ", url, "pregunta id: ", preguntaId);
    // Encuentra la pregunta en el estado del numeral
    const preguntaIndex = numeral.preguntas.findIndex(
      (pregunta) => pregunta.id === preguntaId
    );

    // Si no se encuentra la pregunta, no hagas nada
    if (preguntaIndex === -1) {
      return;
    }

    // Actualiza la imagen de la pregunta en el estado del numeral
    setNumeral((prevState) => {
      const updatedPreguntas = [...prevState.preguntas];
      updatedPreguntas[preguntaIndex].imagen = url;
      return {
        ...prevState,
        preguntas: updatedPreguntas,
      };
    });
    console.log("nuevo numeral con la img: ", numeral);
  };

  const handleSubmit = async () => {
    try {
      // Guardar el numeral en la base de datos
      await supabase
        .from("actividad_numeral")
        .update({ desarrollo: numeral })
        .eq("elemento_id", parseInt(elementoId));

      console.log("Numeral guardado en la base de datos");

      // Actualizar el estado del numeral con el numeral guardado
      setNumeral({ ...numeral });
    } catch (error) {
      console.error(
        "Error al guardar el numeral en la base de datos:",
        error.message
      );
    }
  };

  return (
    <div className="flex flex-col gap-3 pl-5">
      <div>{loading && <Loader />}</div>
      <Carousel
        options={{ startIndex: numeral.preguntas.length }}
        className="max-w-[600px]"
      >
        <CarouselContent className="">
          {numeral.preguntas.map((pregunta) => (
            <CarouselItem key={pregunta.id}>
              <form className="bg-primary-400 rounded-xl p-3 flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                  <h3 className="font-bold">Pregunta {pregunta.id}</h3>
                  <IconButton
                    color="error"
                    className="pb-1"
                    onClick={() => handleDeleteQuestion(pregunta.id)}
                  >
                    <RiDeleteBin3Fill />
                  </IconButton>
                </div>

                <h5>Enunciat</h5>
                <div className=" flex gap-1 items-center  ">
                  <RiFileImageLine />
                  <h6>Imatge (opcional)</h6>

                  <Button
                    onClick={toggleModal}
                    className="bg-primary-800 text-white w-[25px] h-[25px]"
                  >
                    {showModal ? <RiCloseFill /> : <RiPencilFill />}{" "}
                  </Button>
                </div>
                {pregunta.imagen && (
                  <div className="relative w-[100px]">
                    {pregunta.imagen && (
                      <div
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                        onClick={() => {
                          {
                            openImageModal(pregunta.id);
                          }
                          setHovered(false);
                        }}
                      >
                        <img
                          className={`w-full h-auto cursor-pointer transition-all duration-300 ${
                            hovered ? "opacity-50" : ""
                          }`}
                          src={pregunta.imagen}
                          alt={`imagen-pregunta-numeral-${pregunta.id}`}
                        />
                        {hovered && (
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <RiFullscreenFill size={24} />
                          </div>
                        )}
                      </div>
                    )}

                    <Modal
                      deleteButton
                      show={showImageModal === pregunta.id}
                      onClose={() => setShowImageModal(false)}
                    >
                      {pregunta.imagen && (
                        <div className="max-w-full max-h-full overflow-hidden">
                          <img
                            src={pregunta.imagen}
                            alt={`imagen-pregunta-quiz-${pregunta.id}`}
                            className="w-auto h-auto max-w-full max-h-full object-cover"
                          />
                        </div>
                      )}
                    </Modal>
                  </div>
                )}

                <div className="">
                  {showModal && (
                    <ModalQuestionImg
                      preguntaId={pregunta.id}
                      handleModifyImage={handleModifyImage}
                      setShowModal={setShowModal}
                    />
                  )}
                </div>

                <Input
                  type="text"
                  required
                  value={pregunta.enunciado}
                  onChange={(e) =>
                    handleModifyEnun(pregunta.id, e.target.value)
                  }
                  placeholder="Indica la pregunta aquí:"
                />

                <div className="">
                  {console.log(pregunta.respuestas)}
                  <h5>Resposta</h5>
                  <div className="flex gap-2 items-center">
                    <Input
                      type="number"
                      className="py-2"
                      value={pregunta.respuestas[0]?.texto}
                      onChange={(e) =>
                        handleModifyAnswer(
                          pregunta.id, //id de de la pregunta
                          0, //id de la respuesta
                          e.target.value //valor del input numerico
                        )
                      }
                      placeholder="Ingrese la respuesta"
                    />
                  </div>
                </div>
              </form>
            </CarouselItem>
          ))}
        </CarouselContent>

        {numeral.preguntas.length > 0 && <CarouselPrevious />}
        {numeral.preguntas.length > 0 && <CarouselNext />}
      </Carousel>
      <Button className="w-fit bg-primary-900" onClick={handleAddQuestion}>
        <RiAddFill></RiAddFill>
      </Button>
      <Button className=" bg-success-700 mb-6" onClick={handleSubmit}>
        Guardar Numeral
      </Button>
    </div>
  );
};
export default NumeralForm;
