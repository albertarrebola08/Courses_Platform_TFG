// Aqui irá la tabla de un modulo concreto. Se generará a partir de darle al OJO en la tabla modulos. Tendrá los campos que salgan de hacer un JOIN de todas las tablas que tengan el mismo modulo ID:

// - ORDEN
// - TIPO (quiz, numeral, camino, acciona, material, examen)
// - ACCIONES (VER, EDITAR, ELIMINAR)

//+ un boton de añadir más (que te abrirá un form con un select para indicar que quieres añadir y cuántos)

import { RiArrowUpLine,RiArrowDownLine,RiDeleteBin4Fill,RiEdit2Fill, RiEyeFill } from "react-icons/ri";
import { Button } from "pol-ui";
import { useContext, useEffect } from 'react';
import { supabase } from '../../supabase/supabaseClient';

import 'react-json-view-lite/dist/index.css';

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@nextui-org/react';

import { useParams } from "react-router-dom";
import { GlobalContext } from '../../GlobalContext';

const TablaModulo = () => {
  const { moduleId } = useParams();
  const { detalleModulo, setDetalleModulo } = useContext(GlobalContext);

  // Estado local para almacenar el orden del elemento arrastrado

  useEffect(() => {
    const obtenerDetalleModulo = async (moduleId) => {
      try {
        console.log(moduleId);
  
        // Corrige la desestructuración de moduloid
        const { data: elementos, error } = await supabase
          .from('elementos')
          .select("*")
          // Filters
          .eq('id_modulo', parseInt(moduleId));
    
        if (error) {
          console.error('Error al obtener el detalle del módulo:', error.message);
        } else {
          console.log('Datos: ', elementos);
          setDetalleModulo(elementos);
        }
      } catch (error) {
        console.error('Error al obtener el detalle del módulo:', error.message);
      }
    };
  
    obtenerDetalleModulo(moduleId);
  }, []);


  const handleMoveUp = async (orden) => {
    const reorderedDetalleModulo = [...detalleModulo];
    const index = reorderedDetalleModulo.findIndex((detalle) => detalle.orden === orden);
  
    if (index > 0) {
      // Intercambia el elemento actual con el anterior
      [reorderedDetalleModulo[index - 1], reorderedDetalleModulo[index]] = [
        reorderedDetalleModulo[index],
        reorderedDetalleModulo[index - 1],
      ];
  
      // Actualiza el orden después del intercambio
      reorderedDetalleModulo[index].orden = index + 1;
      reorderedDetalleModulo[index - 1].orden = index;
  
      try {
        // Llamada a la API para actualizar el orden en la base de datos
        await supabase
          .from('elementos')
          .upsert(
            [
              {
                id: reorderedDetalleModulo[index].id,
                orden: reorderedDetalleModulo[index].orden,
              },
              {
                id: reorderedDetalleModulo[index - 1].id,
                orden: reorderedDetalleModulo[index - 1].orden,
              },
            ],
            { onConflict: ['id'] }
          );
    
        // No olvides manejar posibles errores de la API
      } catch (error) {
        console.error('Error al actualizar el orden en la base de datos:', error.message);
      }
      setDetalleModulo(reorderedDetalleModulo);
    }
  };
  
  const handleMoveDown = async (orden) => {
    const reorderedDetalleModulo = [...detalleModulo];
    const index = reorderedDetalleModulo.findIndex((detalle) => detalle.orden === orden);
  
    if (index < detalleModulo.length - 1) {
      // Intercambia el elemento actual con el siguiente
      [reorderedDetalleModulo[index], reorderedDetalleModulo[index + 1]] = [
        reorderedDetalleModulo[index + 1],
        reorderedDetalleModulo[index],
      ];
  
      // Actualiza el orden después del intercambio
      reorderedDetalleModulo[index].orden = index + 1;
      reorderedDetalleModulo[index + 1].orden = index + 2;
  
      try {
        // Llamada a la API para actualizar el orden en la base de datos
        await supabase
          .from('elementos')
          .upsert(
            [
              {
                id: reorderedDetalleModulo[index].id,
                orden: reorderedDetalleModulo[index].orden,
              },
              {
                id: reorderedDetalleModulo[index + 1].id,
                orden: reorderedDetalleModulo[index + 1].orden,
              },
            ],
            { onConflict: ['id'] }
          );
    
        // No olvides manejar posibles errores de la API
      } catch (error) {
        console.error('Error al actualizar el orden en la base de datos:', error.message);
      }
      setDetalleModulo(reorderedDetalleModulo);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <Table aria-label="Detalle del Módulo">
        <TableHeader>
          <TableColumn>ID {moduleId}</TableColumn>
          <TableColumn>Orden</TableColumn>
          <TableColumn>Tipo</TableColumn>
          <TableColumn>Título</TableColumn>
          <TableColumn>Acciones</TableColumn>
        </TableHeader>
        <TableBody>
          {detalleModulo.map((detalle) => (
            <TableRow key={`${detalle.tipo}-${detalle.id}`} className="hover:bg-gray-100   ">
              <TableCell className="flex ">
              <div
                  className="p-1 justify-center flex"
                  onClick={() => handleMoveUp(detalle.orden)}
                >
                  <RiArrowUpLine />
                </div>
                <div
                  className="p-1 justify-center flex rounded-xl "
                  onClick={() => handleMoveDown(detalle.orden)} 
                ><RiArrowDownLine />
                </div>
              </TableCell>
              <TableCell>{detalle.orden}</TableCell>
              <TableCell>{detalle.tipo || ''}</TableCell>
              <TableCell>{detalle.titulo || ''}</TableCell>
              <TableCell className="flex gap-4 items-center">
                <Button 
                  className="hover:text-white "
                  onClick={() => handleEditDetalleModulo(detalle.id)}
                >
                  <RiEdit2Fill className=""/>
                </Button>
                <Button 
                  className="hover:text-white bg-red-400"
                  onClick={() => handleDeleteDetalleModulo(detalle.id)}
                >
                  <RiDeleteBin4Fill className=""/>
                </Button>
                <Button 
                  className="hover:text-white bg-gray-400"
                  onClick={() => handleViewDetalleModulo(detalle.id)}
                >
                  <RiEyeFill className=""/>
                </Button>
                
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        
      </Table>
    </div>
  );
};

export default TablaModulo;