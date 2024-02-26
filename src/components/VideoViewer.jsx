import React from "react";

const VideoViewer = ({ archivoUrl }) => {
  let embedUrl = archivoUrl;

  // Convertir la URL al formato de embed de YouTube si contiene "youtu.be"
  if (archivoUrl.includes("youtu.be")) {
    const videoId = archivoUrl.split("/").pop();
    embedUrl = `https://www.youtube.com/embed/${videoId}`;
  }

  if (
    archivoUrl.startsWith("https://www.youtube.com") ||
    archivoUrl.includes("youtu.be")
  ) {
    return (
      <iframe
        title="Video"
        height="500px"
        allow="accelerometer;"
        allowFullScreen
        controls
        src={embedUrl}
      ></iframe>
    );
  } else if (archivoUrl.includes("supabase.co")) {
    return (
      <video controls height="300px">
        <source src={archivoUrl} type="video/mp4" />
        Tu navegador no soporta el video.
      </video>
    );
  } else {
    return (
      <p>
        El formato del archivo no es compatible o la URL no es válida. Por
        favor, verifica la URL del archivo.
      </p>
    );
  }
};

export default VideoViewer;
