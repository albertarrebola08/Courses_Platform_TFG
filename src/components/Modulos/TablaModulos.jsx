

// Esta es la tabla donde se visualizan las caracteristicas de TODOS los modulos de un CURSO
    // - nombre del modulo
    // - id del curso
    // - descripción
    // - acciones (editar, borrar)

    import { useState, useEffect } from "react";
    import { supabase } from '../../supabase/supabaseClient';
    import { RiEditFill, RiDeleteBin7Fill,RiCheckFill,RiCloseFill, RiEyeFill } from 'react-icons/ri';
    import CreateModuloForm from "./CreateModuloForm";
    import { Button } from "pol-ui";

    import { Link, useParams } from "react-router-dom";

    
    import {
      Table,
      TableHeader,
      TableColumn,
      TableBody,
      TableRow,
      TableCell,
    } from "@nextui-org/react";


const TablaModulos = () => {

  
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
      have_camino: body.have_camino,
      have_numeral: body.have_numeral,

    }

    const { data: dataArray, error } = await supabase.from("modulo").insert(bodyBd).select();
    
    const data = dataArray[0];
    if (error) {
      throw error;
    }

    // Array de tipos de elementos
    const tiposElementos = ["video", "material", "examen", "quiz", "acciona", "camino", "numeral"];

    let ordenCounter = 1;
    // Iterar sobre los tipos de elementos y manejarlos
    for (const tipo of tiposElementos) {
      if (body[`have_${tipo}`]) {
        console.log(`have_${tipo}`)
        const cantidad = body[`${tipo}_cantidad`];        
        console.log('CANTIDADES: ', cantidad)

        

        for (let i = 0; i < cantidad; i++) {
          switch (tipo) {
            case "video": {
              // Registra en elementos
              const elementosData = {
                id_modulo: data.id,
                tipo: tipo,
                orden: ordenCounter,
                titulo: `Titulo de ${tipo} por defecto`,
              };
            
              // Inserta en la tabla "elementos" y obtén el ID generado
              const { data: elementosDataResult, error: elementosError } = await supabase
                .from("elementos")
                .insert([elementosData])
                .select();
            
              if (elementosError) {
                throw elementosError;
              }
            
              const elementoId = elementosDataResult[0].id;
            
              // Campos específicos para el tipo "video"
              const videoData = {
                titulo: "Titulo de video por defecto",
                url: "https://youtu.be/CH1XGdu-hzQ",
                modulo_id: data.id,
                tipo: tipo,
                elemento_id: elementoId,
              };
            
              // Inserta en la tabla "video"
              const { error: videoError } = await supabase.from("video").insert([videoData]);
            
              if (videoError) {
                throw videoError;
              }
            
              console.log("Video creado con éxito");
              break;
            }
            
            case "material": {
              // Registra en elementos
              const elementosData = {
                id_modulo: data.id,
                tipo: tipo,
                orden: ordenCounter,
                titulo: `Titulo de ${tipo} por defecto`,
              };
            
              console.log(elementosData)
              // Inserta en la tabla "elementos" y obtén el ID generado
              const { data: elementosDataResult, error: elementosError } = await supabase
                .from("elementos")
                .insert([elementosData])
                .select()
              
                console.log(elementosDataResult)
            
              if (elementosError) {
                throw elementosError;
              }
            
               const elementoId = elementosDataResult[0].id;
            
              const materialData = {
                descripcion: "Descripción por defecto",
                archivo_url: "https://drive.google.com/file/d/19_aCdifK2LTE03SR_GX1KDZ5hYdMa3UN/view?usp=share_link",
                modulo_id: data.id,
                tipo: tipo,
                elemento_id: elementoId,
              };
            
              // Inserta en la tabla "material"
              const { error: materialError } = await supabase.from("material").insert([materialData]);
            
              if (materialError) {
                throw materialError;
              }
            
              console.log("Material creado con éxito");
              break;
            }
            case "acciona": {
              // Registra en elementos
              const elementosData = {
                id_modulo: data.id,
                tipo: tipo,
                orden: ordenCounter,
                titulo: `Titulo de ${tipo} por defecto`,
              };
            
              // Inserta en la tabla "elementos" y obtén el ID generado
              const { data: elementosDataResult, error: elementosError } = await supabase
                .from("elementos")
                .insert([elementosData])
                .select();
            
              if (elementosError) {
                throw elementosError;
              }
            
              const elementoId = elementosDataResult[0].id;
            
              // Campos específicos para el tipo "acciona"
              const accionaData = {
                titulo: "Titulo de acciona por defecto",
                enunciado: "Enunciado por defecto",
                video_enunciado: "https://youtu.be/Es4u6GrV7hw",
                modulo_id: data.id,
                tipo: tipo,
                elemento_id: elementoId,
              };
            
              // Inserta en la tabla "acciona"
              const { error: accionaError } = await supabase.from("acciona").insert([accionaData]);
            
              if (accionaError) {
                throw accionaError;
              }
            
              console.log("Acciona creado con éxito");
              break;
            }
            
            case "examen": {
              // Registra en elementos
              const elementosData = {
                id_modulo: data.id,
                tipo: tipo,
                orden: ordenCounter,
                titulo: `Titulo de ${tipo} por defecto`,
              };
            
              // Inserta en la tabla "elementos" y obtén el ID generado
              const { data: elementosDataResult, error: elementosError } = await supabase
                .from("elementos")
                .insert([elementosData])
                .select();
            
              if (elementosError) {
                throw elementosError;
              }
            
              const elementoId = elementosDataResult[0].id;
            
              // Campos específicos para el tipo "examen"
              const examenData = {
                titulo: "Titulo de examen por defecto",
                enunciado: "Enunciado de examen por defecto",
                modulo_id: data.id,
                tipo: tipo,
                elemento_id: elementoId,
              };
            
              // Inserta en la tabla "examen"
              const { error: examenError } = await supabase.from("examen").insert([examenData]);
            
              if (examenError) {
                throw examenError;
              }
            
              console.log("Examen creado con éxito");
              break;
            }
            
            case "quiz": {
              // Registra en elementos
              const elementosData = {
                id_modulo: data.id,
                tipo: tipo,
                orden: ordenCounter,
                titulo: `Titulo de ${tipo} por defecto`,
              };
            
              // Inserta en la tabla "elementos" y obtén el ID generado
              const { data: elementosDataResult, error: elementosError } = await supabase
                .from("elementos")
                .insert([elementosData])
                .select();
            
              if (elementosError) {
                throw elementosError;
              }
            
              const elementoId = elementosDataResult[0].id;
            
              // Campos específicos para el tipo "quiz"
              const quizData = {
                titulo: "Titulo de quiz por defecto",
                descripcion: "Descripción de quiz por defecto",
                modulo_id: data.id,
                tipo: tipo,
                elemento_id: elementoId,
              };
            
              // Inserta en la tabla "actividad_quiz"
              const { error: quizError } = await supabase.from("actividad_quiz").insert([quizData]);
            
              if (quizError) {
                throw quizError;
              }
            
              console.log("Quiz creado con éxito");
              break;
            }
            case "numeral": {
              // Registra en elementos
              const elementosData = {
                id_modulo: data.id,
                tipo: tipo,
                orden: ordenCounter,
                titulo: `Titulo de ${tipo} por defecto`,
              };
            
              // Inserta en la tabla "elementos" y obtén el ID generado
              const { data: elementosDataResult, error: elementosError } = await supabase
                .from("elementos")
                .insert([elementosData])
                .select();
            
              if (elementosError) {
                throw elementosError;
              }
            
              const elementoId = elementosDataResult[0].id;
            
              // Campos específicos para el tipo "numeral"
              const numeralData = {
                titulo: "Titulo de actividad numeral por defecto",
                descripcion: "Descripcion de actividad numeral por defecto",
                modulo_id: data.id,
                tipo: tipo,
                elemento_id: elementoId,
              };
            
              // Inserta en la tabla "actividad_numeral"
              const { error: numeralError } = await supabase.from("actividad_numeral").insert([numeralData]);
            
              if (numeralError) {
                throw numeralError;
              }
            
              console.log("Actividad numeral creada con éxito");
              break;
            }
            
            case "camino": {
              // Registra en elementos
              const elementosData = {
                id_modulo: data.id,
                tipo: tipo,
                orden: ordenCounter,
                titulo: `Titulo de ${tipo} por defecto`,
              };
            
              // Inserta en la tabla "elementos" y obtén el ID generado
              const { data: elementosDataResult, error: elementosError } = await supabase
                .from("elementos")
                .insert([elementosData])
                .select();
            
              if (elementosError) {
                throw elementosError;
              }
            
              const elementoId = elementosDataResult[0].id;
            
              // Campos específicos para el tipo "camino"
              const caminoData = {
                titulo: "Titulo de actividad camino por defecto",
                descripcion: "Descripcion de actividad camino por defecto",
                modulo_id: data.id,
                tipo: tipo,
                elemento_id: elementoId,
              };
            
              // Inserta en la tabla "actividad_camino"
              const { error: caminoError } = await supabase.from("actividad_camino").insert([caminoData]);
            
              if (caminoError) {
                throw caminoError;
              }
            
              console.log("Actividad camino creada con éxito");
              break;
            }
            
            default:
              console.log(`Tipo de elemento no reconocido: ${tipo}`);
          }

          ordenCounter ++;
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
              <TableColumn>ACT QUIZ ?</TableColumn>
              <TableColumn>ACT NUMERAL ?</TableColumn>
              <TableColumn>ACT CAMINO ?</TableColumn>
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
                  <TableCell>{modulo.have_numeral ? <RiCheckFill className="text-green-600" /> : <RiCloseFill className="text-red-600" />}</TableCell>
                  <TableCell>{modulo.have_camino ? <RiCheckFill className="text-green-600" /> : <RiCloseFill className="text-red-600" />}</TableCell>
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
        
export default TablaModulos;
    