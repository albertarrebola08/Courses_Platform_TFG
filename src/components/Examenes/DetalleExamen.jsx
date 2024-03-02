import { Form, useParams } from "react-router-dom";
import { supabase } from "../../supabase/supabaseClient";
import { useState, useEffect } from "react";
import { Input, IconButton, Textarea } from "pol-ui";

import { RiPencilFill, RiCloseFill, RiCheckFill } from "react-icons/ri";
import ExamenForm from "./ExamenForm";

const DetalleExamen = () => {
  const { elementoId } = useParams();
  const [examenInfo, setExamenInfo] = useState("");
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEnun, setIsEditingEnun] = useState(false);

  useEffect(() => {
    const obtenerDetalleExamen = async (elementoId) => {
      try {
        const { data: examenData, error } = await supabase
          .from("examen")
          .select("*")
          .eq("elemento_id", parseInt(elementoId));

        if (error) {
          console.error(
            "Error al obtener el detalle del examen:",
            error.message
          );
        } else {
          console.log("Detalle examen: ", examenData);
          setExamenInfo(examenData);
        }
      } catch (error) {
        console.error("Error al obtener el detalle del examen:", error.message);
      }
    };

    obtenerDetalleExamen(elementoId);
  }, []);

  const handleTitleChange = async (e, elementoId) => {
    e.preventDefault();

    const titulo = e.target.titulo.value;

    try {
      const { data, error } = await supabase
        .from("examen")
        .update({ titulo: titulo })
        .eq("elemento_id", parseInt(elementoId))
        .select();

      if (error) {
        console.error("Error al actualizar en Supabase:", error);
      } else {
        console.log("Actualizado correctamente en Supabase:", data);
        const { data: infoElementos, error } = await supabase
          .from("elementos")
          .update({ titulo: titulo })
          .eq("id", parseInt(elementoId));

        if (error) {
          console.log("Error al cambiar el titulo de la tabla elemento", error);
        } else {
          console.log(
            "Tiítulo actualizado correctamente en la tabla elementos"
          );
        }
      }

      setExamenInfo([{ ...examenInfo[0], titulo: titulo }]);
      console.log("dv: ", examenInfo);
    } catch (error) {
      console.error("Error en la operación Supabase:", error);
    }
    console.log(titulo);
    setIsEditingName(false);
  };
  //gestiono enunciado - POSIBLE MODIFICACION A EDITOR DE TEXTO BUSCAR COMPONENTE O PREGUNTAR POL-UI
  const handleEnunciadoChange = async (e, elementoId) => {
    e.preventDefault();
    console.log(
      "descripcion/enunciado  examen!!!  : ",
      e.target.enunciado.value
    );
    const enunciado = e.target.enunciado.value;

    try {
      const { data, error } = await supabase
        .from("examen")
        .update({ enunciado: enunciado })
        .eq("elemento_id", parseInt(elementoId))
        .select();

      if (error) {
        console.error("Error al actualizar en Supabase:", error);
      } else {
        console.log("Actualizado correctamente en Supabase:", data);
      }

      setExamenInfo([{ ...examenInfo[0], enunciado: enunciado }]);
    } catch (error) {
      console.error("Error en la operación Supabase:", error);
    }
    setIsEditingEnun(false);
  };

  return (
    <div className="p-8 ">
      <div className="flex flex-col gap-3 ">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4">
            {!isEditingName ? (
              <span className="flex gap-2 items-center">
                <h1 className="text-lg">Títol:</h1>
                <p className="text-black text-lg font-light">
                  {examenInfo[0]?.titulo ?? "Carregant títol..."}
                </p>
                <RiPencilFill
                  onClick={() => setIsEditingName(true)}
                  className="text-primary-800"
                />
              </span>
            ) : (
              <form
                className="w-full"
                onSubmit={(e) => {
                  handleTitleChange(e, elementoId);
                }}
              >
                <div className="flex gap-3 items-center w-full">
                  <Input
                    name="titulo"
                    defaultValue={examenInfo[0].titulo}
                  ></Input>
                  <IconButton type="submit">
                    <RiCheckFill className="bg-primary" />
                  </IconButton>
                  <IconButton
                    onClick={() => setIsEditingName(false)}
                    color="error"
                  >
                    <RiCloseFill className="" />
                  </IconButton>
                </div>
              </form>
            )}
          </div>

          <div className="flex items-center justify-between gap-4">
            {!isEditingEnun ? (
              <span className="flex gap-2 items-center">
                <div>
                  <div className="flex gap-2 items-center">
                    <h1 className="text-lg">Enunciat general de l'examen:</h1>
                    <RiPencilFill
                      onClick={() => setIsEditingEnun(true)}
                      className="text-primary-800"
                    />
                  </div>

                  <p className="text-black text-lg font-light">
                    {examenInfo[0]?.enunciado ??
                      "Carregant enunciat de l'examen..."}
                  </p>
                </div>
              </span>
            ) : (
              <form
                className="w-full"
                onSubmit={(e) => {
                  handleEnunciadoChange(e, elementoId);
                }}
              >
                <div className="flex gap-3 items-center w-full">
                  <Textarea
                    rows="8"
                    innerClassName="resize"
                    defaultValue={examenInfo[0].enunciado}
                    name="enunciado"
                  ></Textarea>
                  <IconButton type="submit">
                    <RiCheckFill className="bg-primary" />
                  </IconButton>
                  <IconButton
                    onClick={() => setIsEditingEnun(false)}
                    color="error"
                  >
                    <RiCloseFill className="" />
                  </IconButton>
                </div>
              </form>
            )}
          </div>
          <div className="flex">
            <ExamenForm></ExamenForm>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalleExamen;
