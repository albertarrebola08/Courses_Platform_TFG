import { Button, IconButton, Loader } from "pol-ui";
import { useParams } from "react-router-dom";
import { supabase } from "../../supabase/supabaseClient";
import { useState, useEffect } from "react";
import { Input, FileInput, Textarea, Alert } from "pol-ui";
import {
  RiPencilFill,
  RiCloseFill,
  RiCheckFill,
  RiInformationLine,
} from "react-icons/ri";

import FileViewer from "../FileViewer";

const DetalleMaterial = ({ setTitulo }) => {
  const { elementoId } = useParams();

  const [materialInfo, setMaterialInfo] = useState("");
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingDesc, setIsEditingDesc] = useState(false);
  const [isEditingMaterial, setIsEditingMaterial] = useState(false);

  useEffect(() => {
    const obtenerDetalleMaterial = async (elementoId) => {
      try {
        const { data: materialData, error } = await supabase
          .from("material")
          .select("*")
          .eq("elemento_id", parseInt(elementoId));

        if (error) {
          console.error(
            "Error al obtener el detalle del material:",
            error.message
          );
        } else {
          console.log("Detalle material: ", materialData);
          setMaterialInfo(materialData);
        }
      } catch (error) {
        console.error(
          "Error al obtener el detalle del material:",
          error.message
        );
      }
    };

    obtenerDetalleMaterial(elementoId);
  }, []);

  const handleTitleChange = async (e, elementoId) => {
    e.preventDefault();
    console.log("e: ", e.target.titulo.value);
    const titulo = e.target.titulo.value;

    try {
      const { data, error } = await supabase
        .from("material")
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

      setMaterialInfo([{ ...materialInfo[0], titulo: titulo }]);
      setTitulo(...materialInfo[0].titulo);
      console.log("dv: ", materialInfo);
    } catch (error) {
      console.error("Error en la operación Supabase:", error);
    }

    setIsEditingName(false);
  };

  //gestiono description
  const handleDescriptionChange = async (e, elementoId) => {
    e.preventDefault();

    const description = e.target.descripcion.value;

    try {
      const { data, error } = await supabase
        .from("material")
        .update({ descripcion: description })
        .eq("elemento_id", parseInt(elementoId))
        .select();

      if (error) {
        console.error("Error al actualizar en Supabase:", error);
      } else {
        console.log("Actualizado correctamente en Supabase:", data);
      }

      setMaterialInfo([{ ...materialInfo[0], descripcion: description }]);
    } catch (error) {
      console.error("Error en la operación Supabase:", error);
    }
    setIsEditingDesc(false);
  };

  //gestiono el material
  const handleMaterialChange = async (e, elementoId) => {
    e.preventDefault();

    const fileInput = e.target.file;
    const urlInput = e.target.url;

    // Si se proporcionó una URL, actualiza la URL en la base de datos
    if (urlInput.value.trim() !== "") {
      const url = urlInput.value.trim();
      console.log("URL TRIM: ", url);

      try {
        // Actualizar el campo archivo_url en la tabla Video con la nueva URL
        const { data: updateData, error: updateError } = await supabase
          .from("material")
          .update({ archivo_url: url })
          .eq("elemento_id", parseInt(elementoId));

        if (updateError) {
          console.error("Error al actualizar en Supabase:", updateError);
          return;
        }

        // Actualizar el estado local con la nueva información del Video
        setMaterialInfo([{ ...materialInfo[0], archivo_url: url }]);
      } catch (error) {
        console.error("Error en la operación Supabase:", error);
      }
    }
    // Si se seleccionó un archivo, lo subimos a Supabase
    else if (fileInput.files.length > 0) {
      try {
        const file = fileInput.files[0];

        const fileName = fileInput.files[0].name
          .normalize("NFD")
          .replace(/\s+/g, "_")
          .replace(/[^\w.-]/g, "");

        // Verificar si el archivo ya existe en el bucket - pendiente ??

        // Subir el archivo al bucket
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("materialFiles")
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
          .from("materialFiles")
          .getPublicUrl(uploadData.path);

        if (getPublicUrlError) {
          console.error("Error al obtener la URL pública:", getPublicUrlError);
          return;
        }

        // Actualizar el campo archivo_url en la tabla material con la nueva URL
        const { data: updateData, error: updateError } = await supabase
          .from("material")
          .update({ archivo_url: publicUrl.publicUrl })
          .eq("elemento_id", parseInt(elementoId));

        if (updateError) {
          console.error("Error al actualizar en Supabase:", updateError);
          return;
        }

        // Actualizar el estado local con la nueva información del material
        setMaterialInfo([
          { ...materialInfo[0], archivo_url: publicUrl.publicUrl },
        ]);
      } catch (error) {
        console.error("Error en la operación Supabase:", error);
      }
    }

    // Restablecer el estado de edición del material
    setIsEditingMaterial(false);
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
                  {materialInfo[0]?.titulo ?? "Carregant títol..."}
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
                    defaultValue={materialInfo[0].titulo}
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
            {!isEditingDesc ? (
              <span className="flex gap-2 items-center">
                <h1 className="text-lg">Descripció:</h1>
                <p className="text-black text-lg font-light">
                  {materialInfo[0]?.descripcion ?? "Carregant descripció..."}
                </p>
                <RiPencilFill
                  onClick={() => setIsEditingDesc(true)}
                  className="text-primary-800"
                />
              </span>
            ) : (
              <form
                className="w-full"
                onSubmit={(e) => {
                  handleDescriptionChange(e, elementoId);
                }}
              >
                <div className="flex gap-3 items-center w-full">
                  <Textarea
                    innerClassName="resize"
                    defaultValue={materialInfo[0].descripcion}
                    name="descripcion"
                  ></Textarea>
                  <IconButton type="submit">
                    <RiCheckFill className="bg-primary" />
                  </IconButton>
                  <IconButton
                    onClick={() => setIsEditingDesc(false)}
                    color="error"
                  >
                    <RiCloseFill className="" />
                  </IconButton>
                </div>
              </form>
            )}
          </div>
          {!isEditingMaterial ? (
            <span className="flex gap-2 items-center">
              <h1 className="text-lg">Material actual:</h1>

              <RiPencilFill
                onClick={() => setIsEditingMaterial(true)}
                className="text-primary-800"
              />
            </span>
          ) : (
            <form
              className="w-full"
              onSubmit={(e) => {
                handleMaterialChange(e, elementoId);
              }}
            >
              <div className="flex gap-3 items-center w-full">
                <div
                  className={`border border-md border-gray-800  p-8 rounded-lg ${
                    isEditingMaterial ? "block" : "hidden"
                  } `}
                >
                  <FileInput
                    color="secondary"
                    name="file"
                    accept=".doc,.docx,.xml,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  ></FileInput>
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
                  onClick={() => setIsEditingMaterial(false)}
                  color="error"
                >
                  <RiCloseFill className="" />
                </IconButton>
              </div>
            </form>
          )}

          <Alert className="text-[14px]" bordered color="info">
            <div className="flex gap-3 items-center ">
              <RiInformationLine className="text-[18px]" />
              <div className=" gap-2 items-center mb-2">
                <h3 className="text-lg font-bold ">
                  Informació important per arxius
                </h3>
                <h4 className="text-[15px]">
                  Els formats que soporta el navegador son:
                </h4>
              </div>
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
            <div className="p-2 bg-info-300 rounded-md mt-3">
              <strong>Si el material és un video</strong>, també pots introduir
              la <strong>url del video</strong> si el tens a la plataforma
              YouTube
            </div>
          </Alert>
          {materialInfo[0]?.archivo_url && materialInfo[0]?.titulo && (
            <FileViewer
              key={materialInfo[0].archivo_url}
              archivoUrl={materialInfo[0].archivo_url}
              titulo={materialInfo[0].titulo}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DetalleMaterial;
