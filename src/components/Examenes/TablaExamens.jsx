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

const TablaExamens = () =>{

    const [examens, setExamens] = useState([]);

  useEffect(() => {
    const fetchExamens = async () => {
      try {
        const { data: examensData, error } = await supabase.from("examen").select("*");
        if (error) {
          throw error;
        }
        setExamens(examensData);
      } catch (error) {
        console.error("Error al obtener examens:", error.message);
      }
    };

    // Llama a la función para obtener cursos cuando el componente se monta
    fetchExamens();
  }, [examens]);

  return (
    <div className="flex flex-col gap-3">
        <Table
            aria-label="Tabla que contiene las lecciones de examen"
        >
            <TableHeader>
                <TableColumn>ID </TableColumn>
                <TableColumn>TÍTULO </TableColumn>
                <TableColumn>ENUNCIADO</TableColumn>
            </TableHeader>
            <TableBody>
                
                {examens.map((examen) => (
                <TableRow key={examen.id}>
                    <TableCell>{examen.id}</TableCell>
                    <TableCell>{examen.titulo}</TableCell>
                    <TableCell>{examen.enunciado}</TableCell>
                </TableRow>
                ))}
            </TableBody>
        </Table>
    </div>
  )


}

export default TablaExamens;