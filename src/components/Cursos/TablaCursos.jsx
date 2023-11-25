import React, { useState, useEffect } from "react";
import { supabase } from '../../supabase/supabaseClient';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  ButtonGroup
} from "@nextui-org/react";
import { RiEditFill, RiDeleteBin7Fill, RiEyeFill } from 'react-icons/ri';
import TablaCurso from "./TablaCurso";

const TablaCursos = () => {
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
    // Lógica para editar el curso con el ID proporcionado
    console.log(`Editar curso con ID: ${id}`);
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
        // Actualiza el estado de cursos después de la eliminación
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
    <div className="flex flex-col gap-3">
      <Table
        aria-label="Tabla de Cursos"
      >
        <TableHeader>
          <TableColumn>NOMBRE</TableColumn>
          <TableColumn>DESCRIPCIÓN</TableColumn>
          <TableColumn>ACCIONES</TableColumn>
        </TableHeader>
        <TableBody>
          {cursos.map((curso) => (
            <TableRow key={curso.id}>
              <TableCell>{curso.nombre}</TableCell>
              <TableCell>{curso.descripcion}</TableCell>
              <TableCell className="flex gap-4 items-center">
                <Button  className="bg-blue-500" onClick={() => handleEditCurso(curso.id, curso.nombre)}>
                  <RiEditFill className="text-white"/>
                </Button>
                <Button  className="bg-red-500" onClick={() => handleDeleteCurso(curso.id, curso.nombre)}>
                  <RiDeleteBin7Fill className="text-white"/>
                </Button>
                <Button className=" bg-gray-400"><RiEyeFill className="text-lg text-white"/></Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default TablaCursos;
