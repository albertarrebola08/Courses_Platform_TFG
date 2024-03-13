import { useState, useContext } from "react";
import { Button } from "pol-ui";
import { supabase } from "../../supabase/supabaseClient";
import { UserContext } from "../../UserContext";

const CardsAllCursos = ({ cursos }) => {
  return (
    <div className=" dark:bg-gray-950 py-12 lg:py-24 w-full">
      <div className=" px-4 space-y-12 lg:space-y-16">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl">
            Nuestros cursos
          </h1>
          <p className="text-gray-500 md:text-xl dark:text-gray-400">
            Browse our comprehensive course offerings designed to elevate your
            skills and knowledge.
          </p>
        </div>
        <div className="grid gap-10 lg:grid-cols-2 xl:gap-16">
          {cursos.map((curso) => (
            <CardCurso
              key={curso.id}
              nombre={curso.nombre}
              descripcion={curso.descripcion}
              id={curso.id}
              imagen={curso.imagen}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const CardCurso = ({ nombre, descripcion, id, imagen }) => {
  const { user } = useContext(UserContext);
  const handleSolicitarCurso = async (id) => {
    try {
      const { data, error } = await supabase
        .from("curso_usuario")
        .insert([{ curso_id: id, usuario_id: user.id, solicitud: false }])
        .select();

      if (error) {
        console.error("Error al insertar datos:", error.message);
      } else {
        console.log("Datos insertados correctamente:", data);
      }
    } catch (error) {
      console.error("Error al intentar insertar datos:", error.message);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 card-curso bg-gray-200 p-8 rounded-lg">
      <div className="flex flex-col gap-2">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">{nombre}</h2>
          <p className="text-gray-500 dark:text-gray-400">{descripcion}</p>
        </div>
        <div className="grid gap-4">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold">Instructor</h3>
            <p>Pau Cardús</p>
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-semibold">Duración</h3>
            <p>30h</p>
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-semibold">Precio</h3>
            <p>600 €</p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <img
          alt="Course Image"
          className="rounded-lg object-cover"
          height="250"
          src={imagen}
          width="400"
        />
      </div>
      <div className="flex flex-col justify-end">
        <Button
          className="text-white bg-[#232f3e] hover:bg-[#ff9900]"
          onClick={() => handleSolicitarCurso(id)}
        >
          Solicitar
        </Button>
      </div>
    </div>
  );
};

export default CardsAllCursos;
