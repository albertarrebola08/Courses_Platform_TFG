import { IconButton, Table } from "pol-ui";
import React, { useEffect, useState } from "react";
import { supabase } from "../supabase/supabaseClient";
import {
  RiCheckFill,
  RiCloseFill,
  RiDeleteBinFill,
  RiEdit2Fill,
  RiForbid2Fill,
} from "react-icons/ri";

function TablaSolicitudes() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const { data: requestsInfo, error } = await supabase
          .from("curso_usuario")
          .select("*")
          .range(0, 9);

        if (error) {
          console.log(error);
        } else {
          console.log("fetch correcto ");

          // Obtener el email del usuario
          const userIds = requestsInfo.map((request) => request.usuario_id); // Obtener los IDs de usuario de las solicitudes

          // Consultar la tabla users para obtener los emails de los usuarios
          const { data: users, error: userError } = await supabase
            .from("perfiles")
            .select("user_id, email")
            .in("user_id", userIds); // Filtrar por los IDs de usuario obtenidos

          if (userError) {
            console.log(
              "Error al obtener los emails de los usuarios:",
              userError
            );
          } else {
            // Mapear los emails de los usuarios a las solicitudes correspondientes
            const updatedRequests = requestsInfo.map((request) => {
              const user = users.find(
                (user) => user.user_id === request.usuario_id
              );
              if (user) {
                request.userEmail = user.email; // Añadir el email del usuario a la solicitud
              }
              return request;
            });

            const coursesIds = updatedRequests.map(
              (request) => request.curso_id
            ); // Obtener los IDs de curso de las solicitudes
            const { data: courses, error: courseError } = await supabase
              .from("curso")
              .select("id, nombre")
              .in("id", coursesIds); // Filtrar por los IDs de curso obtenidos

            if (courseError) {
              console.log(
                "Error al obtener los nombres de los cursos:",
                courseError
              );
            } else {
              // Mapear los nombres de los cursos a las solicitudes correspondientes
              const updatedRequestsWithCourses = updatedRequests.map(
                (request) => {
                  const course = courses.find(
                    (course) => course.id === request.curso_id
                  );
                  if (course) {
                    request.cursoNombre = course.nombre; // Añadir el nombre del curso a la solicitud
                  }
                  return request;
                }
              );

              setRequests(updatedRequestsWithCourses);
            }
          }
        }
      } catch {
        console.log("error al conectar con supabase");
      }
    };
    fetchRequests();
  }, []);

  // Función para aceptar una solicitud
  const handleAccept = async (requestId) => {
    try {
      // Aquí debes implementar la lógica para aceptar la solicitud con el ID 'requestId'
      console.log(`Solicitud aceptada: ${requestId}`);
    } catch (error) {
      console.error("Error al aceptar la solicitud:", error);
    }
  };

  return (
    <div>
      <Table>
        <Table.Head>
          <Table.HeadCell>Usuario</Table.HeadCell>
          <Table.HeadCell>Curso</Table.HeadCell>
          <Table.HeadCell>Solicitud</Table.HeadCell>
          <Table.HeadCell>Acciones</Table.HeadCell>
        </Table.Head>

        <Table.Body className="divide-y">
          {requests.map((request) => (
            <Table.Row key={request.id}>
              <Table.Cell>{request.userEmail}</Table.Cell>
              <Table.Cell>{request.cursoNombre}</Table.Cell>
              <Table.Cell>
                <div className="flex items-center">
                  {request.solicitud ? <RiCheckFill /> : <RiCloseFill />}
                  {/* Botón para aceptar la solicitud */}
                  {!request.solicitud && (
                    <IconButton
                      title="Aceptar"
                      onClick={() => handleAccept(request.id)}
                    >
                      Aceptar
                    </IconButton>
                  )}
                </div>
              </Table.Cell>
              <Table.Cell>
                <div className="flex gap-1">
                  {/* Botón para eliminar */}
                  <IconButton
                    title="Eliminar"
                    onClick={() => handleDelete(request.id)}
                  >
                    <RiDeleteBinFill />
                  </IconButton>
                  {/* Botón para bloquear */}
                  <IconButton
                    title="Bloquear"
                    onClick={() => handleBlock(request.id)}
                  >
                    <RiForbid2Fill />
                  </IconButton>
                  {/* Botón para editar */}
                  <IconButton
                    title="Editar"
                    onClick={() => handleEdit(request.id)}
                  >
                    <RiEdit2Fill />
                  </IconButton>
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}

export default TablaSolicitudes;
