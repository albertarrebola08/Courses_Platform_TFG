import { useState, useContext } from "react";
import { supabase } from "../../supabase/supabaseClient";
import { Input, Button, Textarea } from "@nextui-org/react";
import { RiAddFill, RiCloseFill, RiThumbUpFill } from "react-icons/ri";
import { UserContext } from "../../UserContext";

const CursoForm = () => {
  const { user } = useContext(UserContext);

  const [cursoData, setCursoData] = useState({
    nombre: "",
    descripcion: "",
    imagen: "",
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
      // Inserta el curso en la tabla "curso"
      const { data: insertedCursoData, error: cursoError } = await supabase
        .from("curso")
        .insert([cursoData])
        .select();

      if (cursoError) {
        throw cursoError;
      }

      // Obtiene el ID del curso recién creado
      const cursoId = insertedCursoData[0].id;

      // Inserta un registro en la tabla "curso_usuario" con el ID del curso y el ID del usuario actual
      const { data, error } = await supabase
        .from("curso_usuario")
        .insert([{ curso_id: cursoId, usuario_id: user.id }]);

      if (data) {
        throw error;
      }else{
        setCursos(dataCursos);

      }

      // Obtén la lista actualizada de cursos después de la inserción
      const { data: dataCursos, error: fetchError } = await supabase.rpc(
        "obtener_cursos_usuario",
        {
          userid: user.id,
        }
      );

      if (fetchError) {
        console.error(
          "Error al obtener cursos después de la inserción:",
          fetchError.message
        );
      } else {
        // Actualiza el estado de cursos después de la inserción
        setCursos(dataCursos);
      }

      // Mostrar mensaje de éxito durante 3 segundos
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);

      // Vaciar el formulario después de enviarlo
      setCursoData({
        nombre: "",
        descripcion: "",
        // otras propiedades del formulario
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
          Curs creat amb èxit
        </div>
      )}
      <Button
        className=""
        onClick={() => setAddCourseSelected(!addCourseSelected)}
      >
        Crear curs{" "}
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
          label="Nom del curs"
          value={cursoData.nombre}
          onChange={handleInputChange}
          required
          className=""
        />

        <Textarea
          placeholder="Introdueix la descripció"
          name="descripcion"
          value={cursoData.descripcion}
          onChange={handleInputChange}
        />

        <Button className="bg-green-200 w-full mt-4" type="submit">
          Crear curs
        </Button>
      </form>
    </div>
  );
};
export default CursoForm;
