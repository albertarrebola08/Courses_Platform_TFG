import React from "react";

const VideoViewer = ({ archivoUrl }) => {
  return (
    <video controls width="100%" height="auto">
      <source src={archivoUrl} />
    </video>
  );
};

export default VideoViewer;
