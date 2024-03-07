import React from "react";
import UserHeader from "../Home/UserHeader";
import { IconButton, Input } from "pol-ui";
import { RiEditFill } from "react-icons/ri";

const MicursoPage = () => {
  return (
    <main className="bg-gray-900 h-screen ">
      <UserHeader />
      <div className="grid grid-cols-2 gap-5 p-5 text-gray-200">
        <section className="info-progress p-5 rounded-lg bg-gray-700 text-center h-[100%]">
          <h1 className="text-primary-400 mb-6">Vender en Amazon desde cero</h1>

          <div className="grid grid-cols-2 grid-rows-2 gap-4 m-3">
            <div className="bg-gray-500 rounded-lg p-4">
              <h3>AHORA MISMO EN:</h3>
              <div className="">Módulo 2: Introducción al mercado</div>
            </div>
            <div className="bg-gray-500 rounded-lg p-4 flex flex-col items-center">
              <h3>MI PROGRESO</h3>
              <img
                width="60%"
                src="/public/images/progress-circle.png"
                alt=""
              />
            </div>
            <div className="bg-gray-500 rounded-lg p-4 ">
              <h3>PREGUNTA DIARIA</h3>
              <div>
                <h4 className="text-gray-300">07/03/2024</h4>
                <div className="p-4 my-4 rounded-md bg-primary-500 ">
                  <h5 className="text-primary-900">
                    Quin és el CPC mínim per llançar publicitat al mercat Xinès?
                  </h5>
                  <Input
                    className="bg-primary-700 mt-3 "
                    type="number"
                    placeholder="Indica la resposta"
                  ></Input>
                </div>
              </div>
            </div>
            <div className="bg-gray-500 rounded-lg p-4 ">
              <h3>MIS LOGROS</h3>
              <div className="mt-14 flex flex-col gap-4 justify-center">
                <div className="flex justify-center gap-3">
                  <img
                    width="10%"
                    src="/public/images/dolar.png"
                    alt="icon-moneda"
                  />
                  <h4>50 monedas</h4>
                </div>
                <div className="flex justify-center gap-3">
                  <img
                    width="10%"
                    src="/public/images/trofeo.png"
                    alt="icon-trophy"
                  />
                  <h4>50 monedas</h4>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="info-progress rounded-lg bg-gray-700 ">
          <div className="fix-header bg-gray-500 p-4 rounded">
            <h2>
              Módulo 1 <br />
              Introducción al mercado
            </h2>
          </div>
          <div class="grid grid-cols-5 h-[100%] px-5">
            <div class="col-span-1 bg-gray-900 flex items-center gap-6 flex-col">
              <div className="bg-gray-700 h-[40px] w-[10px]"></div>
              <div className="bg-gray-700 h-[40px] w-[10px]"></div>
              <div className="bg-gray-700 h-[40px] w-[10px]"></div>
              <div className="bg-gray-700 h-[40px] w-[10px]"></div>
              <div className="bg-gray-700 h-[40px] w-[10px]"></div>
              <div className="bg-gray-700 h-[40px] w-[10px]"></div>
              <div className="bg-gray-700 h-[40px] w-[10px]"></div>
              <div className="bg-gray-700 h-[40px] w-[10px]"></div>
              <div className="bg-gray-700 h-[40px] w-[10px]"></div>
              <div className="bg-gray-700 h-[40px] w-[10px]"></div>
            </div>
            <div class="col-span-4 ">
              <ul>
                <li className="m-2 p-3 rounded-lg flex  items-center gap-4 text-primary-200 border border-black my-3  ">
                  <IconButton className="bg-gray-600">
                    <RiEditFill></RiEditFill>
                  </IconButton>
                  Actividad 2: Texto por defecto
                </li>
                <li className="m-2 p-3 rounded-lg flex  items-center gap-4 text-primary-200 border border-black my-3 ">
                  <IconButton className="bg-gray-600">
                    <RiEditFill></RiEditFill>
                  </IconButton>
                  Actividad 2: Texto por defecto
                </li>
                <li className="m-2 p-3 rounded-lg flex  items-center gap-4 text-primary-200 border border-black my-3 ">
                  <IconButton className="bg-gray-600">
                    <RiEditFill></RiEditFill>
                  </IconButton>
                  Actividad 2: Texto por defecto
                </li>
                <li className="m-2 p-3 rounded-lg flex  items-center gap-4 text-primary-200 border border-black my-3 ">
                  <IconButton className="bg-gray-600">
                    <RiEditFill></RiEditFill>
                  </IconButton>
                  Actividad 2: Texto por defecto
                </li>
                <li className="m-2 p-3 rounded-lg flex  items-center gap-4 text-primary-200 border border-black my-3 ">
                  <IconButton className="bg-gray-600">
                    <RiEditFill></RiEditFill>
                  </IconButton>
                  Actividad 2: Texto por defecto
                </li>
                <li className="m-2 p-3 rounded-lg flex  items-center gap-4 text-primary-200 border border-black my-3 ">
                  <IconButton className="bg-gray-600">
                    <RiEditFill></RiEditFill>
                  </IconButton>
                  Actividad 2: Texto por defecto
                </li>
                <li className="m-2 p-3 rounded-lg flex  items-center gap-4 text-primary-200 border border-black my-3 ">
                  <IconButton className="bg-gray-600">
                    <RiEditFill></RiEditFill>
                  </IconButton>
                  Actividad 2: Texto por defecto
                </li>
                <li className="m-2 p-3 rounded-lg flex  items-center gap-4 text-primary-200 border border-black my-3 ">
                  <IconButton className="bg-gray-600">
                    <RiEditFill></RiEditFill>
                  </IconButton>
                  Actividad 2: Texto por defecto
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default MicursoPage;
