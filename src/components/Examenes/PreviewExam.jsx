// import React, { useState } from "react";
// import { IconButton, Checkbox, Input } from "pol-ui";

// import { useParams } from "react-router-dom";
// import { supabase } from "../../supabase/supabaseClient";

// const PreviewExam = () => {
//   const [examen, setExamen] = useState(null);

//   const { elementoId } = useParams();

//   const handleFetchExamen = async () => {
//     try {
//       // Obtener el examen de la base de datos
//       const { data, error } = await supabase
//         .from("examen")
//         .select("desarrollo")
//         .eq("elemento_id", parseInt(elementoId))
//         .single();

//       if (error) {
//         console.error("Error al obtener el examen:", error.message);
//       } else {
//         console.log("Examen obtenido:", data);
//         setExamen(data?.desarrollo ?? null);
//       }
//     } catch (error) {
//       console.error("Error al obtener el examen:", error.message);
//     }
//   };

//   return (
//     <div className="flex gap-8">
//       <div className="flex flex-col">
//         <div className="rounded-xl flex flex-col gap-5">
//           {examen &&
//             examen.preguntas.map((pregunta) => (
//               <div key={pregunta.id} className="flex flex-col">
//                 <p>{`${pregunta.id}) ${pregunta.enunciado}`}</p>
//                 <img src={pregunta.imagen} className="w-auto" alt="" />
//                 {pregunta.tipo === "test" ? (
//                   <ul className="flex flex-col gap-2 mt-2">
//                     {pregunta.respuestas.map((respuesta) => (
//                       <li
//                         key={respuesta.id}
//                         className="flex items-center gap-2 text-gray-400"
//                       >
//                         <Checkbox />
//                         {respuesta.texto}
//                       </li>
//                     ))}
//                   </ul>
//                 ) : (
//                   <Input
//                     type="number"
//                     placeholder="Indica un número"
//                     className="w-fit mt-2"
//                   />
//                 )}
//               </div>
//             ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PreviewExam;
