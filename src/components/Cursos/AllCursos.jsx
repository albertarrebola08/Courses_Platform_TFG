import { useEffect, useState } from "react";
import { supabase } from "../../supabase/supabaseClient";
import CardsCursos from "./CardsCursos";

const AllCursos = () => {
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

  return (
    <div className="flex py-5">
      <CardsCursos cursos={cursos} />
    </div>
  );
};

export default AllCursos;
