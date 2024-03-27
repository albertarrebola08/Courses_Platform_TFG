import React, { useState, useContext } from "react";
import { supabase } from "../../supabase/supabaseClient";
import { Button, Input, Textarea } from "pol-ui";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../../GlobalContext";

const ConsejoDiarioForm = () => {
  const [fechaConsejo, setFechaConsejo] = useState("");
  const [consejo, setConsejo] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const { consejosData, setConsejosData } = useContext(GlobalContext);
  const handleAddConsejo = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("consejos_diarios")
        .insert([
          {
            fecha_consejo: fechaConsejo,
            consejo: consejo,
            curso_id: Number(id),
          },
        ])
        .select();
      setConsejosData((prevConsejos) => [...prevConsejos, ...data]); // Fusionar los nuevos consejos con los existentes

      // Limpiar los campos después de la inserción exitosa
      setFechaConsejo("");
      setConsejo("");
      alert("Consejo añadido correctamente");
    } catch (error) {
      console.error("Error al agregar el consejo:", error.message);
      alert("Ocurrió un error al agregar el consejo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <form className="flex flex-col gap-3">
        <div>
          <Input
            label="Fecha del Consejo:"
            type="date"
            id="fechaConsejo"
            value={fechaConsejo}
            onChange={(e) => setFechaConsejo(e.target.value)}
            required
          />
        </div>
        <div>
          <Textarea
            label="Consejo:"
            id="consejo"
            value={consejo}
            onChange={(e) => setConsejo(e.target.value)}
            required
          />
        </div>
        <Button onClick={handleAddConsejo} disabled={loading}>
          {loading ? "Añadiendo..." : "Añadir Consejo"}
        </Button>
      </form>
    </div>
  );
};

export default ConsejoDiarioForm;
