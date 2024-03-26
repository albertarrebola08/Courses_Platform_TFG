import React, { useContext, useEffect, useState } from "react";
import { IconButton, Button } from "pol-ui";
import {
  RiVideoFill,
  RiFileEditFill,
  RiListCheck3,
  RiBookOpenFill,
  RiSearch2Line,
  RiMiniProgramFill,
  RiCrossFill,
  RiCheckFill,
  RiCloseFill,
  RiCheckboxBlankCircleLine,
  RiCursorLine,
} from "react-icons/ri";
import { MdBackHand, MdLock } from "react-icons/md";
import { LuDices } from "react-icons/lu";
import { UserContext } from "../../../UserContext";
import { supabase } from "../../../supabase/supabaseClient";

const ElementosCursoPage = ({
  courseElements,
  usuarioEnCursoData,
  handleElementClick,
  handleItemCompleted,
  detalleCurso,
  id,
}) => {
  const { user } = useContext(UserContext);
  const [examenEstados, setExamenEstados] = useState({});
  useEffect(() => {
    const fetchExamenEstados = async () => {
      const estados = {};

      for (const modulo of courseElements) {
        for (const elemento of modulo.elementos) {
          if (elemento.tipo === "examen") {
            try {
              const { data, error } = await supabase
                .from("examen_usuario")
                .select("*")
                .eq("examen_id", elemento.id)
                .eq("usuario_id", user.id);

              if (error) {
                console.error(
                  "Error al obtener el estado del examen:",
                  error.message
                );
                estados[elemento.id] = { estado: "error", nota: null };
              } else {
                if (data && data.length > 0) {
                  const intento = data[0].intento;
                  if (intento >= 2) {
                    estados[elemento.id] = {
                      estado: data[0].nota >= 5 ? "aprobado" : "suspendido",
                      nota: data[0].nota,
                    };
                  } else {
                    estados[elemento.id] = {
                      estado: data[0].nota >= 5 ? "aprobado" : "suspendido",
                      nota: data[0].nota,
                    };
                  }
                } else {
                  estados[elemento.id] = { estado: "examen_vacio", nota: null };
                }
              }
            } catch (error) {
              console.error(
                "Error al consultar el estado del examen:",
                error.message
              );
              estados[elemento.id] = { estado: "error", nota: null };
            }
          }
        }
      }

      setExamenEstados(estados);
    };

    fetchExamenEstados();
  }, [courseElements]);
  return (
    <section className="info-progress rounded-lg bg-[#f8f8f8] shadow-lg">
      <div className="fix-header rounded-xl shadow-md p-4 ">
        <div className="flex gap-2 flex-col">
          <h2 className="text-lg font-bold">
            {detalleCurso && detalleCurso[0].nombre}
          </h2>
          <a
            href={`/mis-cursos/${id}`}
            className="flex items-center gap-1 w-fit hover:underline hover:text-gray-500"
          >
            Veure progrés
          </a>
        </div>
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
                      >
                        <div className="flex items-center gap-4">
                          <IconButton
                            onClick={() =>
                              handleElementClick(elemento.id, elemento.tipo)
                            }
                            className="bg-gray-300"
                          >
                            {elemento.tipo === "video" && <RiVideoFill />}
                            {elemento.tipo === "acciona" && <MdBackHand />}
                            {elemento.tipo === "examen" && <RiFileEditFill />}
                            {elemento.tipo === "quiz" && <RiListCheck3 />}
                            {elemento.tipo === "numeral" && <LuDices />}
                            {elemento.tipo === "material" && <RiBookOpenFill />}
                          </IconButton>
                          <span className="flex-shrink-0">
                            {elemento.titulo}
                          </span>
                        </div>
                        <Button
                          onClick={() => handleItemCompleted(elemento.id)}
                          className={`${
                            elementoCompletado
                              ? "bg-success-500"
                              : "bg-[#232f3e]"
                          } text-white`}
                        >
                          {elemento.tipo === "examen" ? (
                            examenEstados[elemento.id]?.estado === "aprobado" ||
                            examenEstados[elemento.id]?.estado ===
                              "suspendido" ||
                            examenEstados[elemento.id]?.estado ===
                              "max_intentos" ? (
                              <>
                                {examenEstados[elemento.id].estado ===
                                "aprobado"
                                  ? "Aprobado"
                                  : "Suspendido"}
                                - Nota: {examenEstados[elemento.id].nota}
                                {examenEstados[elemento.id]?.estado ===
                                  "max_intentos" && <MdLock />}
                              </>
                            ) : (
                              <span className="flex gap-2 items-center">
                                <RiCursorLine />
                                Marcar com a finalitzat
                              </span>
                            )
                          ) : (
                            <>
                              {elementoCompletado ? (
                                <RiCheckFill />
                              ) : (
                                <span className="flex gap-2 items-center">
                                  <RiCursorLine />
                                  Marcar com a finalitzat
                                </span>
                              )}
                            </>
                          )}
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
  );
};

export default ElementosCursoPage;
