import React, { useState, useEffect } from "react";
import { supabase } from '../../supabase/supabaseClient';
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { RiEdit2Line, RiDeleteBin2Line, RiEyeFill } from 'react-icons/ri';

const CardsCursos = () => {
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const { data: cursosData, error } = await supabase.from("curso").select("*");
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

  const handleEditCurso = (id) => {
    console.log(`Editar curso con ID: ${id}`);
    // Agrega la lógica de edición aquí según tus necesidades
  };

  const handleDeleteCurso = async (id, nombre) => {
    const userConfirmed = window.confirm(`Estàs segur d'eliminar el curs: ${nombre}`);
    
    if (userConfirmed) {
      const { error } = await supabase
        .from('curso')
        .delete()
        .eq('id', id);
  
      if (error) {
        console.error('Error al eliminar el curso:', error.message);
      } else {
        // Puedes realizar acciones adicionales después de eliminar el curso si es necesario
        const { data: cursosData, error: fetchError } = await supabase.from("curso").select("*");
  
        if (fetchError) {
          console.error('Error al obtener cursos después de la eliminación:', fetchError.message);
        } else {
          setCursos(cursosData);
        }
      }
    }
  };

  return (
    <div className="flex gap-4 flex-wrap">
      {cursos.map((curso) => (
        <CardCurso
          key={curso.id}
          nombre={curso.nombre}
          descripcion={curso.descripcion}
          id={curso.id}
          handleEditCurso={handleEditCurso}
          handleDeleteCurso={handleDeleteCurso}
        />
      ))}
    </div>
  );
};

const CardCurso = ({ nombre, descripcion, id, handleEditCurso, handleDeleteCurso }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className="py-4 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start relative">
        <div className="flex items-center">
          <h4 className="font-bold text-large">{nombre}</h4>
          {isHovered && (
            <RiEdit2Line
              className="text-brown-500 cursor-pointer ml-2"
              onClick={() => handleEditCurso(id)}
              title="Editar"
            />
          )}
          {isHovered && (
            <RiDeleteBin2Line
              className="text-red-500 cursor-pointer ml-2"
              onClick={() => handleDeleteCurso(id, nombre)}
              title="Eliminar"
            />
          )}
        </div>
        <small className="text-default-500">{descripcion}</small>
      </CardHeader>
      <CardBody className="overflow-hidden relative">
        <Image
          alt="Curso Image"
          className="object-cover rounded-xl"
          src="src\assets\images\amazon_course_imagen_prueba.jpg"  // Cambia esto según cómo manejes las imágenes
          width={270}
        />
        {isHovered && (
          <div className="absolute top-2 right-2 space-x-2">
            
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default CardsCursos;
