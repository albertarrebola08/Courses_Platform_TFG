import { useParams } from "react-router-dom";
import { supabase } from "../../supabase/supabaseClient";
import { useState, useEffect, useContext } from "react";
import { Input, FileInput, Button, IconButton, Textarea } from "pol-ui";
import DocumentViewer from "../Materiales/DocumentViewer";
import VideoViewer from "../VideoViewer";
import {
  RiArrowDownSLine,
  RiPencilFill,
  RiCheckLine,
  RiCloseFill,
  RiCheckFill,
} from "react-icons/ri";

const DetalleVideo = () => {
  const { elementoId } = useParams();
  const [isFileUploaded, setIsFileUploaded] = useState(null);
  // const { detalleModulo, setDetalleModulo } = useContext(GlobalContext);

  const [videoInfo, setVideoInfo] = useState("");
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingVideo, setIsEditingVideo] = useState(false);

  useEffect(() => {
    const obtenerDetalleVideo = async (elementoId) => {
      try {
        const { data: videoData, error } = await supabase
          .from("video")
          .select("*")
          .eq("elemento_id", parseInt(elementoId));

        if (error) {
          console.error(
            "Error al obtener el detalle del video:",
            error.message
          );
        } else {
          console.log("Detalle video:", videoData);
          setVideoInfo(videoData);
          //*****************************************************
          //CAMBIAR EL TITULO EN TABLA MODULO - HAY QUE CAMBIAR TITULO EN TABLA ELEMENTOS!!! importante
          //*****************************************************
        }
      } catch (error) {
        console.error("Error al obtener el detalle del video:", error.message);
      }
    };

    obtenerDetalleVideo(elementoId);
  }, []);

  const handleTitleChange = async (e, elementoId) => {
    e.preventDefault();

    const titulo = e.target.titulo.value;

    try {
      const { data, error } = await supabase
        .from("video")
        .update({ titulo: titulo })
        .eq("elemento_id", parseInt(elementoId))
        .select();

      if (error) {
        console.error("Error al actualizar en Supabase:", error);
      } else {
        console.log("Actualizado correctamente en Supabase:", data);
      }

      setVideoInfo([{ ...videoInfo[0], titulo: titulo }]);
    } catch (error) {
      console.error("Error en la operación Supabase:", error);
    }
    console.log(titulo);
    setIsEditingName(false);
  };

  //gestiono el video por url
  const handleVideoChange = async (e, elementoId) => {
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
          .from("video")
          .update({ url: url })
          .eq("elemento_id", parseInt(elementoId));

        if (updateError) {
          console.error("Error al actualizar en Supabase:", updateError);
          return;
        }

        // Actualizar el estado local con la nueva información del Video
        setVideoInfo([{ ...videoInfo[0], url }]);
        console.log("video actualizado: ", videoInfo);
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
          .from("videos")
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
          .from("videos")
          .getPublicUrl(uploadData.path);

        if (getPublicUrlError) {
          console.error("Error al obtener la URL pública:", getPublicUrlError);
          return;
        }

        // Actualizar el campo archivo_url en la tabla Video con la nueva URL
        const { data: updateData, error: updateError } = await supabase
          .from("video")
          .update({ url: publicUrl.publicUrl })
          .eq("elemento_id", parseInt(elementoId));

        if (updateError) {
          console.error("Error al actualizar en Supabase:", updateError);
          return;
        }

        // Actualizar el estado local con la nueva información del Video
        setVideoInfo([{ ...videoInfo[0], url: publicUrl.publicUrl }]);
      } catch (error) {
        console.error("Error en la operación Supabase:", error);
      }
    }

    // Restablecer el estado de edición del Video
    setIsEditingVideo(false);
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
                  {videoInfo[0]?.titulo ?? "Carregant títol..."}
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
                    defaultValue={videoInfo[0].titulo}
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

          {!isEditingVideo ? (
            <span className="flex gap-2 items-center">
              <h1 className="text-lg">Video actual:</h1>

              <RiPencilFill
                onClick={() => setIsEditingVideo(true)}
                className="text-primary-800"
              />
            </span>
          ) : (
            <form
              className="w-full"
              onSubmit={(e) => {
                handleVideoChange(e, elementoId);
              }}
            >
              <div className="flex gap-3 items-center w-full">
                <div
                  className={`border border-md border-gray-800  p-8 rounded-lg ${
                    isEditingVideo ? "block" : "hidden"
                  } `}
                >
                  <FileInput color="secondary" name="file"></FileInput>
                  <div className="flex items-center justify-around px-16 gap-4">
                    <div className=" my-6 bg-gray-800 border-md h-[1px] w-[50%] mx-auto"></div>
                    <div className="pb-1">o</div>
                    <div className=" my-6 bg-gray-800 border-md h-[1px] w-[50%] mx-auto"></div>
                  </div>

                  <div>
                    <Textarea
                      innerClassName="resize"
                      defaultValue=""
                      name="url"
                      label="Introdueix URL"
                    ></Textarea>
                  </div>
                </div>
                <IconButton type="submit">
                  <RiCheckFill className="bg-primary" />
                </IconButton>
                <IconButton
                  onClick={() => setIsEditingVideo(false)}
                  color="error"
                >
                  <RiCloseFill className="" />
                </IconButton>
              </div>
            </form>
          )}
          {console.log("vinfo antes de vviewer: ", videoInfo)}

          {isFileUploaded && videoInfo[0] && videoInfo[0].url ? (
            <DocumentViewer
              archivoUrl={videoInfo[0].url}
              titulo={videoInfo[0].titulo}
            />
          ) : (
            videoInfo[0] &&
            videoInfo[0].url &&
            videoInfo[0].titulo && (
              <VideoViewer
                key={videoInfo[0].url}
                archivoUrl={videoInfo[0].url}
                titulo={videoInfo[0].titulo}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default DetalleVideo;
