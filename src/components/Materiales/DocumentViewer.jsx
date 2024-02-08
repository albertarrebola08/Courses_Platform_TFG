import React from "react";
import { Button } from "pol-ui";
import { FaFileDownload } from "react-icons/fa";

const DocumentViewer = ({ archivoUrl, titulo }) => {
  // Obtener la extensión del archivo
  const extension = archivoUrl.split(".").pop().toLowerCase();
  const compatibleExtension = ["pdf", "html"];
  const imageExtension = ["png", "jpg", "jpeg", "gif", "webp"];
  const videoExtension = ["mp4", "avi", "mov"];
  const audioExtension = ["mp3", "wav"];
  const uncompatibleExtension = [
    { name: "flac", logo: "flac_logo.png" },
    { name: "doc", logo: "doc_logo.png" },
    { name: "docx", logo: "docx_logo.png" },
    { name: "ppt", logo: "ppt_logo.png" },
    { name: "pptx", logo: "pptx_logo.png" },
    { name: "xls", logo: "xls_logo.png" },
    { name: "xlsx", logo: "xlsx_logo.png" },
    { name: "csv", logo: "csv_logo.png" },
    { name: "txt", logo: "txt_logo.png" },
    { name: "key", logo: "key_logo.png" },
  ];

  // Verificar si la extensión está en la lista de tipos de extensiones compatibles
  const isCompatibleExtension = compatibleExtension.includes(extension);
  const isVideoExtension = videoExtension.includes(extension);
  const isAudioExtension = audioExtension.includes(extension);
  const isUncompatibleExtension = uncompatibleExtension.includes(extension);
  const isImageExtension = imageExtension.includes(extension);

  // Renderizar el contenido según la extensión del archivo
  if (isCompatibleExtension) {
    // Si es una extensión compatible, mostrar el archivo en el iframe
    return (
      <iframe
        title={titulo}
        src={archivoUrl}
        width="100%"
        height="600px"
        allowFullScreen
      />
    );
  } else if (isVideoExtension) {
    // Si es una extensión de video, mostrar el video con la URL correspondiente
    return (
      <video controls width="100%" height="auto">
        <source src={archivoUrl} type={`video/${extension}`} />
      </video>
    );
  } else if (isAudioExtension) {
    // Si es una extensión de audio, mostrar el audio con la URL correspondiente
    return (
      <audio controls>
        <source src={archivoUrl} type={`audio/${extension}`} />
      </audio>
    );
  } else if (isUncompatibleExtension) {
    // Si es una extensión incompatible, mostrar el botón de descarga
    return (
      <Button href={archivoUrl} download className="bg-gray-700">
        <div className="flex gap-2 items-center">
          <FaFileDownload />
          <span>
            Descarregar{" "}
            <span className="underline">
              {titulo}.{extension.toUpperCase()}{" "}
            </span>
          </span>
        </div>
      </Button>
    );
  } else if (isImageExtension) {
    return <img src={archivoUrl} alt={`imagen-${titulo}`} />;
  }
};

export default DocumentViewer;
