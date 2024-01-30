import { useState } from "react";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { RiEdit2Line, RiDeleteBin2Line } from "react-icons/ri";
import { Link } from "react-router-dom ";


//coment

const CardsCursos = ({ cursos, onDelete }) => {
  const handleEditCurso = (id) => {
    console.log(`Editar curso con ID: ${id}`);
    // Agrega la lógica de edición aquí según tus necesidades
  };

  return (
    <div className="flex gap-4 flex-wrap">
      {cursos.map((curso) => (
        <CardCurso key={curso.id} nombre={curso.nombre} descripcion={curso.descripcion} id={curso.id} handleEditCurso={handleEditCurso} handleDeleteCurso={onDelete} />
      ))}
    </div>
  );
};

const CardCurso = ({ nombre, descripcion, id, handleEditCurso, handleDeleteCurso }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card className="py-4 relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <Link to={`/dashboard/cursos/${id}`}>
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start relative">
          <div className="flex items-center">
            <h4 className="font-bold text-large">{nombre}</h4>
            {isHovered && <RiEdit2Line className="text-brown-500 cursor-pointer ml-2" onClick={() => handleEditCurso(id)} title="Editar" />}
            {isHovered && <RiDeleteBin2Line className="text-red-500 cursor-pointer ml-2" onClick={() => handleDeleteCurso(id, nombre)} title="Eliminar" />}
          </div>
          <small className="text-default-500">{descripcion}</small>
        </CardHeader>
        <CardBody className="overflow-hidden relative">
          <Image
            alt="Curso Image"
            className="object-cover rounded-xl"
            src="/images/amazon_course_imagen_prueba.jpg" // Cambia esto según cómo manejes las imágenes
            width={270}
          />
          {isHovered && <div className="absolute top-2 right-2 space-x-2"></div>}
        </CardBody>
      </Link>
    </Card>
  );
};

export default CardsCursos;
