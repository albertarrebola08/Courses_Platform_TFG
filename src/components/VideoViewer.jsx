import React from "react";

const VideoViewer = ({ archivoUrl }) => {
  return (
    <video controls width="100%" height="auto">
      <source src={archivoUrl} />
    </video>
  );
};

export default VideoViewer;

//FALTA ASSEGURAR FORMAT VEURE QUINS SON COMPATIBLES Y FER ALERT EN BASE A AIXO !!!
