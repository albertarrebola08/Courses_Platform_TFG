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
  RiPencilFill,
  RiSave2Fill,
} from "react-icons/ri";
import { useParams } from "react-router-dom";
import ModalQuestionImg from "./ModalQuestionImg";

const ExamenForm = () => {
  const [examen, setExamen] = useState({
    preguntas: [],
  });
  const { elementoId } = useParams();
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

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
  }, []);

  //miro el select para saber tipo pregunta

  const handleDeleteQuestion = async (preguntaId) => {
    try {
      setLoading(true);
      await handleSubmit();
      // Obtener el examen de la base de datos
      const { data, error } = await supabase
        .from("examen")
        .select("*") // Seleccionar todas las columnas, incluyendo el desarrollo
        .eq("elemento_id", parseInt(elementoId))
        .single();

      if (error) {
        console.error("Error al obtener el examen:", error.message);
        return;
      }

      // Obtener el campo desarrollo del examen
      const desarrollo = data.desarrollo || { preguntas: [] };

      // Filtrar y reorganizar las preguntas
      const nuevasPreguntas = desarrollo.preguntas
        .filter((p) => p.id !== preguntaId)
        .map((p, index) => ({
          ...p,
          id: index + 1, // Reasignar el ID de la pregunta
        }));

      // Actualizar el examen en la base de datos
      const { data: updatedData, error: updateError } = await supabase
        .from("examen")
        .update({ desarrollo: { preguntas: nuevasPreguntas } })
        .eq("elemento_id", parseInt(elementoId))
        .single();

      if (updateError) {
        console.error("Error al actualizar el examen:", updateError.message);
        return;
      }

      console.log("Examen actualizado:", updatedData);

      // Volver a obtener los datos actualizados del examen desde la base de datos
      const { data: updatedExamenData, error: updatedExamenError } =
        await supabase
          .from("examen")
          .select("*")
          .eq("elemento_id", parseInt(elementoId))
          .single();

      if (updatedExamenError) {
        console.error(
          "Error al obtener los datos actualizados del examen:",
          updatedExamenError.message
        );
        return;
      }

      // Actualizar el estado local con los datos actualizados del examen
      setExamen(updatedExamenData?.desarrollo ?? { preguntas: [] });
    } catch (error) {
      console.error("Error al eliminar la pregunta:", error.message);
    } finally {
      setLoading(false); // Desactivar indicador de carga
    }
  };

  const handleSelectChange = (e) => {
    const selectedOption = e.target.value;
    // Hacer algo con el valor seleccionado, como actualizar el estado
    setSelectedOption(selectedOption);
  };

  //console.log("selected option: ", selectedOption);

  const handleAddQuestion = () => {
    let nuevasRespuestas = [];

    // Determinar el valor de esCorrecta según el tipo de pregunta
    const esCorrectaPorDefecto = selectedOption === "numeral" ? true : false;

    // Agregar una respuesta por defecto con id 0, texto vacío y esCorrecta determinada por el tipo de pregunta
    nuevasRespuestas.push({
      id: 0,
      texto: "",
      esCorrecta: esCorrectaPorDefecto,
    });

    const nuevaPregunta = {
      id: examen.preguntas.length + 1,
      enunciado: "",
      imagen: "",
      respuestas: nuevasRespuestas,
      tipo: selectedOption === "numeral" ? "numeral" : "test",
    };

    setExamen((prevState) => ({
      ...prevState,
      preguntas: [...prevState.preguntas, nuevaPregunta],
    }));
  };

  const handleModifyEnun = (preguntaId, enunciado) => {
    setExamen((prevState) => ({
      ...prevState,
      preguntas: prevState.preguntas.map((pregunta) =>
        pregunta.id === preguntaId
          ? { ...pregunta, enunciado: enunciado }
          : pregunta
      ),
    }));
  };

  const handleModifyQuestionType = (preguntaId, nuevoTipo) => {
    // Encuentra la pregunta en el estado del examen
    const preguntaIndex = examen.preguntas.findIndex(
      (pregunta) => pregunta.id === preguntaId
    );

    // Si no se encuentra la pregunta, no hagas nada
    if (preguntaIndex === -1) {
      return;
    }

    // Determinar el valor de esCorrecta según el nuevo tipo de pregunta
    const esCorrectaPorDefecto = nuevoTipo === "numeral" ? true : false;

    // Actualiza el tipo y el valor de esCorrecta de la pregunta en el estado del examen
    setExamen((prevState) => {
      const updatedPreguntas = [...prevState.preguntas];
      updatedPreguntas[preguntaIndex].tipo = nuevoTipo;
      updatedPreguntas[preguntaIndex].respuestas[0].esCorrecta =
        esCorrectaPorDefecto; // Actualizar esCorrecta
      return {
        ...prevState,
        preguntas: updatedPreguntas,
      };
    });
  };

  const handleAddAnswer = (preguntaId, esCorrecta) => {
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
  const handleModifyCorrect = (preguntaId, respuestaId) => {
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

  const handleModifyImage = (preguntaId, url) => {
    // Encuentra la pregunta en el estado del examen
    const preguntaIndex = examen.preguntas.findIndex(
      (pregunta) => pregunta.id === preguntaId
    );

    // Si no se encuentra la pregunta, no hagas nada
    if (preguntaIndex === -1) {
      return;
    }

    // Actualiza la imagen de la pregunta en el estado del examen
    setExamen((prevState) => {
      const updatedPreguntas = [...prevState.preguntas];
      updatedPreguntas[preguntaIndex].imagen = url;
      return {
        ...prevState,
        preguntas: updatedPreguntas,
      };
    });
  };

  const handleDeleteAnswer = (preguntaId, respuestaId) => {
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
      setExamen({ ...examen });
    } catch (error) {
      console.error(
        "Error al guardar el examen en la base de datos:",
        error.message
      );
    }
  };

  return (
    <div className="flex flex-col gap-3 pl-5">
      <div>{loading && <Loader />}</div>
      <Carousel
        options={{ startIndex: examen.preguntas.length }}
        className="max-w-[600px]"
      >
        <CarouselContent className="">
          {examen.preguntas.map((pregunta) => (
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

                <label htmlFor="tipo-pregunta">
                  Quin tipus de pregunta vols fer?
                </label>
                <Select
                  id="tipo-pregunta"
                  name="question-type"
                  value={pregunta.tipo}
                  onChange={(e) => {
                    handleModifyQuestionType(pregunta.id, e.target.value);
                    handleSelectChange(e);
                  }}
                  className="w-fit mb-5"
                  aria-label="Quin element vols afegir?"
                >
                  <option value="numeral">Numeral (resposta unica)</option>
                  <option value="test">Test (resposta múltiple)</option>
                </Select>
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
                <div className="">
                  {showModal && (
                    <ModalQuestionImg
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

                {pregunta.tipo === "test" ? (
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
                      <div
                        key={respuesta.id}
                        className="flex gap-2 items-center"
                      >
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
                ) : (
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
                )}
              </form>
            </CarouselItem>
          ))}
        </CarouselContent>

        {examen.preguntas.length > 0 && <CarouselPrevious />}
        {examen.preguntas.length > 0 && <CarouselNext />}
      </Carousel>
      <Button className="w-fit bg-primary-900" onClick={handleAddQuestion}>
        <RiAddFill></RiAddFill>
      </Button>
      <Button className=" bg-success-700 mb-6" onClick={handleSubmit}>
        Guardar Examen
      </Button>
    </div>
  );
};
export default ExamenForm;
