// Aqui irá la tabla de un modulo concreto. Se generará a partir de darle al OJO en la tabla modulos. Tendrá los campos que salgan de hacer un JOIN de todas las tablas que tengan el mismo modulo ID:

// - ORDEN
// - TIPO (quiz, numeral, camino, acciona, material, examen)
// - ACCIONES (VER, EDITAR, ELIMINAR)

//+ un boton de añadir más (que te abrirá un form con un select para indicar que quieres añadir y cuántos)

import { useContext, useEffect, useState } from "react";
import { supabase } from "../../supabase/supabaseClient";
import "react-json-view-lite/dist/index.css";

import { useParams } from "react-router-dom";

import ListaModulo from "./ListaModulo";
import { Loader } from "pol-ui";
import { useRecoilState } from "recoil";
import { ModuleInfoState } from "../../atoms/ModuleElements.state";

const TablaModulo = () => {
  const { moduleId } = useParams();
  const [detalleModulo, setDetalleModulo] = useRecoilState(ModuleInfoState);

  useEffect(() => {
    const obtenerDetalleModulo = async (moduleId) => {
      try {
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
          setDetalleModulo(elementos);
        }
      } catch (error) {
        console.error("Error al obtener el detalle del módulo:", error.message);
      }
    };

    obtenerDetalleModulo(moduleId);
  }, []);
  // const handleMoveUp = async (orden) => {
  //   const reorderedDetalleModulo = [...detalleModulo];
  //   const index = reorderedDetalleModulo.findIndex(
  //     (detalle) => detalle.orden === orden
  //   );

  //   if (index > 0) {
  //     // Intercambia el elemento actual con el anterior
  //     [reorderedDetalleModulo[index - 1], reorderedDetalleModulo[index]] = [
  //       reorderedDetalleModulo[index],
  //       reorderedDetalleModulo[index - 1],
  //     ];

  //     // Actualiza el orden después del intercambio
  //     reorderedDetalleModulo[index].orden = index + 1;
  //     reorderedDetalleModulo[index - 1].orden = index;

  //     try {
  //       // Llamada a la API para actualizar el orden en la base de datos
  //       await supabase.from("elementos").upsert(
  //         [
  //           {
  //             id: reorderedDetalleModulo[index].id,
  //             orden: reorderedDetalleModulo[index].orden,
  //           },
  //           {
  //             id: reorderedDetalleModulo[index - 1].id,
  //             orden: reorderedDetalleModulo[index - 1].orden,
  //           },
  //         ],
  //         { onConflict: ["id"] }
  //       );

  //       // No olvides manejar posibles errores de la API
  //     } catch (error) {
  //       console.error(
  //         "Error al actualizar el orden en la base de datos:",
  //         error.message
  //       );
  //     }
  //     setDetalleModulo(reorderedDetalleModulo);
  //   }
  // };
  // const handleMoveDown = async (orden) => {
  //   const reorderedDetalleModulo = [...detalleModulo];
  //   const index = reorderedDetalleModulo.findIndex(
  //     (detalle) => detalle.orden === orden
  //   );

  //   if (index < detalleModulo.length - 1) {
  //     // Intercambia el elemento actual con el siguiente
  //     [reorderedDetalleModulo[index], reorderedDetalleModulo[index + 1]] = [
  //       reorderedDetalleModulo[index + 1],
  //       reorderedDetalleModulo[index],
  //     ];

  //     // Actualiza el orden después del intercambio
  //     reorderedDetalleModulo[index].orden = index + 1;
  //     reorderedDetalleModulo[index + 1].orden = index + 2;

  //     try {
  //       // Llamada a la API para actualizar el orden en la base de datos
  //       await supabase.from("elementos").upsert(
  //         [
  //           {
  //             id: reorderedDetalleModulo[index].id,
  //             orden: reorderedDetalleModulo[index].orden,
  //           },
  //           {
  //             id: reorderedDetalleModulo[index + 1].id,
  //             orden: reorderedDetalleModulo[index + 1].orden,
  //           },
  //         ],
  //         { onConflict: ["id"] }
  //       );

  //       // No olvides manejar posibles errores de la API
  //     } catch (error) {
  //       console.error(
  //         "Error al actualizar el orden en la base de datos:",
  //         error.message
  //       );
  //     }
  //     setDetalleModulo(reorderedDetalleModulo);
  //   }
  // };

  //***************/ acciones de eliminar, editar y visualizar elementos del modulo

  //view
  // const handleViewDetalleModulo = (id) => {
  //   // Lógica para la operación de ver
  //   console.log(`Ver elemento con ID ${id}`);
  // };

  return <div>{detalleModulo?.length > 0 ? <ListaModulo /> : <Loader />}</div>;
  // return (
  //   <div className="flex flex-col gap-3">
  //     <Table aria-label="Detalle del Módulo">
  //       <Table.Head>
  //         <Table.HeadCell>ID {moduleId}</Table.HeadCell>
  //         <Table.HeadCell>Orden</Table.HeadCell>
  //         <Table.HeadCell>Tipo</Table.HeadCell>
  //         <Table.HeadCell>Título</Table.HeadCell>
  //         <Table.HeadCell>Acciones</Table.HeadCell>
  //       </Table.Head>
  //       <Table.Body>
  //         <Reorder.Group axis="y" values={items} onReorder={handleNewOrder}>
  //           {items.map((detalle) => (
  //             <Reorder.Item key={detalle.id} value={detalle.id}>
  //               <Table.Row
  //                 key={`${detalle.tipo}-${detalle.id}`}
  //                 className="hover:bg-gray-100   "
  //               >
  //                 <Table.Cell className="flex ">
  //                   <div
  //                     className="p-1 justify-center flex"
  //                     onClick={() => handleMoveUp(detalle.orden)}
  //                   >
  //                     <RiArrowUpLine />
  //                   </div>
  //                   <div
  //                     className="p-1 justify-center flex rounded-xl "
  //                     onClick={() => handleMoveDown(detalle.orden)}
  //                   >
  //                     <RiArrowDownLine />
  //                   </div>
  //                 </Table.Cell>
  //                 <Table.Cell>{detalle.orden}</Table.Cell>
  //                 <Table.Cell>{detalle.tipo || ""}</Table.Cell>
  //                 <Table.Cell>{detalle.titulo || ""}</Table.Cell>
  //                 <Table.Cell className="flex gap-2 items-center">
  //                   <Link
  //                     to={`/dashboard/modulo/${moduleId}/${detalle.tipo}/${detalle.id}`}
  //                   >
  //                     <IconButton
  //                       onClick={() => handleEditDetalleModulo(detalle.id)}
  //                       className=" "
  //                     >
  //                       <RiEdit2Fill className="" />
  //                     </IconButton>
  //                   </Link>
  //                   <IconButton
  //                     className=""
  //                     onClick={() => handleDeleteDetalleModulo(detalle.id)}
  //                   >
  //                     <RiDeleteBin4Fill className="" />
  //                   </IconButton>
  //                   <IconButton
  //                     className=""
  //                     onClick={() => handleViewDetalleModulo(detalle.id)}
  //                   >
  //                     <RiEyeFill className="" />
  //                   </IconButton>
  //                 </Table.Cell>
  //               </Table.Row>
  //             </Reorder.Item>
  //           ))}

  //           {/* {items.map((detalle) => (
  //             <Reorder.Item key={detalle.id} value={detalle.id}>
  //               <TableRow
  //                 key={`${detalle.tipo}-${detalle.id}`}
  //                 className="hover:bg-gray-100   "
  //               >
  //                 <Table.Cell className="flex ">
  //                   <div
  //                     className="p-1 justify-center flex"
  //                     onClick={() => handleMoveUp(detalle.orden)}
  //                   >
  //                     <RiArrowUpLine />
  //                   </div>
  //                   <div
  //                     className="p-1 justify-center flex rounded-xl "
  //                     onClick={() => handleMoveDown(detalle.orden)}
  //                   >
  //                     <RiArrowDownLine />
  //                   </div>
  //                 </Table.Cell>
  //                 <Table.Cell>{detalle.orden}</Table.Cell>
  //                 <Table.Cell>{detalle.tipo || ""}</Table.Cell>
  //                 <Table.Cell>{detalle.titulo || ""}</Table.Cell>
  //                 <Table.Cell className="flex gap-2 items-center">
  //                   <Link
  //                     to={`/dashboard/modulo/${moduleId}/${detalle.tipo}/${detalle.id}`}
  //                   >
  //                     <IconButton
  //                       onClick={() => handleEditDetalleModulo(detalle.id)}
  //                       className=" "
  //                     >
  //                       <RiEdit2Fill className="" />
  //                     </IconButton>
  //                   </Link>
  //                   <IconButton
  //                     className=""
  //                     onClick={() => handleDeleteDetalleModulo(detalle.id)}
  //                   >
  //                     <RiDeleteBin4Fill className="" />
  //                   </IconButton>
  //                   <IconButton
  //                     className=""
  //                     onClick={() => handleViewDetalleModulo(detalle.id)}
  //                   >
  //                     <RiEyeFill className="" />
  //                   </IconButton>
  //                 </Table.Cell>
  //               </TableRow>
  //             </Reorder.Item>
  //           ))} */}
  //         </Reorder.Group>
  //       </Table.Body>
  //     </Table>
  //   </div>
  // );
};

export default TablaModulo;
