import { Button } from "pol-ui";
import React from "react";

const Inicio = () => {
  return (
    <section className="w-full py-12 ">
      <img
        src="https://rispot.com/wp-content/uploads/2023/12/cropped-logo_possible3.png"
        alt=""
        width="20%"
        className="mx-[9.5%]"
      />
      <div className="flex justify-center items-center gap-6 mt-[5%]">
        {/* Mensaje de bienvenida */}
        <div className="w-1/2 flex flex-col justify-center gap-6 p-24 ">
          <div className="space-y-8 ">
            <h1 className="text-7xl font-bold">
              Plataforma para cursos <br /> interactivos
            </h1>
            <p className="text-gray-500 text-xl">
              Aquí aprenderás lo fundamental sobre el negocio de Amazon de una
              forma única en el mercado
            </p>
          </div>
          <div className="flex gap-2 ">
            <Button className="px-8" href="/home" outline>
              Explora Cursos
            </Button>
            <Button className=" px-8 rounded-md  shadow gap-1  " href="/login">
              Iniciar sesión
            </Button>
          </div>
        </div>
        {/* Imagen */}
        <img
          alt="Amazon Logo"
          className="w-[40%] object-cover rounded-lg"
          src="https://www.renderhub.com/alpha3dst/amazon-cardboard-box/amazon-cardboard-box-04.jpg"
        />
      </div>
    </section>
  );
};

export default Inicio;
