import { Button, IconButton, Loader } from "pol-ui";
import { useParams } from "react-router-dom";
import { supabase } from "../../supabase/supabaseClient";
import { useState, useEffect } from "react";
import { Input, FileInput, Textarea } from "pol-ui";
import {
  RiPencilFill,
  RiCheckLine,
  RiCloseFill,
  RiCheckFill,
  RiCrossFill,
} from "react-icons/ri";

const DetalleMaterial = () => {
  const { elementoId } = useParams();
  // const [titulo, setTitulo] = useState("");

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
      }

      setMaterialInfo([{ ...materialInfo[0], titulo: titulo }]);
      console.log("dv: ", materialInfo);
    } catch (error) {
      console.error("Error en la operación Supabase:", error);
    }
    console.log(titulo);
    setIsEditingName(false);
  };

  //gestiono description
  const handleDescriptionChange = async (e, elementoId) => {
    e.preventDefault();
    console.log("desc!!!  : ", e.target.descripcion.value);
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

  //gestiono el material por url
  const handleMaterialChange = async (e, elementoId) => {
    e.preventDefault();

    // console.log("urlMATERIAL!!!  : ", e.target.archivo_url.value);
    // console.log("ARCHIVO SELECCIONADO: ", e.target.file.value);

    const fileInput = e.target.file;
    const urlInput = e.target.archivo_url;

    console.log(fileInput.files);

    // Si se seleccionó un archivo, lo subimos a Supabase
    if (fileInput.files.length > 0) {
      try {
        const file = fileInput.files[0];

        const { data, error } = await supabase.storage
          .from("materialFiles") // Reemplaza 'tu-bucket' con el nombre de tu bucket en Supabase Storage
          .upload(`materialFiles/${file.name}`, file, {
            cacheControl: "3600",
            upsert: false,
          });

        if (error) {
          console.error("Error al subir el archivo a Supabase:", error);
        } else {
          const fileUrl = data.Key;
          console.log("Archivo subido con éxito. URL:", fileUrl);

          // Ahora, puedes almacenar 'fileUrl' en tu tabla de materiales.
          const { data: updateData, error: updateError } = await supabase
            .from("material")
            .update({ archivo_url: fileUrl })
            .eq("elemento_id", parseInt(elementoId))
            .select();

          if (updateError) {
            console.error("Error al actualizar en Supabase:", updateError);
          } else {
            console.log("Actualizado correctamente en Supabase:", updateData);
            setMaterialInfo([{ ...materialInfo[0], archivo_url: fileUrl }]);
          }
        }
      } catch (error) {
        console.error("Error en la operación Supabase:", error);
      }
    } else if (urlInput.value.trim() !== "") {
      // Si se proporcionó una URL, la utilizamos directamente
      const url = urlInput.value;

      try {
        const { data, error } = await supabase
          .from("material")
          .update({ archivo_url: url })
          .eq("elemento_id", parseInt(elementoId))
          .select();

        if (error) {
          console.error("Error al actualizar en Supabase:", error);
        } else {
          console.log("Actualizado correctamente en Supabase:", data);
        }

        setMaterialInfo([{ ...materialInfo[0], archivo_url: url }]);
      } catch (error) {
        console.error("Error en la operación Supabase:", error);
      }
    }

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
                    <Input
                      defaultValue={
                        materialInfo[0]?.archivo_url ??
                        "https://arsa.alwaysdata.net/files/materialdefault.pdf"
                      }
                      name="archivo_url"
                      label="Introdueix URL"
                    ></Input>
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

          <iframe
            src={
              materialInfo[0]?.archivo_url ??
              "https://arsa.alwaysdata.net/files/materialdefault.pdf"
            }
            type="application/pdf"
            width="100%"
            height="600px"
          />
        </div>
      </div>
    </div>
  );
};

export default DetalleMaterial;
