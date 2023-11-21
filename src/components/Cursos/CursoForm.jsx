import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabase/supabaseClient';
import {Input, Button, Textarea} from "@nextui-org/react";
import { RiAddFill, RiCloseFill, RiThumbUpFill } from "react-icons/ri"

const CursoForm = () => {
  const [cursoData, setCursoData] = useState({
    nombre: '',
    descripcion: '',
    imagen: '',
  });

const [addCourseSelected, setAddCourseSelected] = useState(false)
const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCursoData({ ...cursoData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.from('curso').insert([cursoData]);
      if (error) {
        throw error;
      }
      // Mostrar mensaje de éxito durante 3 segundos
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
     
      // Vaciar el formulario después de enviarlo
      setCursoData({
        nombre: '',
        descripcion:''
        // otras propiedades del formulario
      });
    } catch (error) {
      console.error('Error al crear el curso:', error.message);
    }
  };
  return (

    <div className='rounded-xl'>
      {showSuccessMessage && (
        <div variant="faded" className="absolute top-2 right-2 bg-green-800 text-white py-2 px-4 rounded">
          <RiThumbUpFill className="mr-2 text-white"/>Curs creat amb èxit
        </div>
      )}
        <Button  className="" onClick={() => setAddCourseSelected(!addCourseSelected)}>Crear curs  {addCourseSelected ? <RiCloseFill className='text-red-800'/> : <RiAddFill />}</Button>
        <form onSubmit={handleSubmit} className={`mt-4 flex flex-col gap-4  ${addCourseSelected ? "block" : "hidden"}`}>
              <Input 
                name="nombre"
                type="text" 
                label="Nom del curs" 
                value={cursoData.nombre}
                onChange={handleInputChange}
                required
                className=''
                
              />
            
            
              <Textarea
                placeholder="Introdueix la descripció"
                name="descripcion"
                value={cursoData.descripcion}
                onChange={handleInputChange}
              />
            

            <Button className="bg-green-200 w-full mt-4" type="submit">Crear curs</Button>

        </form>
      </div>
  );
}
export default CursoForm;
