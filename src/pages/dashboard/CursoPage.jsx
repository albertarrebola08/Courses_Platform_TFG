/* eslint-disable no-case-declarations */
import { Link, useParams } from "react-router-dom";
import { supabase } from "../../supabase/supabaseClient";
import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { RiCheckFill, RiCloseFill, RiDeleteBin7Fill, RiEditFill, RiEyeFill } from "react-icons/ri";
import { Button } from "pol-ui";
import CreateModuloForm from "../../components/Modulos/CreateModuloForm";

const CursoPage = () => {
  const { id } = useParams();

  const [lastCreatedCourse, setLastCreatedCourse] = useState({}); // Estado para almacenar el último curso creado
  const [curso, setCurso] = useState({}); // Estado para almacenar los detalles del curso seleccionado
  const [modulos, setModulos] = useState([]); // Estado para almacenar los módulos relacionados con el curso seleccionado

  const [isLoading, setIsLoading] = useState(false); // Estado para almacenar el estado de carga

  const [error, setError] = useState(""); // Estado para almacenar los errores

  // Paso 1. Coger el ID del curso de la URL
  // Paso 2. Consultar los detalles del curso usando el ID
  // Paso 3. Mostrar los detalles del curso en la tabla

  const handleDeleteModulo = async (id, nombre) => {
    // Lógica para eliminar el modulo con el ID proporcionado
    const userConfirmed = window.confirm(`Estàs segur d'eliminar el mòdul: ${nombre}`);
    if (userConfirmed) {
      setIsLoading(true);
      const { error } = await supabase.from("modulo").delete().eq("id", id);
      setIsLoading(false);

      if (error) {
        setError(error?.message);
        alert(error?.message);
        return;
      }
      setLastCreatedCourse({
        id: id,
      });
    }
  };
  const handleViewModulo = (id, nombre) => {
    // Al hacer clic en el ojo, guarda el módulo seleccionado
    console.log(`Ver modulo con ID: ${id} y nombre ${nombre}`);
  };
  const handleSubmit = async (body) => {
    // Insertar el módulo en la tabla modulo y obtener su id
    const bodyBd = {
      nombre: body.nombre,
      descripcion: body.descripcion,
      have_video: body.have_video,
      have_material: body.have_material,
      have_examen: body.have_examen,
      have_quiz: body.have_quiz,
      have_acciona: body.have_acciona,
      have_act3: body.have_act2,
      have_act2: body.have_act3,

    }

    const { data: dataArray, error } = await supabase.from("modulo").insert(bodyBd).select();
    
    const data = dataArray[0];
    if (error) {
      throw error;
    }

    // Array de tipos de elementos
    const tiposElementos = ["video", "material", "examen", "quiz", "acciona", "act3", "act2"];

    // Iterar sobre los tipos de elementos y manejarlos
    for (const tipo of tiposElementos) {
      if (body[`have_${tipo}`]) {
        console.log(`have_${tipo}`)
        const cantidad = body[`${tipo}_cantidad`];        
        console.log('CANTIDADES: ', cantidad)
        for (let i = 0; i < cantidad; i++) {
          switch (tipo) {
            case "video":
              console.log('insertando video')
              // Lógica para insertar elemento de tipo video en la base de datos
              const videoData = {
                titulo: "Titulo de video por defecto",
                url: "https://youtu.be/CH1XGdu-hzQ",
                modulo_id: data.id,
                tipo: tipo,
              };
              const { error: videoError } = await supabase.from("video").insert([videoData]);
              if (videoError) {
                throw videoError;
              }
              console.log("Video creado con éxito");
              break;
            case "material":
              const materialData = {
                titulo: "Titulo de material por defecto",
                descripcion: "Descripción por defecto",
                archivo_url: "https://drive.google.com/file/d/19_aCdifK2LTE03SR_GX1KDZ5hYdMa3UN/view?usp=share_link",
                modulo_id: data.id,
                tipo: tipo,
              };
              const { error: materialError } = await supabase.from("material").insert([materialData]);
              if (materialError) {
                throw materialError;
              }
              console.log("material creado con éxito");
              break;
            case "acciona":
              const accionaData = {
                titulo: "Titulo de acciona por defecto",
                enunciado: "Enunciado por defecto",
                video_enunciado: "https://youtu.be/Es4u6GrV7hw",
                modulo_id: data.id,
                tipo: tipo,
              };
              const { error: accionaError } = await supabase.from("acciona").insert([accionaData]);
              if (accionaError) {
                throw accionaError;
              }
              console.log("acciona creado con éxito");
              break;
            case "examen":
              const examenData = {
                titulo: "Titulo de examen por defecto",
                enunciado: "Enunciado de examen por defecto",
                modulo_id: data.id,
                tipo: tipo,
              };
              const { error: examenError } = await supabase.from("examen").insert([examenData]);
              if (examenError) {
                throw examenError;
              }
              console.log("examen creado con éxito");
              break;
            case "quiz":
              const quizData = {
                titulo: "Titulo de quiz por defecto",
                descripcion: "Descripción de quiz por defecto",
                modulo_id: data.id,
                tipo: tipo,
              };
              const { error: quizError } = await supabase.from("actividad_quiz").insert([quizData]);
              if (quizError) {
                throw quizError;
              }
              console.log("quiz creado con éxito");
              break; // ...
            case "act2":
              const act2Data = {
                titulo: "Titulo de act2 por defecto",
                descripcion: "Descripcion de act2 por defecto",
                modulo_id: data.id,
                tipo: tipo,
              };
              const { error: act2Error } = await supabase.from("act2").insert([act2Data]);
              if (act2Error) {
                throw act2Error;
              }
              console.log("act2 creado con éxito");
              break;
            case "act3":
              const act3Data = {
                titulo: "Titulo de act3 por defecto",
                descripcion: "Descripcion de act3 por defecto",
                modulo_id: data.id,
                tipo: tipo,
              };
              const { error: act3Error } = await supabase.from("act3").insert([act3Data]);
              if (act3Error) {
                throw act3Error;
              }
              console.log("act3 creado con éxito");
              break;
            default:
              console.log(`Tipo de elemento no reconocido: ${tipo}`);
          }
        }
      }
    }

    // Insertar la relación en la tabla de intersección curso_modulo

    const { error: cursoModuloError } = await supabase
      .from("curso_modulo")
      .insert([
        {
          curso_id: id, // Id del curso seleccionado
          modulo_id: data.id, // Id del módulo recién insertado
        },
      ])
      .select();

    if (cursoModuloError) {
      throw cursoModuloError;
    }

    // Mostrar mensaje de éxito durante 3 segundos

    // Vaciar el formulario después de enviarlo

    console.log("Módulo creado y asociado al curso exitosamente:", data);

    setLastCreatedCourse(data);
  };

  useEffect(() => {
    const fetchModulos = async () => {
      setIsLoading(true);

      try {
        if (id) {
          // Consulta módulos relacionados con el curso seleccionado

          const { data: cursoData, error: cursoError } = await supabase.from("curso").select("nombre,descripcion").eq("id", id).order("id", { ascending: false });
          console.log(cursoData);

          if (cursoError) {
            console.error("Error al obtener los detalles del curso:", cursoError.message);
            setError(cursoError.message);
          } else {
            setCurso(cursoData[0]);
          }

          const { data, error } = await supabase.from("curso_modulo").select("modulo_id").eq("curso_id", id);

          if (error) {
            console.error("Error al obtener los módulos:", error.message);
            setError(error.message);
          } else {
            // Obtén los IDs de los módulos relacionados con el curso seleccionado
            const moduloIds = data.map((cursoModulo) => cursoModulo.modulo_id);

            // Ahora puedes consultar los detalles completos de los módulos usando los IDs obtenidos
            const { data: moduloData, error: moduloError } = await supabase.from("modulo").select("*").in("id", moduloIds); // Filtra por los IDs de los módulos relacionados

            if (moduloError) {
              console.error("Error al obtener los detalles de los módulos:", moduloError.message);
            } else {
              setModulos(moduloData); // Establece los módulos obtenidos en el estado
            }
          }
        }
      } catch (error) {
        console.error("Error al obtener los módulos:", error.message);
      }
      setIsLoading(false);
    };
    fetchModulos();
  }, [id, lastCreatedCourse]);

  if (error)
    return (
      <section className="flex gap-4 flex-col justify-center items-center">
        {error}
        <Button href="/dashboard/cursos">Volver</Button>
      </section>
    );

  if (modulos.length === 0 && !isLoading)
    return (
      <section className="flex gap-4 flex-col justify-center items-center">
        <p>No hay módulos para este curso</p>

        <CreateModuloForm cursoId={id} onSubmit={(body) => handleSubmit(body)} />

        <Button href="/dashboard/cursos">Volver</Button>
      </section>
    );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{curso.nombre}</h1>
      <h2>
        <span className="font-bold">Descripció:</span> {curso.descripcion}
      </h2>

      <CreateModuloForm cursoId={id} onSubmit={(body) => handleSubmit(body)} />

      {isLoading && <p>Cargando...</p>}

      {!isLoading && (
        <div className="flex flex-col gap-3">
          <Table aria-label="Tabla de Modulos">
            <TableHeader>
              <TableColumn>ID</TableColumn>
              <TableColumn>NOMBRE</TableColumn>
              <TableColumn>VIDEO ?</TableColumn>
              <TableColumn>MATERIAL ?</TableColumn>
              <TableColumn>ACCIONA ?</TableColumn>
              <TableColumn>QUIZ ?</TableColumn>
              <TableColumn>ACT2 ?</TableColumn>
              <TableColumn>ACT3 ?</TableColumn>
              <TableColumn>EXAMEN ?</TableColumn>
              <TableColumn>ACCIONES</TableColumn>
            </TableHeader>
            <TableBody>
              {modulos.map((modulo) => (
                <TableRow key={modulo.id}>
                  <TableCell>{modulo.id}</TableCell>
                  <TableCell>{modulo.nombre}</TableCell>
                  <TableCell>{modulo.have_video ? <RiCheckFill className="text-green-600" /> : <RiCloseFill className="text-red-600" />}</TableCell>
                  <TableCell>{modulo.have_material ? <RiCheckFill className="text-green-600" /> : <RiCloseFill className="text-red-600" />}</TableCell>
                  <TableCell>{modulo.have_acciona ? <RiCheckFill className="text-green-600" /> : <RiCloseFill className="text-red-600" />}</TableCell>
                  <TableCell>{modulo.have_quiz ? <RiCheckFill className="text-green-600" /> : <RiCloseFill className="text-red-600" />}</TableCell>
                  <TableCell>{modulo.have_act2 ? <RiCheckFill className="text-green-600" /> : <RiCloseFill className="text-red-600" />}</TableCell>
                  <TableCell>{modulo.have_act3 ? <RiCheckFill className="text-green-600" /> : <RiCloseFill className="text-red-600" />}</TableCell>
                  <TableCell>{modulo.have_examen ? <RiCheckFill className="text-green-600" /> : <RiCloseFill className="text-red-600" />}</TableCell>

                  <TableCell className="flex gap-4 items-center">
                    <Link to={`/dashboard/modulo/${modulo.id}`}>
                      <Button className="bg-blue-400">
                        <RiEditFill className="text-white" />
                      </Button>
                    </Link>

                    <Button className="bg-red-400" onClick={() => handleDeleteModulo(modulo.id, modulo.nombre)}>
                      <RiDeleteBin7Fill className="text-white" />
                    </Button>
                    <Button className="bg-gray-400" onClick={() => handleViewModulo(modulo.id, modulo.nombre)}>
                      <RiEyeFill className="text-lg text-white" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default CursoPage;
