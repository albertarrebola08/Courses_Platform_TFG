import React, { useState, useContext, useEffect } from "react";
import { supabase } from "../../supabase/supabaseClient";
import { IconButton, Loader } from "pol-ui";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../../GlobalContext";
import { RiEdit2Fill } from "react-icons/ri";
import { FaTrash } from "react-icons/fa";

const ConsejoDiarioList = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const { consejosData, setConsejosData } = useContext(GlobalContext);

  useEffect(() => {
    const fetchConsejos = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("consejos_diarios")
          .select("*")
          .eq("curso_id", Number(id));

        if (error) {
          throw new Error(error.message);
        }

        setConsejosData(data);
      } catch (error) {
        console.error("Error al obtener los consejos diarios:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchConsejos();
  }, [id, setConsejosData]);

  const handleDeleteConsejo = async (consejoId) => {
    try {
      setLoading(true);
      await supabase.from("consejos_diarios").delete().eq("id", consejoId);
      setConsejosData((prevConsejos) =>
        prevConsejos.filter((consejo) => consejo.id !== consejoId)
      );
      alert("Consejo eliminado correctamente");
    } catch (error) {
      console.error("Error al eliminar el consejo:", error.message);
      alert("Ocurrió un error al eliminar el consejo");
    } finally {
      setLoading(false);
    }
  };

  const handleEditConsejo = (consejoId) => {
    console.log(`Editando el consejo con ID ${consejoId}`);
    // Aquí podrías abrir un modal o redireccionar a la página de edición con el ID del consejo
  };

  return (
    <div className="flex flex-col gap-3 mx-12 py-3 overflow-y-auto">
      <div>{loading && <Loader />}</div>
      <ul className="flex flex-col gap-4">
        {consejosData.map((consejo) => (
          <li
            key={consejo.id}
            className="bg-primary-400 rounded-xl p-3 flex flex-col  "
          >
            <h4 className="font-bold">{consejo.fecha_consejo}</h4>
            <div className="flex justify-between items-center">
              <p>{consejo.consejo}</p>
              <div className="flex ">
                <IconButton onClick={() => handleEditConsejo(consejo.id)}>
                  <RiEdit2Fill></RiEdit2Fill>
                </IconButton>
                <IconButton onClick={() => handleDeleteConsejo(consejo.id)}>
                  <FaTrash></FaTrash>
                </IconButton>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConsejoDiarioList;
