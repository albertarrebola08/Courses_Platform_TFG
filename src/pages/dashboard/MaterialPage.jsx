import { useContext, useEffect, useState } from "react";

import DetalleMaterial from "../../components/Materiales/DetalleMaterial";
import { Breadcrumb } from "pol-ui";
import { TiHome } from "react-icons/ti";
import { AiOutlineRead, AiTwotoneDatabase } from "react-icons/ai";
import { GlobalContext } from "../../GlobalContext";
import DrawBreadcrumb from "../../components/DrawBreadcrumb";

function MaterialPage() {
  return (
    <>
      {/* AQUI VA EL BREADCRUMB */}

      <DetalleMaterial />
    </>
  );
}

export default MaterialPage;
