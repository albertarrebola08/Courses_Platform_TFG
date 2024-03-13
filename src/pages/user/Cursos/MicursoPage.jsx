import React, { useContext, useEffect, useState } from "react";
import UserHeader from "../Home/UserHeader";
import { IconButton, Input } from "pol-ui";
import { RiBookOpenFill, RiFileEditFill, RiListCheck3, RiVideoFill } from "react-icons/ri";
import { UserContext } from "../../../UserContext";
import { supabase } from "../../../supabase/supabaseClient";
import { useParams } from "react-router-dom";
import { MdBackHand } from "react-icons/md";
import { LuDices } from "react-icons/lu";

const MicursoPage = () => {
  const { user, perfilInfo } = useContext(UserContext);
  const [detalleCurso, setDetalleCurso] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [courseElements, setCourseElements] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener información del curso del usuario
        const { data: cursoData, error: cursoError } = await supabase.rpc(
          "obtener_cursos_usuario",
          {
            userid: user.id,
          }
        );

        if (cursoError) {
          throw cursoError;
        } else {
          // Filtrar el curso específico por su ID
          const cursoConcreto = cursoData.filter(
            (curso) => curso.curso_id === Number(id)
          );
          setDetalleCurso(cursoConcreto);

          // Obtener elementos del curso
          const { data: elementosData, error: elementosError } =
            await supabase.rpc("obtener_elementos_curso", {
              curso_id_param: 51,
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
  }, [id, user.id]);

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
              <img width="60%" src="/images/progress-circle.png" alt="" />
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
          </div>{" "}
        </section>
        <section className="info-progress rounded-lg bg-[#f8f8f8] shadow-lg">
          <div className="fix-header rounded-xl shadow-md p-4 ">
            <h2 className="text-lg font-bold">
              {detalleCurso && detalleCurso[0].nombre}
            </h2>
          </div>
          <div className="grid grid-cols-5 px-5 z-10 overflow-y-auto max-h-[70vh]">
            <div className="col-span-1 bg-gray-900 flex items-center gap-6 flex-col">
              {/* Aquí el cuadrado */}
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
                      {modulo.elementos.map((elemento, index) => (
                        <li
                          key={index}
                          id={`item-${index}`}
                          className="mx-3 my-2 p-4 rounded-lg flex items-center gap-4 text-[#232f3e] border border-gray-300 shadow-md cursor-pointer"
                        >
                          <IconButton className="bg-gray-300">
                            {elemento.tipo === "video" && <RiVideoFill />}
                            {elemento.tipo === "acciona" && <MdBackHand />}
                            {elemento.tipo === "examen" && <RiFileEditFill />}
                            {elemento.tipo === "quiz" && <RiListCheck3 />}
                            {elemento.tipo === "numeral" && <LuDices />}
                            {elemento.tipo === "material" && <RiBookOpenFill />}
                          </IconButton>
                          <span>{elemento.titulo}</span>
                        </li>
                      ))}
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
