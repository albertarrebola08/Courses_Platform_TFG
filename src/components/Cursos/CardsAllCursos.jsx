import { useState, useContext } from "react";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";

import { UserContext } from "../../UserContext";
import { Button } from "pol-ui";
import { supabase } from "../../supabase/supabaseClient";

const CardsAllCursos = ({ cursos }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-5">
      {cursos.map((curso) => (
        <CardCurso
          key={curso.id}
          nombre={curso.nombre}
          descripcion={curso.descripcion}
          id={curso.id}
        />
      ))}
    </div>
  );
};
// AJUSTAR AQUI LA CARD D ECURSO PARA QUE SEA MAS PROMO, AÑADIR MAS COSAS O CAMBIAR DISEÑO AQUINO ES SOLO IDENTIFICATIVA
const CardCurso = ({ nombre, descripcion, id }) => {
  const { perfilInfo, user } = useContext(UserContext);
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
    <Card className="py-4 relative">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start relative">
        <div className="flex items-center">
          <h4 className="font-bold text-large">{nombre}</h4>
        </div>
        <small className="text-default-500">{descripcion}</small>
      </CardHeader>
      <CardBody className="overflow-hidden relative">
        <Image
          alt="Curso Image"
          className="object-cover rounded-xl"
          src="/images/amazon_course_imagen_prueba.jpg"
          width={270}
        />

        <div className="p-4 flex justify-center">
          <Button
          data=""
            color="primary"
            variant="contained"
            onClick={() => handleSolicitarCurso(id)}
          >
            Solicitar Curso
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default CardsAllCursos;
