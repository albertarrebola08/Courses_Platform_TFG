import React from "react";
import { Button } from "pol-ui";
import { FaFileDownload } from "react-icons/fa";

const FileViewer = ({ archivoUrl, titulo }) => {
  // Obtener la extensión del archivo
  const extension = archivoUrl.split(".").pop().toLowerCase();
  const compatibleExtension = ["pdf", "html"];
  const videoExtension = ["mp4", "avi", "mov"];
  const audioExtension = ["mp3", "wav"];
  const imageExtension = ["png", "jpg", "jpeg", "webp"];
  const uncompatibleExtension = [
    { name: "flac", logo: "/images/flac_logo.png" },
    { name: "doc", logo: "/images/doc_logo.png" },
    { name: "docx", logo: "/images/docx_logo.png" },
    { name: "ppt", logo: "/images/ppt_logo.png" },
    { name: "pptx", logo: "/images/pptx_logo.png" },
    { name: "xls", logo: "/images/xls_logo.png" },
    { name: "xlsx", logo: "/images/xlsx_logo.png" },
    { name: "csv", logo: "/images/csv_logo.png" },
    { name: "txt", logo: "/images/txt_logo.png" },
    { name: "key", logo: "/images/key_logo.png" },
  ];

  // Verificar el tipo de archivo según su extensión
  const isCompatibleExtension = compatibleExtension.includes(extension);
  const isVideoExtension = videoExtension.includes(extension);
  const isAudioExtension = audioExtension.includes(extension);
  const isImageExtension = imageExtension.includes(extension);
  const matchingExtension = uncompatibleExtension.find(
    (item) => item.name === extension
  );

  // Si la URL es de YouTube o contiene "youtu.be", mostrar el video de YouTube
  if (
    archivoUrl.startsWith("https://www.youtube.com") ||
    archivoUrl.includes("youtu.be")
  ) {
    const embedUrl = archivoUrl.includes("youtu.be")
      ? `https://www.youtube.com/embed/${archivoUrl.split("/").pop()}`
      : archivoUrl;

    return (
      <iframe
        title={titulo}
        src={embedUrl}
        width="100%"
        height="500px"
        allow="accelerometer;"
        allowFullScreen
        controls
      ></iframe>
    );
    // Renderizar el contenido según la extensión del archivo
  } else if (isCompatibleExtension) {
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
  } else if (matchingExtension) {
    // Si es una extensión incompatible, mostrar el botón de descarga
    return (
      <Button href={archivoUrl} download className="bg-gray-700 w-[50%]">
        <div className="flex gap-2 items-center">
          <img
            width="30px"
            src={matchingExtension.logo}
            alt={`logo_${matchingExtension.name}`}
          />
          <FaFileDownload />
          <span>
            Descargar{" "}
            <span className="underline">{`${titulo}.${extension.toUpperCase()}`}</span>
          </span>
        </div>
      </Button>
    );
  } else if (isImageExtension) {
    // Si es una extensión de imagen, mostrar la imagen
    return (
      <img
        src={archivoUrl}
        alt={`imagen-${titulo}`}
        className="max-w-[200px]"
      />
    );
  } else {
    // Si no se reconoce la extensión, mostrar un mensaje de error
    return (
      <p>
        El formato del archivo no es compatible o la URL no es válida. Por
        favor, verifica la URL del archivo.
      </p>
    );
  }
};

export default FileViewer;
