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

const TablaVideos = () =>{

    const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const { data: videosData, error } = await supabase.from("video").select("*");
        if (error) {
          throw error;
        }
        setVideos(videosData);
      } catch (error) {
        console.error("Error al obtener videos:", error.message);
      }
    };

    // Llama a la función para obtener cursos cuando el componente se monta
    fetchVideos();
  }, []);

  return (
    <div className="flex flex-col gap-3">
        <Table
            aria-label="Tabla que contiene las lecciones de video"
        >
            <TableHeader>
                <TableColumn>ID </TableColumn>
                <TableColumn>TÍTULO </TableColumn>
                <TableColumn>URL</TableColumn>
            </TableHeader>
            <TableBody>
                
                {videos.map((video) => (
                <TableRow key={video.id}>
                    <TableCell>{video.id}</TableCell>
                    <TableCell>{video.titulo}</TableCell>
                    <TableCell>{video.url}</TableCell>
                </TableRow>
                ))}
            </TableBody>
        </Table>
    </div>
  )


}

export default TablaVideos;