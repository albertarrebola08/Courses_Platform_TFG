import CursoForm from "../../components/Cursos/CursoForm";
import CardsCursos from "../../components/Cursos/CardsCursos";
import { useEffect, useState } from "react";
import { supabase } from "../../supabase/supabaseClient";

const CursosPage = () => {
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const { data: cursosData, error } = await supabase
          .from("curso")
          .select("*");

        if (error) {
          throw error;
        }
        setCursos(cursosData);
      } catch (error) {
        console.error("Error al obtener cursos:", error.message);
      }
    };

    // Llama a la función para obtener cursos cada vez que el componente se renderiza
    fetchCursos();
  }, []);

  const handleDeleteCurso = async (id, nombre) => {
    const userConfirmed = window.confirm(
      `Estàs segur d'eliminar el curs: ${nombre}`
    );

    if (userConfirmed) {
      const { error } = await supabase.from("curso").delete().eq("id", id);

      if (error) {
        console.error("Error al eliminar el curso:", error.message);
      } else {
        // Puedes realizar acciones adicionales después de eliminar el curso si es necesario
        const { data: cursosData, error: fetchError } = await supabase
          .from("curso")
          .select("*");

        if (fetchError) {
          console.error(
            "Error al obtener cursos después de la eliminación:",
            fetchError.message
          );
        } else {
          setCursos(cursosData);
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
