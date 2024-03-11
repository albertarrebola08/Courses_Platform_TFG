import React, { useContext, useEffect, useState } from "react";
import UserHeader from "../Home/UserHeader";
import { IconButton, Input } from "pol-ui";
import { RiVideoFill } from "react-icons/ri";
import { UserContext } from "../../../UserContext";
import { supabase } from "../../../supabase/supabaseClient";
import { useParams } from "react-router-dom";

const MicursoPage = () => {
  const { user, perfilInfo } = useContext(UserContext);
  console.log(user, perfilInfo);
  const [detalleCurso, setDetalleCurso] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    const infoCurso = async () => {
      try {
        const { data, error } = await supabase.rpc("obtener_cursos_usuario", {
          userid: user.id,
        });

        if (error) {
          throw error;
        } else {
          console.log(Number(id));
          console.log(data);
          const cursoConcreto = data.filter(
            (curso) => curso.curso_id === Number(id)
          );
          console.log(cursoConcreto);
          setDetalleCurso(cursoConcreto);
        }
      } catch (error) {
        console.error("Error al obtener cursos:", error.message);
      }
    };

    infoCurso();
  }, []);

  return (
    <main className="bg-white h-screen">
      <UserHeader />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 p-5 text-gray-900 h-full">
        <section className="info-progress p-5 rounded-lg bg-[#ff9900] text-center">
          <h1 className="mb-6">{}</h1>
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
                <div className="p-4 my-4 rounded-md bg-[#f99b3d]">
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
        <section className="info-progress rounded-lg bg-[#ff9900] overflow-auto">
          <div className="fix-header rounded-xl shadow-md shadow-[#f99b3d] sticky top-0 z-20 p-4 bg-[#f99b3d]">
            <h2 className="text-lg font-bold">
              Módulo 1 <br />
              Introducción al mercado
            </h2>
          </div>
          <div className="grid grid-cols-5 px-5">
            <div className="col-span-1 bg-gray-900 flex items-center gap-6 flex-col">
              {Array.from({ length: 21 }, (_, i) => (
                <div key={i} className="bg-gray-700 h-[40px] w-[10px]"></div>
              ))}
            </div>
            <div className="col-span-4">
              <ul>
                {Array.from({ length: 21 }, (_, i) => (
                  <li
                    key={i}
                    className="m-2 p-3 rounded-lg flex items-center gap-4 text-primary-200 border border-black my-3"
                  >
                    <IconButton className="bg-gray-600">
                      <RiVideoFill />
                    </IconButton>
                    Actividad {i + 1}: Texto por defecto
                  </li>
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
