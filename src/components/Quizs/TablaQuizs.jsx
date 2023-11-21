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

const TablaQuizs = () =>{

    const [quizs, setQuizs] = useState([]);

  useEffect(() => {
    const fetchQuizs = async () => {
      try {
        const { data: quizsData, error } = await supabase.from("actividad_quiz").select("*");
        if (error) {
          throw error;
        }
        setQuizs(quizsData);
      } catch (error) {
        console.error("Error al obtener Quizs:", error.message);
      }
    };

    // Llama a la función para obtener cursos cuando el componente se monta
    fetchQuizs();
  }, [quizs]);

  return (
    <div className="flex flex-col gap-3">
        <Table
            aria-label="Tabla que contiene las lecciones de quiz"
        >
            <TableHeader>
                <TableColumn>ID </TableColumn>
                <TableColumn>TÍTULO </TableColumn>
                <TableColumn>DESCRIPCIÓN</TableColumn>
            </TableHeader>
            <TableBody>
                
                {quizs.map((quiz) => (
                <TableRow key={quiz.id}>
                    <TableCell>{quiz.id}</TableCell>
                    <TableCell>{quiz.titulo}</TableCell>
                    <TableCell>{quiz.descripcion}</TableCell>
                </TableRow>
                ))}
            </TableBody>
        </Table>
    </div>
  )


}

export default TablaQuizs;