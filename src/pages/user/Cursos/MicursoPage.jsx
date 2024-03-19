import React, { useContext, useEffect, useState } from "react";
import UserHeader from "../Home/UserHeader";
import { Button, IconButton, Input } from "pol-ui";

import { UserContext } from "../../../UserContext";
import { GlobalContext } from "../../../GlobalContext";
import { supabase } from "../../../supabase/supabaseClient";
import { useNavigate, useParams } from "react-router-dom";

import ElementosCursoPage from "./ElementosCursoPage";
import UserVideo from "../UserVideo";
import UserAcciona from "../UserAcciona";
import UserExamen from "../UserExamen";
import UserMaterial from "../UserMaterial";
import UserQuiz from "../UserQuiz";
import UserNumeral from "../UserNumeral";
import { RiArrowLeftDoubleFill, RiArrowRightDoubleFill } from "react-icons/ri";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Flat } from "@alptugidin/react-circular-progress-bar";

const MicursoPage = () => {
  const { user } = useContext(UserContext);
  const { progressPercent, setProgressPercent } = useContext(GlobalContext);

  const [detalleCurso, setDetalleCurso] = useState(null);
  const [courseElements, setCourseElements] = useState([]);
  const { id, tipo, elementoId } = useParams();
  const [usuarioEnCursoData, setUsuarioEnCursoData] = useState([]);
  const navigate = useNavigate();

  const [elementosVisible, setElementosVisible] = useState(true);
  const toggleElementosVisibility = () => {
    setElementosVisible(!elementosVisible);
  };
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
  const renderContent = () => {
    // Si la URL contiene tipo y elementoId, renderiza el componente correspondiente al tipo
    if (tipo && elementoId) {
      switch (tipo) {
        case "video":
          return <UserVideo elementoId={elementoId} />;
        case "acciona":
          return <UserAcciona elementoId={elementoId} />;
        case "examen":
          return <UserExamen elementoId={elementoId} />;
        case "material":
          return <UserMaterial elementoId={elementoId} />;
        case "quiz":
          return <UserQuiz elementoId={elementoId} />;
        case "numeral":
          return <UserNumeral elementoId={elementoId} />;
        // Agrega más casos según sea necesario para otros tipos de elementos
        default:
          return null;
      }
    }
    // Si no hay tipo y elementoId en la URL, muestra el dashboard del curso
    return (
      <section className="info-progress p-5 rounded-lg bg-[#f8f8f8] text-center shadow-lg max-h-[85vh]">
        <h1 className="mb-6">{detalleCurso && detalleCurso[0].nombre}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 grid-rows-2 gap-4 m-3 text-white">
          <div className="bg-[#232f3e] rounded-lg p-4">
            <h3>AHORA MISMO EN:</h3>
            <div className="">Módulo 1</div>
          </div>
          <div className="bg-[#232f3e] rounded-lg p-4 flex flex-col items-center">
            <h3>MI PROGRESO</h3>

            <div className="w-[50%] text-white p-4 ">
              <Flat
                progress={progressPercent}
                showMiniCircle={false}
                sx={{
                  strokeColor: "#ff9900",
                  barWidth: 8,
                  valueColor: "#ff9900",
                  valueFamily: "Helvetica",
                  textColor: "#d8cfcf",
                }}
              />
            </div>
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
    );
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
    <main className="bg-white">
      <UserHeader />
      <div
        className={`grid grid-cols-1 lg:grid-cols-2 gap-5 p-5 text-gray-900 h-full `}
      >
        <div className="p-8 bg-primary-50 shadow-lg rounded-lg">
          {renderContent()}
        </div>

        <div className="relative">
          <div className="absolute top-0 right-0 mt-4 mr-4">
            <Button
              onClick={toggleElementosVisibility}
              className="4 rounded-lg"
            >
              {elementosVisible ? (
                <RiArrowRightDoubleFill />
              ) : (
                <RiArrowLeftDoubleFill />
              )}
            </Button>
          </div>
          {elementosVisible && (
            <ElementosCursoPage
              courseElements={courseElements}
              usuarioEnCursoData={usuarioEnCursoData}
              handleElementClick={handleElementClick}
              handleItemCompleted={handleItemCompleted}
              detalleCurso={detalleCurso}
              id={id}
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default MicursoPage;
