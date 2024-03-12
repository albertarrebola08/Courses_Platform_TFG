import { useState, useContext } from "react";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { RiEdit2Line, RiDeleteBin2Line } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../../UserContext";
import { Button } from "pol-ui";

const CardsCursos = ({ cursos, onDelete }) => {
  const handleEditCurso = (id) => {
    console.log(`Editar curso con ID: ${id}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-5">
      {cursos.map((curso) => (
        <CardCurso
          key={curso.curso_id}
          nombre={curso.nombre}
          descripcion={curso.descripcion}
          id={curso.curso_id}
          handleEditCurso={handleEditCurso}
          handleDeleteCurso={onDelete}
        />
      ))}
    </div>
  );
};

const CardCurso = ({
  nombre,
  descripcion,
  id,
  handleEditCurso,
  handleDeleteCurso,
}) => {
  const { perfilInfo } = useContext(UserContext);
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();
  return (
    <Card
      className="py-4 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        to={
          perfilInfo && perfilInfo.rol === "admin"
            ? `/dashboard/cursos/${id}`
            : `/mis-cursos/${id}`
        }
      >
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start relative">
          <div className="flex items-center">
            <h4 className="font-bold text-large">{nombre}</h4>
            {perfilInfo && perfilInfo.rol === "admin" && isHovered && (
              <>
                <RiEdit2Line
                  className="text-brown-500 cursor-pointer ml-2"
                  onClick={() => handleEditCurso(id)}
                  title="Editar"
                />
                <RiDeleteBin2Line
                  className="text-red-500 cursor-pointer ml-2"
                  onClick={() => handleDeleteCurso(id, nombre)}
                  title="Eliminar"
                />
              </>
            )}
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
          {console.log("perfil!!!", perfilInfo && perfilInfo.rol)}

          {perfilInfo &&
            (perfilInfo.rol === "usuario") !==
              location.pathname.includes("mis-cursos") && (
              <div className="p-4 flex justify-center">
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => handleSolicitarCurso(id)}
                >
                  Solicitar Curso
                </Button>
              </div>
            )}
        </CardBody>
      </Link>
    </Card>
  );
};

export default CardsCursos;
