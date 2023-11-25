import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabase/supabaseClient';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell
} from '@nextui-org/react';

const TablaCurso = () => {
  const [modules, setModules] = useState([]);

  useEffect(() => {
    const fetchModules = async (idCourse) => {
      try {
        const { data, error } = await supabase.rpc('selectmodulesofcourse', {
          idcourse: idCourse
        });
        
        if (error) {
          console.error('Error al obtener los módulos:', error.message);
        } else {
          setModules(data);
        }
      } catch (error) {
        console.error('Error al obtener los módulos:', error.message);
      }
    };

    fetchModules();
  }, []); // La dependencia vacía asegura que se ejecute solo una vez al montar el componente

  return (
    <Table aria-label="Tabla de un curso concreto">
      <TableHeader>
        <TableColumn>ID</TableColumn>
        <TableColumn>Nombre</TableColumn>
        <TableColumn>Descripción</TableColumn>
      </TableHeader>
      <TableBody>
        {modules.map((module) => (
          <TableRow key={module.id}>
            <TableCell>{module.id}</TableCell>
            <TableCell>{module.nombre}</TableCell>
            <TableCell>{module.descripcion}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TablaCurso;
