import CursoForm from "../../components/Cursos/CursoForm";
import CardsCursos from "../../components/Cursos/CardsCursos";
import { useEffect, useState, useContext } from "react";
import { supabase } from "../../supabase/supabaseClient";
import { UserContext } from "../../UserContext";
import { useNavigate } from "react-router-dom";

const CursosPage = () => {
  const [cursos, setCursos] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const userid = user.id;
  console.log(userid);

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const { data: cursosData, error } = await supabase.rpc(
          "obtener_cursos_usuario",
          {
            userid,
          }
        );

        if (error) {
          throw error;
        } else {
          console.log(cursosData);
          setCursos(cursosData);
        }
      } catch (error) {
        console.error("Error al obtener cursos:", error.message);
      }
    };

    // Llama a la función para obtener cursos cada vez que el componente se renderiza
    fetchCursos();
  }, []);
  const handleDeleteCurso = async (curso_id, nombre) => {
    const userConfirmed = window.confirm(
      `Estàs segur d'eliminar el curs: ${nombre}`
    );

    if (userConfirmed) {
      const { error } = await supabase
        .from("curso")
        .delete()
        .eq("id", curso_id);

      if (error) {
        console.error("Error al eliminar el curso:", error.message);
      } else {
        // Puedes realizar acciones adicionales después de eliminar el curso si es necesario
        const { data: cursosData, error } = await supabase.rpc(
          "obtener_cursos_usuario",
          {
            userid,
          }
        );

        if (error) {
          throw error;
        } else {
          setCursos(cursosData);
          navigate("/dashboard/cursos");
        }
      }
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <CursoForm />
      <CardsCursos cursos={cursos} onDelete={handleDeleteCurso} />
    </div>
  );
};

export default CursosPage;
