import React, { useState, useContext, useEffect } from "react";
import { Toaster, toast, Button } from "pol-ui";
import { supabase } from "../../supabase/supabaseClient";
import { UserContext } from "../../UserContext";
import { useNavigate } from "react-router-dom";

const CardsAllCursos = ({ cursos }) => {
  return (
    <div className="dark:bg-gray-950 py-12 lg:py-24 w-full">
      <div className="px-4 space-y-12 lg:space-y-16">
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
              instructor={curso.instructor}
              precio={curso.precio}
              duracion={curso.duracion}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const CardCurso = ({
  nombre,
  descripcion,
  id,
  imagen,
  instructor,
  precio,
  duracion,
}) => {
  const { user } = useContext(UserContext);
  const [userRequested, setUserRequested] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserRequest = async () => {
      try {
        const { data, error } = await supabase
          .from("curso_usuario")
          .select("*")
          .eq("curso_id", id)
          .eq("usuario_id", user.id);
        if (error) {
          console.error("Error al obtener datos:", error.message);
        } else {
          if (data && data.length > 0) {
            // Si se encontró una solicitud para este curso y usuario, actualiza el estado
            setUserRequested(data[0].solicitud);
          }
        }
      } catch (error) {
        console.error("Error al intentar obtener datos:", error.message);
      }
    };

    fetchUserRequest(); // Llamar a la función de recuperación de datos al cargar el componente
  }, [id]); // Ejecutar el efecto cuando id cambie

  const handleSolicitarCurso = async () => {
    try {
      // Verificar si el usuario está autenticado
      if (!user) {
        // Si no hay usuario autenticado, redirigir al usuario a la página de inicio de sesión
        navigate("/login");
        return;
      }
      // Verificar si ya existe una solicitud para este usuario y curso
      const { data } = await supabase
        .from("curso_usuario")
        .select("*")
        .eq("curso_id", id)
        .eq("usuario_id", user.id)
        .single();

      if (data) {
        console.log("Ya existe una solicitud para este usuario y curso.");
        // Mostrar toast de error si ya existe una solicitud
        toast({
          title: "Ya existe una solicitud para este usuario y curso.",
          type: "error",
        });
      } else {
        // Insertar la solicitud en la base de datos
        const { error: insertError } = await supabase
          .from("curso_usuario")
          .insert([{ curso_id: id, usuario_id: user.id, solicitud: false }]);

        if (insertError) {
          console.error("Error al insertar datos:", insertError.message);
          // Mostrar toast de error si la inserción falló
          toast({
            title: "Error al insertar curso. ",
            type: "error",
          });
        } else {
          console.log("Solicitud insertada correctamente.");
          // Mostrar toast de éxito si la inserción fue exitosa
          toast({ title: "Solcitud enviada correctamente", type: "success" });

          // Actualizar el estado para reflejar que el usuario ha solicitado el curso
          setUserRequested(true);
        }
      }
    } catch (error) {
      console.error("Error:", error.message);
      // Mostrar toast de error si ocurre un error inesperado
      toast({
        title: "La solicitud ya existe",
        message: "Ocurrió un error inesperado.",
        type: "error",
      });
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
            <p>{instructor}</p>
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-semibold">Duración</h3>
            <p>{duracion}</p>
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-semibold">Precio</h3>
            <p>{precio}</p>
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
          onClick={handleSolicitarCurso}
          className={`text-white ${
            userRequested !== null
              ? "bg-[#ff9900] "
              : "bg-[#232f3e] hover:bg-[#ff9900]"
          }`}
        >
          {userRequested !== null ? "Solicitado" : "Solicitar Curso"}
        </Button>
      </div>
      <Toaster />
    </div>
  );
};

export default CardsAllCursos;
