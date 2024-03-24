import { useContext } from "react";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { RiEdit2Line, RiDeleteBin2Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { UserContext } from "../../UserContext";

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
          imagen={curso.imagen}
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
  imagen,
}) => {
  const { perfilInfo } = useContext(UserContext);
  return (
    <Card className="py-4 relative group">
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
            {perfilInfo && perfilInfo.rol === "admin" && (
              <>
                <RiEdit2Line
                  className="text-brown-500 cursor-pointer ml-2 opacity-0 group-hover:opacity-100"
                  onClick={() => handleEditCurso(id)}
                  title="Editar"
                />
                <RiDeleteBin2Line
                  className="text-red-500 cursor-pointer ml-2 opacity-0 group-hover:opacity-100"
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
            src={imagen}
            width={270}
          />
        </CardBody>
      </Link>
    </Card>
  );
};

export default CardsCursos;
