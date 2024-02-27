import { useParams } from "react-router-dom";
import { supabase } from "../../supabase/supabaseClient";
import { useState, useEffect } from "react";
import { Input, FileInput, Button, IconButton, Textarea, Alert } from "pol-ui";

import { RiPencilFill, RiCloseFill, RiCheckFill } from "react-icons/ri";
import FileViewer from "../FileViewer";

const DetalleAcciona = () => {
  const { elementoId } = useParams();
  const [isFileUploaded, setIsFileUploaded] = useState(null);
  const [accionaInfo, setAccionaInfo] = useState("");
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEnun, setIsEditingEnun] = useState(false);
  const [isEditingAcciona, setIsEditingAcciona] = useState(false);
  const [isEditingAccionaFile, setIsEditingAccionaFile] = useState(false);

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
          // console.log("Detalle acciona: ", accionaData);
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

      setAccionaInfo([{ ...accionaInfo[0], titulo: titulo }]);
      console.log("dv: ", accionaInfo);
    } catch (error) {
      console.error("Error en la operación Supabase:", error);
    }
    console.log(titulo);
    setIsEditingName(false);
  };
  //gestiono enunciado - POSIBLE MODIFICACION A EDITOR DE TEXTO BUSCAR COMPONENTE O PREGUNTAR POL-UI
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
    const urlInput = e.target.url;
    const fileInput = e.target.file;

    // Si se proporcionó una URL, actualiza la URL en la base de datos
    if (urlInput.value.trim() !== "") {
      const url = urlInput.value.trim();
      console.log("URL TRIM: ", url);

      try {
        // Actualizar el campo archivo_url en la tabla Video con la nueva URL
        const { data: updateData, error: updateError } = await supabase
          .from("acciona")
          .update({ video_enunciado: url })
          .eq("elemento_id", parseInt(elementoId));

        if (updateError) {
          console.error("Error al actualizar en Supabase:", updateError);
          return;
        }

        // Actualizar el estado local con la nueva información del Video
        setAccionaInfo([{ ...accionaInfo[0], video_enunciado: url }]);
      } catch (error) {
        console.error("Error en la operación Supabase:", error);
      }
    } else if (fileInput.files.length > 0) {
      setIsFileUploaded(true);
      //estado auxiliar para saber como se ha subido si con file o con url
      // Si se selecciona un archivo, lo subimos a Supabase Storage
      try {
        const file = fileInput.files[0];

        const fileName = fileInput.files[0].name
          .normalize("NFD")
          .replace(/\s+/g, "_")
          .replace(/[^\w.-]/g, "");

        // Subir el archivo al bucket
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("accionas")
          .upload(`${fileName}`, file, {
            cacheControl: "3600",
            upsert: false,
          });

        if (uploadError) {
          console.error("Error al subir el archivo a Supabase:", uploadError);
          return;
        }

        // Obtener la URL pública del archivo recién subido
        const { data: publicUrl, error: getPublicUrlError } = supabase.storage
          .from("accionas")
          .getPublicUrl(uploadData.path);

        if (getPublicUrlError) {
          console.error("Error al obtener la URL pública:", getPublicUrlError);
          return;
        }

        // Actualizar el campo archivo_url en la tabla Video con la nueva URL
        const { data: updateData, error: updateError } = await supabase
          .from("acciona")
          .update({ video_enunciado: publicUrl.publicUrl })
          .eq("elemento_id", parseInt(elementoId));

        if (updateError) {
          console.error("Error al actualizar en Supabase:", updateError);
          return;
        }

        // Actualizar el estado local con la nueva información del Video
        setAccionaInfo([
          { ...accionaInfo[0], video_enunciado: publicUrl.publicUrl },
        ]);
      } catch (error) {
        console.error("Error en la operación Supabase:", error);
      }
    }

    // Restablecer el estado de edición del Acciona
    setIsEditingAcciona(false);
  };

  const handleAccionaFile = async (e, elementoId) => {
    e.preventDefault();
    const urlInput = e.target.url;
    const fileInput = e.target.file;

    // Si se proporcionó una URL, actualiza la URL en la base de datos
    if (urlInput.value.trim() !== "") {
      const url = urlInput.value.trim();
      console.log("URL TRIM: ", url);

      try {
        // Actualizar el campo archivo_url en la tabla Video con la nueva URL
        const { data: updateData, error: updateError } = await supabase
          .from("acciona")
          .update({ archivo_url: url })
          .eq("elemento_id", parseInt(elementoId));

        if (updateError) {
          console.error("Error al actualizar en Supabase:", updateError);
          return;
        }

        // Actualizar el estado local con la nueva información del Video
        setAccionaInfo([{ ...accionaInfo[0], archivo_url: url }]);
      } catch (error) {
        console.error("Error en la operación Supabase:", error);
      }
    } else if (fileInput.files.length > 0) {
      setIsFileUploaded(true);
      //estado auxiliar para saber como se ha subido si con file o con url
      // Si se selecciona un archivo, lo subimos a Supabase Storage
      try {
        const file = fileInput.files[0];

        const fileName = fileInput.files[0].name
          .normalize("NFD")
          .replace(/\s+/g, "_")
          .replace(/[^\w.-]/g, "");

        // Subir el archivo al bucket
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("accionas")
          .upload(`/archivos/${fileName}`, file, {
            cacheControl: "3600",
            upsert: false,
          });

        if (uploadError) {
          console.error("Error al subir el archivo a Supabase:", uploadError);
          return;
        }

        // Obtener la URL pública del archivo recién subido
        const { data: publicUrl, error: getPublicUrlError } = supabase.storage
          .from("accionas")
          .getPublicUrl(uploadData.path);

        if (getPublicUrlError) {
          console.error("Error al obtener la URL pública:", getPublicUrlError);
          return;
        }

        // Actualizar el campo archivo_url en la tabla Video con la nueva URL
        const { data: updateData, error: updateError } = await supabase
          .from("acciona")
          .update({ archivo_url: publicUrl.publicUrl })
          .eq("elemento_id", parseInt(elementoId));

        if (updateError) {
          console.error("Error al actualizar en Supabase:", updateError);
          return;
        }

        // Actualizar el estado local con la nueva información del Video
        setAccionaInfo([
          { ...accionaInfo[0], archivo_url: publicUrl.publicUrl },
        ]);
      } catch (error) {
        console.error("Error en la operación Supabase:", error);
      }
    }

    // Restablecer el estado de edición del Acciona
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
                  <FileInput name="file" color="secondary"></FileInput>
                  <div className="flex items-center justify-around px-16 gap-4">
                    <div className=" my-6 bg-gray-800 border-md h-[1px] w-[50%] mx-auto"></div>
                    <div className="pb-1">o</div>
                    <div className=" my-6 bg-gray-800 border-md h-[1px] w-[50%] mx-auto"></div>
                  </div>

                  <div>
                    <Textarea
                      innerClassName="resize"
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

          {/* ARCHIVO DE ACCIONA */}
          {!isEditingAccionaFile ? (
            <span className="flex gap-2 items-center">
              <h1 className="text-lg">Document acciona:</h1>

              <RiPencilFill
                onClick={() => setIsEditingAccionaFile(true)}
                className="text-primary-800"
              />
            </span>
          ) : (
            <form
              className="w-full"
              onSubmit={(e) => {
                handleAccionaFile(e, elementoId);
              }}
            >
              <div className="flex gap-3 items-center w-full">
                <div
                  className={`border border-md border-gray-800  p-8 rounded-lg ${
                    isEditingAccionaFile ? "block" : "hidden"
                  } `}
                >
                  <FileInput name="file" color="secondary"></FileInput>
                  <div className="flex items-center justify-around px-16 gap-4">
                    <div className=" my-6 bg-gray-800 border-md h-[1px] w-[50%] mx-auto"></div>
                    <div className="pb-1">o</div>
                    <div className=" my-6 bg-gray-800 border-md h-[1px] w-[50%] mx-auto"></div>
                  </div>

                  <div>
                    <Textarea
                      innerClassName="resize"
                      name="url"
                      label="Introdueix URL"
                    ></Textarea>
                  </div>
                </div>
                <IconButton type="submit">
                  <RiCheckFill className="bg-primary" />
                </IconButton>
                <IconButton
                  onClick={() => setIsEditingAccionaFile(false)}
                  color="error"
                >
                  <RiCloseFill className="" />
                </IconButton>
              </div>
            </form>
          )}

          <Alert className="text-[14px]" bordered="true" color="info">
            <div className="">
              <h3 className="text-lg font-bold">
                Informació important per arxius
              </h3>
              <h4 className="text-[16px] mb-2 ">
                Els formats que soporta el navegador son:
              </h4>
            </div>

            <ul>
              <li>
                - <i>.pdf</i>,<i>.html</i> per documents.
              </li>
              <li>
                - <i>.png</i> <i> .jpg</i> <i> .jpeg</i> <i> .webp</i> per
                imatges
              </li>
              <li>
                - <i> .mp4</i> <i> .avi</i>, <i> .mov</i> per videos
              </li>
              <li>
                - <i>.mp3</i> <i>.wav</i> per audios
              </li>
            </ul>
            <div className="mt-3">
              Si el material es d'un altre format no es visualitzarà però
              s'oferirà la possibilitat de descarregar-lo.
            </div>
          </Alert>

          {accionaInfo[0]?.archivo_url && accionaInfo[0]?.titulo && (
            <FileViewer
              key={accionaInfo[0].archivo_url}
              archivoUrl={accionaInfo[0].archivo_url}
              titulo={accionaInfo[0].titulo}
            />
          )}

          {/* Renderiza el VideoViewer si hay una URL de video */}
          {accionaInfo[0]?.video_enunciado && (
            <FileViewer
              archivoUrl={accionaInfo[0].video_enunciado}
              titulo={accionaInfo[0].titulo}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DetalleAcciona;
