import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../GlobalContext";
import { supabase } from "../../supabase/supabaseClient";
import TablaModulo from "../../components/Modulos/TablaModulo";
import {
  RiVideoFill,
  RiBookOpenFill,
  RiFileEditFill,
  RiListCheck3,
  RiWalkFill,
  RiCheckFill,
  RiPencilFill,
} from "react-icons/ri";

import { LuDices } from "react-icons/lu";
import { MdBackHand } from "react-icons/md";
import FormAddElement from "../../components/Modulos/FormAddElement";
import { useParams } from "react-router-dom";
import { Input, Textarea, IconButton, Breadcrumb } from "pol-ui";
import { TiHome } from "react-icons/ti";
import { AiOutlineRead, AiTwotoneDatabase } from "react-icons/ai";

const ModuloPage = () => {
  const { detalleModulo } = useContext(GlobalContext);
  const { itemsBreadcrumb, setItemsBreadcrumb } = useContext(GlobalContext);

  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingDesc, setIsEditingDesc] = useState(false);

  const [moduloInfo, setModuloInfo] = useState([]);
  const Params = useParams();
  const { moduleId } = useParams();

  useEffect(() => {
    const obtenerInfoModulo = async (moduleId) => {
      try {
        const { data, error } = await supabase
          .from("modulo")
          .select("*")
          .eq("id", moduleId);

        if (error) {
          throw error;
        }

        setModuloInfo(data);
        const nuevoBreadcrumbItem = {
          icono: AiTwotoneDatabase,
          texto: data[0].nombre,
        };

        setItemsBreadcrumb((prevItems) => {
          // Clonar el array existente y añadir el nuevo elemento al final
          return [...prevItems, nuevoBreadcrumbItem];
        });
      } catch (error) {
        console.error("Error al obtener el módulo:", error.message);
      }
    };

    obtenerInfoModulo(moduleId);
  }, []);

  const obtenerIconoPorTipo = (tipo) => {
    switch (tipo) {
      case "video":
        return <RiVideoFill className="text-xl" />;

      case "material":
        return <RiBookOpenFill className="text-xl" />;

      case "acciona":
        return <MdBackHand className="text-xl" />;

      case "examen":
        return <RiFileEditFill className="text-xl" />;

      case "quiz":
        return <RiListCheck3 className="text-xl" />;

      case "numeral":
        return <LuDices className="text-xl" />;

      case "camino":
        return <RiWalkFill className="text-xl" />;
    }
  };
  //ACCIONES PARA EDITAR EN LINEA EL TITULO Y DESCRIPCION DEL MODULO
  const handleTitleChange = async (e, moduleId) => {
    e.preventDefault();

    const titulo = e.target.titulo.value;

    try {
      const { data, error } = await supabase
        .from("modulo")
        .update({ nombre: titulo })
        .eq("id", parseInt(moduleId))
        .select();

      if (error) {
        console.error("Error al actualizar en Supabase:", error);
      } else {
        console.log("Actualizado correctamente en Supabase:", data);
      }

      setModuloInfo([{ ...moduloInfo[0], nombre: titulo }]);
    } catch (error) {
      console.error("Error en la operación Supabase:", error);
    }

    setIsEditingName(false);
  };
  const handleDescriptionChange = async (e, moduleId) => {
    e.preventDefault();

    const description = e.target.descripcion.value;
    console.log("descT", description);
    try {
      const { data, error } = await supabase
        .from("modulo")
        .update({ descripcion: description })
        .eq("id", parseInt(moduleId))
        .select();

      console.log("data desc", data);

      if (error) {
        console.error("Error al actualizar en Supabase:", error);
      } else {
        console.log("Actualizado correctamente en Supabase:", data);
      }

      setModuloInfo([{ ...moduloInfo[0], descripcion: description }]);
    } catch (error) {
      console.error("Error en la operación Supabase:", error);
    }
    setIsEditingDesc(false);
  };

  return (
    <main>
      <FormAddElement />

      <div className="grid lg:grid-cols-[60%,40%] gap-4 pr-4">
        <TablaModulo className="flex " />
        <div className="bg-white rounded-lg p-5">
          {!isEditingName ? (
            <span className="flex gap-2 items-center">
              <h1 className="text-black text-lg">
                {moduloInfo[0]?.nombre ?? "Cargando nombre..."}
              </h1>
              <RiPencilFill
                onClick={() => setIsEditingName(true)}
                className="text-gray-400"
              />
            </span>
          ) : (
            <>
              <form
                className="flex gap-3 items-center "
                onSubmit={(e) => {
                  handleTitleChange(e, moduleId);
                }}
              >
                <Input
                  name="titulo"
                  defaultValue={moduloInfo[0].nombre}
                ></Input>
                <IconButton type="submit">
                  <RiCheckFill className="bg-primary" />
                </IconButton>
              </form>
            </>
          )}
          {!isEditingDesc ? (
            <span className="flex gap-2 items-center text-md">
              <h2>{moduloInfo[0]?.descripcion ?? "Cargando descripcion..."}</h2>
              <RiPencilFill
                className="text-gray-400"
                onClick={() => setIsEditingDesc(true)}
              />
            </span>
          ) : (
            <>
              <form
                className="flex gap-3 items-center"
                onSubmit={(e) => {
                  handleDescriptionChange(e, moduleId);
                }}
              >
                <Textarea
                  innerClassName="resize"
                  defaultValue={moduloInfo[0].descripcion}
                  name="descripcion"
                ></Textarea>
                <IconButton type="submit">
                  <RiCheckFill className="bg-primary" />
                </IconButton>
              </form>
            </>
          )}

          {/* Mostrar lista de divs según el orden en detalle.orden */}
          {detalleModulo
            .sort((a, b) => a.orden - b.orden)
            .map((detalle) => (
              <div
                className="flex items-center gap-4 border border-gray-300 my-3 rounded-lg p-3"
                key={`${detalle.tipo}-${detalle.id}`}
              >
                <div
                  className="bg-gray-200 p-4 rounded-[50%]"
                  role="img"
                  aria-label="icono-tipo"
                >
                  {obtenerIconoPorTipo(detalle.tipo)}
                </div>
                <div>{detalle.titulo}</div>
              </div>
            ))}
        </div>
      </div>
    </main>
  );
};

export default ModuloPage;
