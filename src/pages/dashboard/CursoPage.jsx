/* eslint-disable no-case-declarations */

import { Button, IconButton } from "pol-ui";
import TablaModulos from "../../components/Modulos/TablaModulos";
import { RiEditFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const CursoPage = () => {
  return (
    <div>
      <TablaModulos />
      <div className="flex flex-col gap-3 py-8 w-[20%]">
        <Button className=" flex">
          <Link to="preguntas">
            Preguntes diaries <RiEditFill></RiEditFill>
          </Link>
        </Button>
        <Button className="flex ">
          <Link to="consejos">
            Consells <RiEditFill></RiEditFill>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default CursoPage;
