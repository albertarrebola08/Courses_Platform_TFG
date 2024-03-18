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
          .select("*");

        if (error) {
          console.log(error);
        } else {
          console.log("fetch correcto ");

          //formateo la fecha
          const formatDate = (dateString) => {
            const date = new Date(dateString);
            const options = {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            };
            return date.toLocaleDateString("es-ES", options);
          };

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
              // Formatear la fecha
              const formattedDate = formatDate(request.created_at);
              request.formattedDate = formattedDate;

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
                    request.cursoNombre = course.nombre;
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

  // Función para aceptar una solicitud y realizar la inserción de elementos del curso
  const handleAccept = async (requestId, setRequests, requests) => {
    try {
      // Actualizar la solicitud en la base de datos
      await supabase
        .from("curso_usuario")
        .update({ solicitud: true })
        .eq("id", requestId);

      // Actualizar el estado de la solicitud para reflejar que ha sido aceptada
      const updatedRequests = requests.map(async (request) => {
        if (request.id === requestId) {
          // Añadir el estado de solicitud aceptada
          request.solicitud = true;
          console.log(request);
          // Verificar si ya existe una solicitud para este usuario y curso
          const existingRequest = await supabase
            .from("curso_usuario")
            .select("*")
            .eq("curso_id", request.curso_id)
            .eq("usuario_id", request.usuario_id)
            .eq("solicitud", true)
            .single();

          if (existingRequest) {
            console.log("Ya existe una solicitud para este usuario y curso.");
            // Aquí puedes manejar la lógica para notificar al usuario de que ya existe una solicitud
            return request;
          } else {
            // Llamar a la función de inserción mediante RPC
            await supabase.rpc("insertar_elementos_curso_usuario", {
              curso_id_param: request.curso_id,
              usuario_id: request.usuario_id,
            });
            console.log(`Solicitud aceptada: ${requestId}`);
          }
        }
        return request;
      });
      await Promise.all(updatedRequests);
      setRequests(updatedRequests);
    } catch (error) {
      console.error("Error al aceptar la solicitud:", error);
    }
  };

  // Función para bloquear a un usuario en un curso (poner a false)
  const handleBlock = async (requestId, setRequests, requests) => {
    try {
      // Actualizar la solicitud en la base de datos
      await supabase
        .from("curso_usuario")
        .update({ solicitud: false })
        .eq("id", requestId);

      // Actualizar el estado de la solicitud para reflejar que ha sido aceptada
      const updatedRequests = requests.map((request) =>
        request.id === requestId ? { ...request, solicitud: false } : request
      );

      setRequests(updatedRequests);

      console.log(`acceso bloqueado: ${requestId}`);
    } catch (error) {
      console.error("Error al bloquear acceso:", error);
    }
  };

  // Función para eliminar solicitud
  const handleDelete = async (requestId) => {
    try {
      // Actualizar la solicitud en la base de datos
      await supabase.from("curso_usuario").delete().eq("id", requestId);

      console.log(`solicitud eliminada: ${requestId}`);
    } catch (error) {
      console.error("Error al eliminar la solicitud:", error);
    }
  };

  return (
    <div>
      <Table striped="true" hoverable="true" hasShadow="true">
        <Table.Head>
          <Table.HeadCell>Fecha de acceso</Table.HeadCell>
          <Table.HeadCell>Usuario</Table.HeadCell>
          <Table.HeadCell>Curso</Table.HeadCell>
          <Table.HeadCell>Acceso</Table.HeadCell>
          <Table.HeadCell>Acciones</Table.HeadCell>
        </Table.Head>

        <Table.Body className="divide-y">
          {requests.map((request) => (
            <Table.Row key={request.id}>
              <Table.Cell>{request.formattedDate}</Table.Cell>
              <Table.Cell>{request.userEmail}</Table.Cell>
              <Table.Cell>{request.cursoNombre}</Table.Cell>
              <Table.Cell>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {request.solicitud ? <RiCheckFill /> : <RiCloseFill />}
                  </div>
                  {/* Botón para aceptar la solicitud */}
                  {!request.solicitud && (
                    <IconButton
                      title="Aceptar"
                      onClick={() =>
                        handleAccept(request.id, setRequests, requests)
                      }
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
                    title="Bloquear acceso al curso"
                    onClick={() =>
                      handleBlock(request.id, setRequests, requests)
                    }
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
