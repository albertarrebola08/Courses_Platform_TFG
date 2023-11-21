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

const TablaAccionas = () =>{

    const [accionas, setAccionas] = useState([]);

  useEffect(() => {
    const fetchAccionas = async () => {
      try {
        const { data: accionasData, error } = await supabase.from("acciona").select("*");
        if (error) {
          throw error;
        }
        setAccionas(accionasData);
      } catch (error) {
        console.error("Error al obtener accionas:", error.message);
      }
    };

    // Llama a la función para obtener cursos cuando el componente se monta
    fetchAccionas();
  }, [accionas]);

  return (
    <div className="flex flex-col gap-3">
        <Table
            aria-label="Tabla que contiene las lecciones de acciona"
        >
            <TableHeader>
                <TableColumn>ID </TableColumn>
                <TableColumn>TÍTULO </TableColumn>
                <TableColumn>ENUNCIADO</TableColumn>
            </TableHeader>
            <TableBody>
                
                {accionas.map((acciona) => (
                <TableRow key={acciona.id}>
                    <TableCell>{acciona.id}</TableCell>
                    <TableCell>{acciona.titulo}</TableCell>
                    <TableCell>{acciona.enunciado}</TableCell>
                </TableRow>
                ))}
            </TableBody>
        </Table>
    </div>
  )


}

export default TablaAccionas;