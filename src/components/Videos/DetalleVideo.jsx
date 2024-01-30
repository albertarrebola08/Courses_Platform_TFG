import { Button } from 'pol-ui';
import { useParams } from "react-router-dom";
import { supabase } from '../../supabase/supabaseClient';
import { useState, useEffect } from 'react';
import { TextInput, FileInput } from 'pol-ui';
import { RiArrowDownSLine,RiCheckLine  } from "react-icons/ri";

const DetalleVideo = () => {
  const [detalleVideo, setDetalleVideo] = useState('');
  const { elementoId } = useParams();
  const [titulo, setTitulo] = useState(''); 


  const handleChangeTitulo = (e) => {
    setTitulo(e.target.value);
  };

  
  const handleClickOK = async () => {
    try {
      // const { data:videoData, error } = await supabase
      //   .from('video')
      //   .update({ other_column: 'otherValue' })
      //   .eq('some_column', 'someValue')
      //   .select()

      console.log('Nuevo título enviado a Supabase:', titulo);
    } catch (error) {
      console.error('Error al actualizar el título:', error.message);
    }
  };


  useEffect(() => {
    const obtenerDetalleVideo = async (elementoId) => {
      try {
        console.log(parseInt(elementoId));

        const { data: videoData, error } = await supabase
          .from('video')
          .select("*")
          .eq('elemento_id', parseInt(elementoId));

        if (error) {
          console.error('Error al obtener el detalle del video:', error.message);
        } else {
          console.log('Detalle video: ', videoData);
          setDetalleVideo(videoData);

          setTitulo(videoData && videoData[0] && videoData[0].titulo || '');
        }
      } catch (error) {
        console.error('Error al obtener el detalle del video:', error.message);
      }
    };

    obtenerDetalleVideo(elementoId);
  }, [elementoId]);

  // Verifica si detalleVideo está disponible antes de intentar acceder a sus propiedades
  
  const urlVideo = detalleVideo && detalleVideo[0] && detalleVideo[0].url;

  return (
    <div className='p-8'>
      
      
      <div className='flex flex-col gap-3 w-[50%]'>
        <div className='flex items-center justify-between'>
          <TextInput
          className='w-[70%]'
          type='text'
          value={titulo}
          onChange={handleChangeTitulo}
          />
          <Button className="bg-gray-700 rounded-md text-white flex justify-center items-center gap-2" title="Guardar canvis" onClick={handleClickOK}>
            Guardar canvis <RiCheckLine/></Button>
        </div>
        
        <div className='bg-gray-300 p-2 box-border w-[100%] justify-start flex gap-2 items-center hover:border-gray-800 hover:border-b-3'>
          <h2>Cambiar video</h2>
          <RiArrowDownSLine></RiArrowDownSLine>
        </div>
        <FileInput></FileInput>

        <h2 className='font-bold'>Video actual:</h2>
          <video width="640" height="360" controls autoPlay>
            <source src={urlVideo} type="video/mp4"></source>
          </video>
        
      </div>
    </div>
  );
};

export default DetalleVideo;
