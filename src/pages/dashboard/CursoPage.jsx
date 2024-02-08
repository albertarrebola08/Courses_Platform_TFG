/* eslint-disable no-case-declarations */

import TablaModulos from "../../components/Modulos/TablaModulos";
import { Breadcrumb } from "pol-ui";
import { useState } from "react";
import { TiHome } from "react-icons/ti";
import { AiOutlineRead } from "react-icons/ai";

const CursoPage = () => {
  const [nombreCurso, setNombreCurso] = useState("Loading...");
  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item className=" items-baseline" icon={TiHome}>
          Els meus cursos
        </Breadcrumb.Item>
        <Breadcrumb.Item className=" items-baseline" icon={AiOutlineRead}>
          {nombreCurso}
        </Breadcrumb.Item>
      </Breadcrumb>
      <TablaModulos setNombreCurso={setNombreCurso} />
    </div>
  );
};

export default CursoPage;
