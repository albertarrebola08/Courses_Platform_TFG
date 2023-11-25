

// Esta es la tabla donde se visualizan las caracteristicas de TODOS los modulos de un CURSO
    // - nombre del modulo
    // - id del curso
    // - descripción
    // - acciones (editar, borrar)

    import React, { useState, useEffect } from "react";
    import { supabase } from '../../supabase/supabaseClient';
    import { RiEditFill, RiDeleteBin7Fill,RiCheckFill,RiCloseFill, RiEyeFill,RiFilter3Line } from 'react-icons/ri';
    import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";
    import FiltroCurso from '../Filtros/FiltroCurso'
    import TablaModulo from "../Modulos/TablaModulo";

    import {
      Table,
      TableHeader,
      TableColumn,
      TableBody,
      TableRow,
      TableCell,
      Button,
      Select, 
      SelectItem,
      Input
    } from "@nextui-org/react";



    const TablaModulos = ({cursos}) => {
        const [moduloData, setModuloData] = useState({
            id:'',
            nombre: '',
            curso_id : '',
          });
        const [modulos, setModulos] = useState([]);
        const [cursoSeleccionado, setCursoSeleccionado] = useState(null);
        const [selectedModule, setSelectedModule] = useState({ id: null, nombre: null });
        const { isOpen, onOpen, onClose } = useDisclosure();


        useEffect(() => {
            const fetchModulos = async () => {
              try {
            
                if (cursoSeleccionado === null) {
                  // Consulta todos los módulos cuando no se ha seleccionado un curso
                  const { data, error } = await supabase
                    .from('modulo')
                    .select('');
          
                  if (error) {
                    console.error('Error al obtener los módulos:', error.message);
                  } else {
                    setModulos(data);
                  }
                } else {
                  // Consulta módulos relacionados con el curso seleccionado
                  let { data, error } = await supabase
                    .from('curso_modulo')
                    .select('modulo_id')
                    .eq('curso_id', cursoSeleccionado);
          
                  if (error) {
                    console.error('Error al obtener los módulos:', error.message);
                  } else {
                    // Obtén los IDs de los módulos relacionados con el curso seleccionado
                    const moduloIds = data.map((cursoModulo) => cursoModulo.modulo_id);
          
                    // Ahora puedes consultar los detalles completos de los módulos usando los IDs obtenidos
                    const { data: moduloData, error: moduloError } = await supabase
                      .from('modulo')
                      .select('*')
                      .in('id', moduloIds); // Filtra por los IDs de los módulos relacionados
          
                    if (moduloError) {
                      console.error('Error al obtener los detalles de los módulos:', moduloError.message);
                    } else {
                      setModulos(moduloData); // Establece los módulos obtenidos en el estado
                    }
                  }
                }
              } catch (error) {
                console.error('Error al obtener los módulos:', error.message);
              }
            };
          
            // Llama a la función para obtener módulos cuando el componente se monta
            fetchModulos();
          }, []); // Dependencia actualizada a cursoSeleccionado
          
    
        const handleEditModulo = (id,nombre) => {
            // Lógica para editar el mod con el ID proporcionado
            console.log(`Editar modulo con ID: ${id}`);
            setSelectedModule({id,nombre});
            onOpen();
        };
        
        const handleDeleteModulo = async (id, nombre) => {
            // Lógica para eliminar el modulo con el ID proporcionado
            const userConfirmed = window.confirm(`Estàs segur d'eliminar el mòdul: ${nombre}`);
            if (userConfirmed) {
              const { error } = await supabase
                  .from('modulo')
                  .delete()
                  .eq('id',id)
            }
        };
        const handleViewModulo = (id, nombre) => {
          // Al hacer clic en el ojo, guarda el módulo seleccionado 
          console.log(`Ver modulo con ID: ${id} y nombre ${nombre}`);
          
        };
        const handleInputChange = (e) => {
            const { name, value } = e.target;
            setModuloData((prevData) => ({
              ...prevData,
              [name]: value,
            }));
            setCursoSeleccionado(value); // Establece el nombre del curso seleccionado en el estado
          };
    //manejo para abrir el modal
          const handleOpen = (size) => {
            setSize(size)
            onOpen();
          }

        return (
            <div className="flex flex-col gap-3">
                <FiltroCurso cursos={cursos} moduloData={moduloData} onInputChange={handleInputChange} />
                
              <Table
                  aria-label="Tabla de Modulos"
              >
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
                      <TableCell>{modulo.have_acciona ? <RiCheckFill className="text-green-600"/> : <RiCloseFill className="text-red-600"/>}</TableCell>
                      <TableCell>{modulo.have_quiz ? <RiCheckFill className="text-green-600"/> : <RiCloseFill className="text-red-600"/>  }</TableCell>
                      <TableCell>{modulo.have_act2 ? <RiCheckFill className="text-green-600"/> : <RiCloseFill className="text-red-600"/>  }</TableCell>
                      <TableCell>{modulo.have_act3 ? <RiCheckFill className="text-green-600"/> : <RiCloseFill className="text-red-600"/>  }</TableCell>
                      <TableCell>{modulo.have_examen ? <RiCheckFill className="text-green-600"/> : <RiCloseFill className="text-red-600"/>}</TableCell>
                      
                      <TableCell className="flex gap-4 items-center">
                          <Button className="bg-blue-400" onClick={() => handleEditModulo(modulo.id, modulo.nombre)}>
                          <RiEditFill className="text-white"/>
                          </Button>
                          <Button className="bg-red-400" onClick={() => handleDeleteModulo(modulo.id, modulo.nombre)}>
                          <RiDeleteBin7Fill className="text-white"/>
                          </Button>
                          <Button className="bg-gray-400" onClick={() => handleViewModulo(modulo.id, modulo.nombre)}>
                            <RiEyeFill className="text-lg text-white" />
                          </Button>
                      </TableCell>
                      </TableRow>
                  ))}
                  </TableBody>
              </Table>
              
              {/* AQUI VA EL MODAL FULL CON LA TABLA DETALLE DEL MODULO */}
              <Modal
                size='full'
                isOpen={isOpen}
                onClose={onClose}
                className="m-8 p-8"
              >
                <ModalContent>
                  <ModalHeader className="flex gap-1">Elements del mòdul: <span className="text-gray-600">{selectedModule.nombre}</span></ModalHeader>
                  <ModalBody className="flex justify-between flex-row">
                    {/* Contenido del modal con la información del módulo seleccionado */}
                    <TablaModulo className="" moduleId={selectedModule.id} />
                    <div><h1>Hola mitad</h1></div>
                    {/* Otros detalles del módulo... */}
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Cerrar
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
                          
            </div>
        );
        }
        
        export default TablaModulos;
    