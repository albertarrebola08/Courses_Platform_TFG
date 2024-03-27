import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../supabase/supabaseClient";
import { UserContext } from "../../../UserContext";
import CardsCursos from "../../../components/Cursos/CardsCursos";
import UserHeader from "../Home/UserHeader";

const MisCursosPage = () => {
  const [cursos, setCursos] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const userid = user.id;
  console.log(userid);

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const { data: cursosData, error } = await supabase.rpc(
          "obtener_cursos_usuarios",
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

    // Llama a la función para obtener cursos solo cuando el componente se monta inicialmente
    fetchCursos();
  }, []);

  return (
    <main>
      <UserHeader></UserHeader>
      <div className="p-8">
        <CardsCursos cursos={cursos} setCursos={setCursos} />
      </div>
    </main>
  );
};

export default MisCursosPage;
