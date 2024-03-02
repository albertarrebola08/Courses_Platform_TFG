import { Button, FileInput, IconButton, Textarea } from "pol-ui";
import React from "react";
import { RiCheckFill, RiCloseFill } from "react-icons/ri";
import { useState } from "react";
import { supabase } from "../supabase/supabaseClient";

const ModalQuestionImg = ({ preguntaId, handleModifyImage, setShowModal }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [textareaValue, setTextareaValue] = useState("");
  const [fileValue, setFileValue] = useState(null);
  // //gestiono la imagen

  const handleTextareaChange = (e) => {
    setTextareaValue(e.target.value); // Actualiza el estado con el valor del textarea
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileValue(file);
  };
  // Función para manejar el evento onBlur en el textarea
  const handleTextareaBlur = () => {
    console.log("Valor del Textarea:", textareaValue);
  };

  const handleUploadImage = async (urlValue, fileValue) => {
    console.log("Valor del input de texto:", urlValue);
    // e.preventDefault();

    //Verificar si urlInput es null antes de acceder a su propiedad value
    if (urlValue !== null && urlValue.trim() !== "") {
      const url = urlValue.trim();
      console.log("URL TRIM: ", url);

      setImageUrl(url);
      handleModifyImage(preguntaId, url);
    }

    // Si se seleccionó un archivo, lo subimos a Supabase
    else if (fileValue) {
      try {
        const file = fileValue;
        const fileName = file.name
          .normalize("NFD")
          .replace(/\s+/g, "_")
          .replace(/[^\w.-]/g, "");

        // Subir el archivo al bucket
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("questionsImg")
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
          .from("questionsImg")
          .getPublicUrl(uploadData.path);

        if (getPublicUrlError) {
          console.error("Error al obtener la URL pública:", getPublicUrlError);
          return;
        }
        console.log("url supp busket: ", publicUrl.publicUrl);
        setImageUrl(publicUrl.publicUrl);
        handleModifyImage(preguntaId, publicUrl.publicUrl);
      } catch (error) {
        console.error("Error en la operación Supabase:", error);
      }
    }
    setShowModal(false);
  };
  return (
    <div className="w-full flex flex-col gap-5 p-4 bg-secondary-200 rounded-lg">
      <div>
        <FileInput
          color="secondary"
          name="file"
          accept=".doc,.docx,.xml,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          onChange={handleFileChange}
        ></FileInput>
        <div className="flex items-center justify-around px-16 gap-4">
          <div className="my-6 bg-gray-800 border-md h-[1px] w-[50%] mx-auto"></div>
          <div className="pb-1">o</div>
          <div className="my-6 bg-gray-800 border-md h-[1px] w-[50%] mx-auto"></div>
        </div>
        <div>
          <Textarea
            innerClassName="resize"
            name="url"
            label="Introdueix URL"
            value={textareaValue} // Asigna el valor del estado al Textarea
            onChange={handleTextareaChange} // Maneja el cambio en el Textarea
            onBlur={handleTextareaBlur} // Maneja el evento onBlur en el Textarea
          ></Textarea>
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          color="primary"
          className="bg-primary-800"
          onClick={() => handleUploadImage(textareaValue, fileValue)}
        >
          <RiCheckFill />
          Pujar imatge
        </Button>
        <Button color="error" onClick={() => setShowModal(false)}>
          <RiCloseFill />
          Cancelar
        </Button>
      </div>
      <img src={imageUrl} alt="" />
    </div>
  );
};

export default ModalQuestionImg;
