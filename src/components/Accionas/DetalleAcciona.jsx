import { useParams } from "react-router-dom";
import { supabase } from "../../supabase/supabaseClient";
import { useState, useEffect } from "react";
import { Input, FileInput, Button, IconButton, Textarea } from "pol-ui";
import {
  RiArrowDownSLine,
  RiPencilFill,
  RiCheckLine,
  RiCloseFill,
  RiCheckFill,
} from "react-icons/ri";

const DetalleAcciona = () => {
  const { elementoId } = useParams();

  const [accionaInfo, setAccionaInfo] = useState("");
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEnun, setIsEditingEnun] = useState(false);
  const [isEditingAcciona, setIsEditingAcciona] = useState(false);

  useEffect(() => {
    const obtenerDetalleAcciona = async (elementoId) => {
      try {
        const { data: accionaData, error } = await supabase
          .from("acciona")
          .select("*")
          .eq("elemento_id", parseInt(elementoId));

        if (error) {
          console.error(
            "Error al obtener el detalle del acciona:",
            error.message
          );
        } else {
          console.log("Detalle acciona: ", accionaData);
          setAccionaInfo(accionaData);
        }
      } catch (error) {
        console.error(
          "Error al obtener el detalle del acciona:",
          error.message
        );
      }
    };

    obtenerDetalleAcciona(elementoId);
  }, []);

  const handleTitleChange = async (e, elementoId) => {
    e.preventDefault();

    const titulo = e.target.titulo.value;

    try {
      const { data, error } = await supabase
        .from("acciona")
        .update({ titulo: titulo })
        .eq("elemento_id", parseInt(elementoId))
        .select();

      if (error) {
        console.error("Error al actualizar en Supabase:", error);
      } else {
        console.log("Actualizado correctamente en Supabase:", data);
      }

      setAccionaInfo([{ ...accionaInfo[0], titulo: titulo }]);
      console.log("dv: ", accionaInfo);
    } catch (error) {
      console.error("Error en la operación Supabase:", error);
    }
    console.log(titulo);
    setIsEditingName(false);
  };
  //gestiono description
  const handleEnunciadoChange = async (e, elementoId) => {
    e.preventDefault();
    console.log("desc!!!  : ", e.target.enunciado.value);
    const enunciado = e.target.enunciado.value;

    try {
      const { data, error } = await supabase
        .from("acciona")
        .update({ enunciado: enunciado })
        .eq("elemento_id", parseInt(elementoId))
        .select();

      if (error) {
        console.error("Error al actualizar en Supabase:", error);
      } else {
        console.log("Actualizado correctamente en Supabase:", data);
      }

      setAccionaInfo([{ ...accionaInfo[0], enunciado: enunciado }]);
    } catch (error) {
      console.error("Error en la operación Supabase:", error);
    }
    setIsEditingEnun(false);
  };
  //gestiono el acciona por url
  const handleVideoEnunChange = async (e, elementoId) => {
    e.preventDefault();
    console.log("la url!!!!: ", e.target.url.value);
    const url = e.target.url.value;

    try {
      const { data, error } = await supabase
        .from("acciona")
        .update({ video_enunciado: url })
        .eq("elemento_id", parseInt(elementoId))
        .select();

      if (error) {
        console.error("Error al actualizar en Supabase:", error);
      } else {
        console.log("Actualizado correctamente en Supabase:", data);
      }

      setAccionaInfo([{ ...accionaInfo[0], video_enunciado: url }]);
    } catch (error) {
      console.error("Error en la operación Supabase:", error);
    }
    setIsEditingAcciona(false);
  };

  return (
    <div className="p-8">
      <div className="flex flex-col gap-3 w-[50%] ">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4">
            {!isEditingName ? (
              <span className="flex gap-2 items-center">
                <h1 className="text-lg">Títol:</h1>
                <p className="text-black text-lg font-light">
                  {accionaInfo[0]?.titulo ?? "Carregant títol..."}
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
                    defaultValue={accionaInfo[0].titulo}
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
                    <h1 className="text-lg">Enunciat:</h1>
                    <RiPencilFill
                      onClick={() => setIsEditingEnun(true)}
                      className="text-primary-800"
                    />
                  </div>

                  <p className="text-black text-lg font-light">
                    {accionaInfo[0]?.enunciado ?? "Carregant enunciat..."}
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
                    defaultValue={accionaInfo[0].enunciado}
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

          {!isEditingAcciona ? (
            <span className="flex gap-2 items-center">
              <h1 className="text-lg">Video enunciat (opcional):</h1>

              <RiPencilFill
                onClick={() => setIsEditingAcciona(true)}
                className="text-primary-800"
              />
            </span>
          ) : (
            <form
              className="w-full"
              onSubmit={(e) => {
                handleVideoEnunChange(e, elementoId);
              }}
            >
              <div className="flex gap-3 items-center w-full">
                <div
                  className={`border border-md border-gray-800  p-8 rounded-lg ${
                    isEditingAcciona ? "block" : "hidden"
                  } `}
                >
                  <FileInput color="secondary"></FileInput>
                  <div className="flex items-center justify-around px-16 gap-4">
                    <div className=" my-6 bg-gray-800 border-md h-[1px] w-[50%] mx-auto"></div>
                    <div className="pb-1">o</div>
                    <div className=" my-6 bg-gray-800 border-md h-[1px] w-[50%] mx-auto"></div>
                  </div>

                  <div>
                    <Textarea
                      innerClassName="resize"
                      defaultValue={accionaInfo[0].video_enunciado}
                      name="url"
                      label="Introdueix URL"
                    ></Textarea>
                  </div>
                </div>
                <IconButton type="submit">
                  <RiCheckFill className="bg-primary" />
                </IconButton>
                <IconButton
                  onClick={() => setIsEditingAcciona(false)}
                  color="error"
                >
                  <RiCloseFill className="" />
                </IconButton>
              </div>
            </form>
          )}

          <video width="50%" height="350px" controls>
            {accionaInfo[0] && accionaInfo[0].video_enunciado && (
              <source src={accionaInfo[0].video_enunciado} type="video/mp4" />
            )}
            Tu navegador no soporta el elemento de video.
          </video>
        </div>
      </div>
    </div>
  );
};

export default DetalleAcciona;
