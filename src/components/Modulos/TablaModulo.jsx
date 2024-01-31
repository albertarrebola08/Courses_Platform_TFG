// Aqui irá la tabla de un modulo concreto. Se generará a partir de darle al OJO en la tabla modulos. Tendrá los campos que salgan de hacer un JOIN de todas las tablas que tengan el mismo modulo ID:

// - ORDEN
// - TIPO (quiz, numeral, camino, acciona, material, examen)
// - ACCIONES (VER, EDITAR, ELIMINAR)

//+ un boton de añadir más (que te abrirá un form con un select para indicar que quieres añadir y cuántos)

import {
  RiArrowUpLine,
  RiArrowDownLine,
  RiDeleteBin4Fill,
  RiEdit2Fill,
  RiEyeFill,
} from "react-icons/ri";
import { Button, IconButton } from "pol-ui";
import { useContext, useEffect } from "react";
import { supabase } from "../../supabase/supabaseClient";
import "react-json-view-lite/dist/index.css";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

import { useParams, Link } from "react-router-dom";
import { GlobalContext } from "../../GlobalContext";

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
          .from("elementos")
          .select("*")
          // Filters
          .eq("id_modulo", parseInt(moduleId));

        if (error) {
          console.error(
            "Error al obtener el detalle del módulo:",
            error.message
          );
        } else {
          console.log("Datos: ", elementos);
          setDetalleModulo(elementos);
        }
      } catch (error) {
        console.error("Error al obtener el detalle del módulo:", error.message);
      }
    };

    obtenerDetalleModulo(moduleId);
  }, []);

  const handleMoveUp = async (orden) => {
    const reorderedDetalleModulo = [...detalleModulo];
    const index = reorderedDetalleModulo.findIndex(
      (detalle) => detalle.orden === orden
    );

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
        await supabase.from("elementos").upsert(
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
          { onConflict: ["id"] }
        );

        // No olvides manejar posibles errores de la API
      } catch (error) {
        console.error(
          "Error al actualizar el orden en la base de datos:",
          error.message
        );
      }
      setDetalleModulo(reorderedDetalleModulo);
    }
  };
  const handleMoveDown = async (orden) => {
    const reorderedDetalleModulo = [...detalleModulo];
    const index = reorderedDetalleModulo.findIndex(
      (detalle) => detalle.orden === orden
    );

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
        await supabase.from("elementos").upsert(
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
          { onConflict: ["id"] }
        );

        // No olvides manejar posibles errores de la API
      } catch (error) {
        console.error(
          "Error al actualizar el orden en la base de datos:",
          error.message
        );
      }
      setDetalleModulo(reorderedDetalleModulo);
    }
  };

  //***************/ acciones de eliminar, editar y visualizar elementos del modulo

  const handleEditDetalleModulo = (id) => {
    // Lógica para la operación de editar
    console.log(`Editar elemento con ID ${id}`);
  };
  const handleDeleteDetalleModulo = async (elementoId) => {
    try {
      // Obtén el orden del elemento que estás eliminando
      const { data: elementoEliminar, error: errorElemento } = await supabase
        .from("elementos")
        .select("orden")
        .eq("id", elementoId);

      if (errorElemento) {
        throw errorElemento;
      }

      const ordenElementoEliminar = elementoEliminar[0].orden;

      // Elimina el elemento de la base de datos
      const { errorEliminar } = await supabase
        .from("elementos")
        .delete()
        .eq("id", elementoId);

      if (errorEliminar) {
        throw errorEliminar;
      }

      // Obten los elementos restantes con órdenes mayores que el elemento eliminado
      const { data: elementosRestantes } = await supabase
        .from("elementos")
        .select("id, orden")
        .gt("orden", ordenElementoEliminar)
        .eq("id_modulo", moduleId)
        .order("orden");

      // Actualiza los órdenes de los elementos restantes
      for (let i = 0; i < elementosRestantes.length; i++) {
        const nuevoOrden = ordenElementoEliminar + i;
        await supabase
          .from("elementos")
          .update({ orden: nuevoOrden })
          .eq("id", elementosRestantes[i].id);
      }

      // Actualiza el estado local con los nuevos elementos
      const { data: nuevosElementos } = await supabase
        .from("elementos")
        .select("*")
        .eq("id_modulo", moduleId)
        .order("orden");

      setDetalleModulo(nuevosElementos);
    } catch (error) {
      console.error("Error al eliminar el detalle del módulo:", error.message);
    }
  };

  //view
  const handleViewDetalleModulo = (id) => {
    // Lógica para la operación de ver
    console.log(`Ver elemento con ID ${id}`);
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
            <TableRow
              key={`${detalle.tipo}-${detalle.id}`}
              className="hover:bg-gray-100   "
            >
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
                >
                  <RiArrowDownLine />
                </div>
              </TableCell>
              <TableCell>{detalle.orden}</TableCell>
              <TableCell>{detalle.tipo || ""}</TableCell>
              <TableCell>{detalle.titulo || ""}</TableCell>
              <TableCell className="flex gap-2 items-center">
                <Link
                  to={`/dashboard/modulo/${moduleId}/${detalle.tipo}/${detalle.id}`}
                >
                  <IconButton
                    onClick={() => handleEditDetalleModulo(detalle.id)}
                    className=" "
                  >
                    <RiEdit2Fill className="" />
                  </IconButton>
                </Link>
                <IconButton
                  className=""
                  onClick={() => handleDeleteDetalleModulo(detalle.id)}
                >
                  <RiDeleteBin4Fill className="" />
                </IconButton>
                <IconButton
                  className=""
                  onClick={() => handleViewDetalleModulo(detalle.id)}
                >
                  <RiEyeFill className="" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TablaModulo;
