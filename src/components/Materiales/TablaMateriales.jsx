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

const TablaMateriales = () =>{

    const [materiales, setMateriales] = useState([]);

  useEffect(() => {
    const fetchMateriales = async () => {
      try {
        const { data: materialesData, error } = await supabase.from("material").select("*");
        if (error) {
          throw error;
        }
        setMateriales(materialesData);
      } catch (error) {
        console.error("Error al obtener Materiales:", error.message);
      }
    };

    // Llama a la función para obtener cursos cuando el componente se monta
    fetchMateriales();
  }, []);

  return (
    <div className="flex flex-col gap-3">
        <Table
            aria-label="Tabla que contiene las lecciones de quiz"
        >
            <TableHeader>
                <TableColumn>ID </TableColumn>
                <TableColumn>TÍTULO </TableColumn>
                <TableColumn>DESCRIPCIÓN</TableColumn>
                <TableColumn>URL DEL ARCHIVO</TableColumn>

            </TableHeader>
            <TableBody>
                
                {materiales.map((material) => (
                <TableRow key={material.id}>
                    <TableCell>{material.id}</TableCell>
                    <TableCell>{material.titulo}</TableCell>
                    <TableCell>{material.descripcion}</TableCell>
                    <TableCell><a target="_blank" href={material.archivo_url}>{material.archivo_url}</a></TableCell>
                </TableRow>
                ))}
            </TableBody>
        </Table>
    </div>
  )


}

export default TablaMateriales;