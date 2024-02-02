import { Button, IconButton, Loader } from "pol-ui";
import { useParams } from "react-router-dom";
import { supabase } from "../../supabase/supabaseClient";
import { useState, useEffect } from "react";
import { Input, FileInput, Textarea } from "pol-ui";
import { RiPencilFill, RiCheckLine, RiCloseFill } from "react-icons/ri";

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
  const handleDescriptionChange = async (e, moduleId) => {
    e.preventDefault();

    const description = e.target.descripcion.value;
    console.log("descT", description);
    try {
      const { data, error } = await supabase
        .from("material")
        .update({ descripcion: description })
        .eq("id", parseInt(moduleId))
        .select();

      console.log("data desc", data);

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

    const url = e.target.archivo_url.value;

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
      console.log("dv(url): ", materialInfo);
    } catch (error) {
      console.error("Error en la operación Supabase:", error);
    }
    console.log(url);
    setIsEditingMaterial(false);
  };

  return (
    <div className="p-8">
      <div className="flex flex-col gap-3 w-[50%] ">
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleTitleChange(e, elementoId);
            handleDescriptionChange(e, elementoId);
            handleMaterialChange(e, elementoId);
          }}
        >
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
              <div className="flex gap-3 items-center w-full">
                <Input
                  name="titulo"
                  defaultValue={materialInfo[0].titulo}
                ></Input>
                <IconButton
                  color="error"
                  onClick={() => {
                    setIsEditingName(false);
                  }}
                >
                  <RiCloseFill></RiCloseFill>
                </IconButton>
              </div>
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
              <div className="flex gap-3 items-center w-full">
                <Textarea
                  innerClassName="resize"
                  defaultValue={materialInfo[0].descripcion}
                  name="descripcion"
                ></Textarea>
                <IconButton
                  color="error"
                  onClick={() => {
                    setIsEditingDesc(false);
                  }}
                >
                  <RiCloseFill></RiCloseFill>
                </IconButton>
              </div>
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
            <div className="flex gap-3 items-center w-full">
              <div
                className={`border border-md border-gray-800  p-8 rounded-lg ${
                  isEditingMaterial ? "block" : "hidden"
                } `}
              >
                <FileInput color="secondary"></FileInput>
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
                    name="url"
                    label="Introdueix URL"
                  ></Input>
                </div>
              </div>
              <IconButton
                color="error"
                onClick={() => {
                  setIsEditingMaterial(false);
                }}
              >
                <RiCloseFill></RiCloseFill>
              </IconButton>
            </div>
          )}

          <embed
            src={
              materialInfo[0]?.archivo_url ??
              "https://arsa.alwaysdata.net/files/materialdefault.pdf"
            }
            type="application/pdf"
            width="100%"
            height="600px"
          />

          <Button
            className="bg-gray-700 rounded-md text-white flex justify-center truncate px-4 items-center gap-2"
            title="Guardar canvis"
            type="submit"
          >
            Guardar canvis <RiCheckLine />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default DetalleMaterial;
