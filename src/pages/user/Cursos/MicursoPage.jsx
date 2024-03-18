import React, { useContext, useEffect, useState } from "react";
import UserHeader from "../Home/UserHeader";
import { Button, IconButton, Input } from "pol-ui";
import {
  RiBookOpenFill,
  RiFileEditFill,
  RiListCheck3,
  RiVideoFill,
} from "react-icons/ri";
import { UserContext } from "../../../UserContext";
import { GlobalContext } from "../../../GlobalContext";
import { supabase } from "../../../supabase/supabaseClient";
import { useNavigate, useParams } from "react-router-dom";
import { MdBackHand } from "react-icons/md";
import { LuDices } from "react-icons/lu";

const MicursoPage = () => {
  const { user } = useContext(UserContext);
  const { progressPercent, setProgressPercent } = useContext(GlobalContext);

  const [detalleCurso, setDetalleCurso] = useState(null);
  const [courseElements, setCourseElements] = useState([]);
  const { id, tipo, elementoId } = useParams();
  const [usuarioEnCursoData, setUsuarioEnCursoData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: cursoData, error: cursoError } = await supabase.rpc(
          "obtener_cursos_usuario",
          {
            userid: user.id,
          }
        );

        if (cursoError) {
          throw cursoError;
        } else {
          const cursoConcreto = cursoData.filter(
            (curso) => curso.curso_id === Number(id)
          );
          setDetalleCurso(cursoConcreto);
          progress();
          fetchUsuarioCursoData();
          const { data: elementosData, error: elementosError } =
            await supabase.rpc("obtener_elementos_curso", {
              curso_id_param: Number(id),
            });

          if (elementosError) {
            throw elementosError;
          } else {
            setCourseElements(elementosData);
          }
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error.message);
      }
    };

    fetchData();
  }, []);

  // Renderiza el componente correspondiente según el tipo de elemento
  const renderElementComponent = () => {
    switch (tipo) {
      case "video":
        return <UserVideoPage elementoId={elementoId} />;
      case "material":
        return <UserAccionaPage elementoId={elementoId} />;
      // Agrega más casos según sea necesario para otros tipos de elementos
      default:
        return null;
    }
  };

  const handleElementClick = async (elementId, tipo) => {
    console.log(user.id, elementId, tipo);
    navigate(`/mis-cursos/${id}/${tipo}/${elementId}`);
  };

  const handleItemCompleted = async (elementoId) => {
    try {
      const { data: updatedRegistro, error } = await supabase
        .from("usuario_en_curso")
        .update({ estado: true })
        .eq("usuario_id", user.id)
        .eq("curso_id", id)
        .eq("elemento_id", elementoId);

      if (error) {
        throw error;
      }

      // Actualizar el estado local después de la actualización en la base de datos
      const updatedData = usuarioEnCursoData.map((item) =>
        item.elemento_id === elementoId ? { ...item, estado: true } : item
      );
      setUsuarioEnCursoData(updatedData);
      progress();
      console.log("progreso function llamada");
    } catch (error) {
      console.error(
        "Error al marcar el elemento como completado:",
        error.message
      );
    }
  };

  const fetchUsuarioCursoData = async () => {
    try {
      const { data: usuarioEnCursoData, error } = await supabase
        .from("usuario_en_curso")
        .select("*")
        .eq("usuario_id", user.id)
        .eq("curso_id", id);

      if (error) {
        throw error;
      }
      setUsuarioEnCursoData(usuarioEnCursoData);
    } catch (error) {
      console.error(
        "Error al obtener datos de usuario_en_curso:",
        error.message
      );
      throw error;
    }
  };

  const progress = async () => {
    try {
      let { data, error } = await supabase.rpc("calcula_progreso_curso", {
        cursoid: id,
        usuarioid: user.id,
      });
      if (error) {
        console.log(error);
      } else {
        const porcentajeProgreso = data[0].progreso;
        setProgressPercent(porcentajeProgreso);
      }
    } catch {
      console.log("error con supabase ");
    }
  };

  return (
    <main className="bg-white ">
      <UserHeader />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 p-5 text-gray-900 h-full">
        <section className="info-progress p-5 rounded-lg bg-[#f8f8f8] text-center shadow-lg max-h-[85vh]">
          <h1 className="mb-6">{detalleCurso && detalleCurso[0].nombre}</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 grid-rows-2 gap-4 m-3 text-white">
            <div className="bg-[#232f3e] rounded-lg p-4">
              <h3>AHORA MISMO EN:</h3>
              <div className="">Módulo 2: Introducción al mercado</div>
            </div>
            <div className="bg-[#232f3e] rounded-lg p-4 flex flex-col items-center">
              <h3>MI PROGRESO</h3>
              {/* <img width="60%" src="/images/progress-circle.png" alt="" /> */}
              <div className="w-34 h-34 text-white">{progressPercent}%</div>
            </div>
            <div className="bg-[#232f3e] rounded-lg p-4">
              <h3>PREGUNTA DIARIA</h3>
              <div>
                <h4 className="text-gray-300">07/03/2024</h4>
                <div className="p-4 my-4 rounded-md bg-[#f8f8f8]">
                  <h5 className="text-gray-900">
                    Quin és el CPC mínim per llançar publicitat al mercat Xinès?
                  </h5>
                  <Input
                    className="bg-[#232f3e] mt-3"
                    type="number"
                    placeholder="Indica la resposta"
                  />
                </div>
              </div>
            </div>
            <div className="bg-[#232f3e] rounded-lg p-4">
              <h3>MIS LOGROS</h3>
              <div className="mt-14 flex flex-col gap-4 justify-center">
                <div className="flex justify-center gap-3">
                  <img width="10%" src="/images/dolar.png" alt="icon-moneda" />
                  <h4>50 monedas</h4>
                </div>
                <div className="flex justify-center gap-3">
                  <img width="10%" src="/images/trofeo.png" alt="icon-trophy" />
                  <h4>50 monedas</h4>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="info-progress rounded-lg bg-[#f8f8f8] shadow-lg">
          <div className="fix-header rounded-xl shadow-md p-4 ">
            <h2 className="text-lg font-bold">
              {detalleCurso && detalleCurso[0].nombre}
            </h2>
          </div>
          <div className="grid grid-cols-5 px-5 z-10 overflow-y-auto max-h-[70vh]">
            <div className="col-span-1 bg-gray-900 flex items-center gap-6 flex-col">
              <img
                className={`selected-square w-[50px] h-[100px]`}
                src="/images/furgo_rispot.png"
              />
              {Array.from({ length: 21 }, (_, i) => (
                <div key={i} className="bg-gray-700 h-[40px] w-[10px]"></div>
              ))}
            </div>
            <div className="col-span-4">
              <ul>
                {courseElements.map((modulo, index) => (
                  <div key={index} className="">
                    <h2 className="text-xl text-white sticky top-0 z-10 bg-[#ff9900] p-4 ">
                      {modulo.nombre_modulo}
                    </h2>
                    <ul>
                      {modulo.elementos.map((elemento, index) => {
                        const usuarioEnCursoElemento = usuarioEnCursoData.find(
                          (el) =>
                            el.elemento_id === elemento.id &&
                            el.usuario_id === user.id &&
                            el.curso_id === Number(id)
                        );

                        const elementoCompletado = usuarioEnCursoElemento
                          ? usuarioEnCursoElemento.estado
                          : false;

                        return (
                          <li
                            key={index}
                            id={`item-${index}`}
                            className="mx-3 my-2 p-4 rounded-lg flex items-center justify-between gap-4 text-[#232f3e] border border-gray-300 shadow-md "
                            onClick={() =>
                              handleElementClick(elemento.id, elemento.tipo)
                            }
                          >
                            <div className="flex items-center gap-4">
                              <IconButton className="bg-gray-300">
                                {elemento.tipo === "video" && <RiVideoFill />}
                                {elemento.tipo === "acciona" && <MdBackHand />}
                                {elemento.tipo === "examen" && (
                                  <RiFileEditFill />
                                )}
                                {elemento.tipo === "quiz" && <RiListCheck3 />}
                                {elemento.tipo === "numeral" && <LuDices />}
                                {elemento.tipo === "material" && (
                                  <RiBookOpenFill />
                                )}
                              </IconButton>
                              <span className="flex-shrink-0">
                                {elemento.titulo}
                              </span>
                            </div>
                            <Button
                              onClick={() => handleItemCompleted(elemento.id)}
                              className={`${
                                elementoCompletado
                                  ? "bg-green-500"
                                  : "bg-blue-500"
                              } text-white`}
                            >
                              {elementoCompletado
                                ? "Completado"
                                : "Marcar como terminado"}
                            </Button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default MicursoPage;
