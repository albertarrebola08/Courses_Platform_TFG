import { useState, useContext } from "react";
import { supabase } from "../../supabase/supabaseClient";
import { Input, Button, Textarea } from "pol-ui";
import { RiAddFill, RiCloseFill, RiThumbUpFill } from "react-icons/ri";
import { UserContext } from "../../UserContext";

const CursoForm = () => {
  const { user } = useContext(UserContext);

  const [cursoData, setCursoData] = useState({
    nombre: "",
    descripcion: "",
    imagen: "",
    instructor: "",
    precio: "",
    duracion: "",
  });
  const [cursos, setCursos] = useState([]);
  const [addCourseSelected, setAddCourseSelected] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCursoData({ ...cursoData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Insertar el curso en la tabla "curso"
      const { data: insertedCursoData, error: cursoError } = await supabase
        .from("curso")
        .insert([cursoData])
        .select();

      if (cursoError) {
        throw cursoError;
      }

      // Obtener el ID del curso recién creado
      const cursoId = insertedCursoData[0].id;

      // Insertar un registro en la tabla "curso_usuario" con el ID del curso y el ID del usuario actual
      const { data: cursoUsuarioData, error: cursoUsuarioError } =
        await supabase
          .from("curso_usuario")
          .insert([
            { curso_id: cursoId, usuario_id: user.id, solicitud: true },
          ]);

      if (cursoUsuarioError) {
        throw cursoUsuarioError;
      }

      // Obtener la lista actualizada de cursos después de la inserción
      const { data: dataCursos, error: fetchError } = await supabase.rpc(
        "obtener_cursos_usuarios",
        {
          userid: user.id,
        }
      );

      if (fetchError) {
        throw fetchError;
      }

      // Actualizar el estado de cursos después de la inserción
      setCursos(dataCursos);

      // Mostrar mensaje de éxito durante 3 segundos
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);

      // Vaciar el formulario después de enviarlo
      setCursoData({
        nombre: "",
        descripcion: "",
        duracion: "",
        precio: "",
        instructor: "",
      });
    } catch (error) {
      console.error("Error al crear el curso:", error.message);
    }
  };

  return (
    <div className="rounded-xl">
      {showSuccessMessage && (
        <div
          variant="faded"
          className="absolute top-2 right-2 bg-green-800 text-white py-2 px-4 rounded"
        >
          <RiThumbUpFill className="mr-2 text-white" />
          Curso creado con éxito
        </div>
      )}
      <Button
        className=""
        onClick={() => setAddCourseSelected(!addCourseSelected)}
      >
        Crear curso
        {addCourseSelected ? (
          <RiCloseFill className="text-red-800" />
        ) : (
          <RiAddFill />
        )}
      </Button>
      <form
        onSubmit={handleSubmit}
        className={`mt-4 flex flex-col gap-4  ${
          addCourseSelected ? "block" : "hidden"
        }`}
      >
        <Input
          name="nombre"
          type="text"
          label="Nombre del curso"
          value={cursoData.nombre}
          onChange={handleInputChange}
          required
          className=""
        />
        <Textarea
          label="Introduce la descripción"
          name="descripcion"
          value={cursoData.descripcion}
          onChange={handleInputChange}
        />
        <Input
          name="instructor"
          type="text"
          label="Nombre del instructor"
          value={cursoData.instructor}
          onChange={handleInputChange}
          required
          className=""
        />
        <Input
          name="duracion"
          type="text"
          label="Duración del curso"
          value={cursoData.duracion}
          onChange={handleInputChange}
          required
          className=""
        />
        <Input
          name="precio"
          type="text"
          label="Precio"
          value={cursoData.precio}
          onChange={handleInputChange}
          required
          className=""
        />
        <Button
          className="bg-[#232f3e] w-fit px-8 mt-4 hover:shadow-xl"
          type="submit"
        >
          Crear curso
        </Button>
      </form>
    </div>
  );
};

export default CursoForm;
