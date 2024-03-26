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

const QuizForm = () => {
  const [quiz, setQuiz] = useState({
    preguntas: [],
  });
  const { elementoId } = useParams();
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);

  const [hovered, setHovered] = useState(false);

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  //obtengo el desarrollo del examen de bbdd fetch
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        // Obtener el quiz de la base de datos
        const { data, error } = await supabase
          .from("actividad_quiz")
          .select("desarrollo")
          .eq("elemento_id", parseInt(elementoId))
          .single();

        if (error) {
          console.error("Error al obtener el quiz:", error.message);
        } else {
          console.log("Quiz obtenido:", data);
          setQuiz(data?.desarrollo ?? { preguntas: [] });
        }
      } catch (error) {
        console.error("Error al obtener el quiz:", error.message);
      }
    };

    fetchQuiz();
  }, []);

  //miro el select para saber tipo pregunta

  const handleDeleteQuestion = async (preguntaId) => {
    try {
      setLoading(true);
      await handleSubmit();
      // Obtener el quiz de la base de datos
      const { data, error } = await supabase
        .from("actividad_quiz")
        .select("*") // Seleccionar todas las columnas, incluyendo el desarrollo
        .eq("elemento_id", parseInt(elementoId))
        .single();

      if (error) {
        console.error("Error al obtener el quiz:", error.message);
        return;
      }

      // Obtener el campo desarrollo del quiz
      const desarrollo = data.desarrollo || { preguntas: [] };

      // Filtrar y reorganizar las preguntas
      const nuevasPreguntas = desarrollo.preguntas
        .filter((p) => p.id !== preguntaId)
        .map((p, index) => ({
          ...p,
          id: index + 1,
        }));

      // Actualizar el quiz en la base de datos
      const { data: updatedData, error: updateError } = await supabase
        .from("actividad_quiz")
        .update({ desarrollo: { preguntas: nuevasPreguntas } })
        .eq("elemento_id", parseInt(elementoId))
        .single();

      if (updateError) {
        console.error("Error al actualizar el quiz:", updateError.message);
        return;
      }

      console.log("Quiz actualizado:", updatedData);

      // Volver a obtener los datos actualizados del quiz desde la base de datos
      const { data: updatedQuizData, error: updatedQuizError } = await supabase
        .from("actividad_quiz")
        .select("*")
        .eq("elemento_id", parseInt(elementoId))
        .single();

      if (updatedQuizError) {
        console.error(
          "Error al obtener los datos actualizados del quiz:",
          updatedQuizError.message
        );
        return;
      }

      // Actualizar el estado local con los datos actualizados del quiz
      setQuiz(updatedQuizData?.desarrollo ?? { preguntas: [] });
    } catch (error) {
      console.error("Error al eliminar la pregunta:", error.message);
    } finally {
      setLoading(false); // Desactivar indicador de carga
    }
  };

  const handleAddQuestion = () => {
    let nuevasRespuestas = [];

    // Agregar una respuesta por defecto con id 0, texto vacío y esCorrecta determinada por el tipo de pregunta
    nuevasRespuestas.push({
      id: 0,
      texto: "",
      esCorrecta: false,
    });

    const nuevaPregunta = {
      id: quiz.preguntas.length + 1,
      enunciado: "",
      imagen: "",
      respuestas: nuevasRespuestas,
      tipo: "test",
    };

    setQuiz((prevState) => ({
      ...prevState,
      preguntas: [...prevState.preguntas, nuevaPregunta],
    }));
  };

  const handleModifyEnun = (preguntaId, enunciado) => {
    setQuiz((prevState) => ({
      ...prevState,
      preguntas: prevState.preguntas.map((pregunta) =>
        pregunta.id === preguntaId
          ? { ...pregunta, enunciado: enunciado }
          : pregunta
      ),
    }));
  };

  const handleAddAnswer = (preguntaId, esCorrecta) => {
    setQuiz((prevState) => ({
      ...prevState,
      preguntas: prevState.preguntas.map((pregunta) =>
        pregunta.id === preguntaId
          ? {
              ...pregunta,
              respuestas: [
                ...pregunta.respuestas,
                {
                  id: pregunta.respuestas.length,
                  texto: "",
                  esCorrecta: esCorrecta,
                },
              ],
            }
          : pregunta
      ),
    }));
  };

  const handleModifyAnswer = (preguntaId, respuestaId, texto) => {
    console.log(preguntaId, respuestaId, texto);

    setQuiz((prevState) => ({
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
  const handleModifyCorrect = (preguntaId, respuestaId) => {
    setQuiz((prevState) => ({
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

  const handleModifyImage = (preguntaId, url) => {
    console.log("modalurl: ", url, "pregunta id: ", preguntaId);
    // Encuentra la pregunta en el estado del quiz
    const preguntaIndex = quiz.preguntas.findIndex(
      (pregunta) => pregunta.id === preguntaId
    );

    // Si no se encuentra la pregunta, no hagas nada
    if (preguntaIndex === -1) {
      return;
    }

    // Actualiza la imagen de la pregunta en el estado del quiz
    setQuiz((prevState) => {
      const updatedPreguntas = [...prevState.preguntas];
      updatedPreguntas[preguntaIndex].imagen = url;
      return {
        ...prevState,
        preguntas: updatedPreguntas,
      };
    });
    console.log("nuevo quiz con la img: ", quiz);
  };

  const handleDeleteAnswer = (preguntaId, respuestaId) => {
    setQuiz((prevState) => ({
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

  // Función para abrir el modal de una imagen específica
  const openImageModal = (preguntaId) => {
    setShowImageModal(preguntaId);
  };

  const handleSubmit = async () => {
    try {
      // Guardar el quiz en la base de datos
      await supabase
        .from("actividad_quiz")
        .update({ desarrollo: quiz })
        .eq("elemento_id", parseInt(elementoId));

      console.log("Quiz guardado en la base de datos");

      // Actualizar el estado del quiz con el quiz guardado
      setQuiz({ ...quiz });
    } catch (error) {
      console.error(
        "Error al guardar el quiz en la base de datos:",
        error.message
      );
    }
  };

  return (
    <div className="flex flex-col gap-3 pl-5">
      <div>{loading && <Loader />}</div>
      <Carousel
        options={{ startIndex: quiz.preguntas.length }}
        className="max-w-[600px]"
      >
        <CarouselContent className="">
          {quiz.preguntas.map((pregunta) => (
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
                          alt={`imagen-pregunta-quiz-${pregunta.id}`}
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
                  <h5>Respostes</h5>
                  <IconButton
                    color="dark"
                    className="bg-white"
                    onClick={() => handleAddAnswer(pregunta.id)}
                  >
                    <RiAddFill></RiAddFill>
                  </IconButton>
                  {pregunta.respuestas.map((respuesta) => (
                    <div key={respuesta.id} className="flex gap-2 items-center">
                      <Input
                        required
                        type="text"
                        className="py-2"
                        value={respuesta.texto}
                        onChange={(e) =>
                          handleModifyAnswer(
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
                          handleModifyCorrect(pregunta.id, respuesta.id)
                        }
                      />
                      <IconButton
                        color="error"
                        onClick={() =>
                          handleDeleteAnswer(pregunta.id, respuesta.id)
                        }
                      >
                        <RiDeleteBin3Fill />
                      </IconButton>
                    </div>
                  ))}
                </div>
              </form>
            </CarouselItem>
          ))}
        </CarouselContent>

        {quiz.preguntas.length > 0 && <CarouselPrevious />}
        {quiz.preguntas.length > 0 && <CarouselNext />}
      </Carousel>
      <Button className="w-fit bg-primary-900" onClick={handleAddQuestion}>
        <RiAddFill></RiAddFill>
      </Button>
      <Button className=" bg-success-700 mb-6" onClick={handleSubmit}>
        Guardar Quiz
      </Button>
    </div>
  );
};
export default QuizForm;
