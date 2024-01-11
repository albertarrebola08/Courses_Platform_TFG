
// Aqui irá la tabla de un modulo concreto. Se generará a partir de darle al OJO en la tabla modulos. Tendrá los campos que salgan de hacer un JOIN de todas las tablas que tengan el mismo modulo ID:

// - ORDEN
// - TIPO (quiz, numeral, camino, acciona, material, examen)
// - ACCIONES (VER, EDITAR, ELIMINAR)

//+ un boton de añadir más (que te abrirá un form con un select para indicar que quieres añadir y cuántos)


import { useState, useEffect } from 'react';
import { supabase } from '../../supabase/supabaseClient';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from '@nextui-org/react';
import { RiEyeFill } from 'react-icons/ri';

import { useParams } from "react-router-dom";

const ModuloPage = () => {

    const { moduleId } = useParams();

    const [detalleModulo, setDetalleModulo] = useState([]);
  useEffect(() => {
    const obtenerDetalleModulo = async (moduleId) => {
        try {

          console.log(moduleId)
           
            const { data, error } = await supabase.rpc('obtenerdetallemodulo', {
              moduloid: parseInt(moduleId, 10)             
            });
            
        if (error) {
          console.error('Error al obtener el detalle del módulo:', error.message);
        } else {
          console.log("Datos: ", data)
          setDetalleModulo(data);


        }
      } catch (error) {
        console.error('Error al obtener el detalle del módulo:', error.message);
      }
    };

    obtenerDetalleModulo(moduleId);
  }, [moduleId]); 

//handles para crud de los registros 

const handleEditDetalleModulo = (id) => {
  console.log(`Aqui va la consulta per editar l'element amb ID: ${id} `)
}

const handleDeleteDetalleModulo = async (nombre) => {
  // Lógica para eliminar el modulo con el ID proporcionado
  confirm(`Estàs segur d'eliminar l'element: ${nombre} ?`);
  console.log(`Aqui va la consulta per eliminar l'element amb ID: ${moduleId} `)
};
const handleViewDetalleModulo = (id) => {
  console.log(`Aqui va la consulta per visualitzar l'element amb ID: ${id} `)
}

// PARA PODER COMMUTAR Y REORDENAR ROWS EN LA TABLA
const handleDragStart = (e, orden) => {
    e.dataTransfer.setData('text/plain', orden);
  };

  const handleDragOver = (e, orden) => {
    e.preventDefault();
  };

  const handleDragEnter = (e, targetOrden) => {
    e.preventDefault();
    const draggedOrden = e.dataTransfer.getData('text/plain');
    if (draggedOrden !== targetOrden.toString()) {
      const reorderedDetalleModulo = [...detalleModulo];
      const draggedItem = reorderedDetalleModulo.find(detalle => detalle.orden === parseInt(draggedOrden, 10));
      const targetIndex = reorderedDetalleModulo.findIndex(detalle => detalle.orden === parseInt(targetOrden, 10));
      reorderedDetalleModulo.splice(targetIndex + 1, 0, draggedItem);
      reorderedDetalleModulo.splice(reorderedDetalleModulo.indexOf(draggedItem), 1);
      setDetalleModulo(reorderedDetalleModulo);
    }
  };

  const handleDrop = (e, targetOrden) => {
    e.preventDefault();
    const draggedOrden = e.dataTransfer.getData('text/plain');
    handleReorder(parseInt(draggedOrden, 10), parseInt(targetOrden, 10));
  };

  const handleReorder = (draggedOrden, targetOrden) => {
    // Lógica para reordenar los elementos en detalleModulo
    const reorderedDetalleModulo = [...detalleModulo];
    const draggedItem = reorderedDetalleModulo.find(detalle => detalle.orden === draggedOrden);
    reorderedDetalleModulo.splice(reorderedDetalleModulo.indexOf(draggedItem), 1);
    const targetIndex = reorderedDetalleModulo.findIndex(detalle => detalle.orden === targetOrden);
    reorderedDetalleModulo.splice(targetIndex, 0, draggedItem);

    // Recalcula los órdenes después del reordenamiento
    reorderedDetalleModulo.forEach((detalle, index) => {
      detalle.orden = index + 1;
    });

    setDetalleModulo(reorderedDetalleModulo);
  };
      

  return (
    <div className="flex flex-col gap-3">
      <Table aria-label="Detalle del Módulo">
  <TableHeader>
  <TableColumn>ID {moduleId}</TableColumn>
    <TableColumn>Orden</TableColumn>
    <TableColumn>Tipo</TableColumn>
    <TableColumn>Título</TableColumn>
    <TableColumn>Acciones</TableColumn> {/* Nueva columna para acciones */}
  </TableHeader>
  <TableBody>
    {detalleModulo.map((detalle) => (
      // Añado el prefijo de "tipo" para poder diferenciar los ids y que no coincidan en las keys.Ej: video_1 mo coincidirá ahora con material_1
      <TableRow key={`${detalle.tipo}-${detalle.id}`}
        draggable="true"
        onDragStart={(e) => handleDragStart(e, detalle.orden)}
        onDragOver={(e) => handleDragOver(e, detalle.orden)}
        onDragEnter={(e) => handleDragEnter(e, detalle.orden)}
        onDrop={(e) => handleDrop(e, detalle.orden)}>
        <TableCell>{detalle.id}</TableCell>
        <TableCell>{detalle.orden}</TableCell>
        <TableCell>{detalle.tipo}</TableCell>
        <TableCell>{detalle.titulo}</TableCell>
        <TableCell className="flex gap-4 items-center">
          <Button className="bg-blue-400" onClick={() => handleEditDetalleModulo(detalle.id)}>
            Editar
          </Button>
          <Button className="bg-red-400" onClick={() => handleDeleteDetalleModulo(detalle.id)}>
            Borrar
          </Button>
          <Button className="bg-gray-400" onClick={() => handleViewDetalleModulo(detalle.id)}>
            Visualizar
          </Button>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>

    </div>
  );
};


export default ModuloPage;