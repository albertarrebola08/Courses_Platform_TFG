import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../GlobalContext';
import { supabase } from '../../supabase/supabaseClient';
import TablaModulo from '../../components/Modulos/TablaModulo';
import { RiVideoFill,RiBookOpenFill,RiFileEditFill,RiListCheck3,RiWalkFill,RiDeleteBin4Fill,RiPencilFill, RiDeleteBin2Line} from "react-icons/ri";
import { LuDices } from "react-icons/lu";
import { MdBackHand } from "react-icons/md";
import FormAddElement from '../../components/Modulos/FormAddElement';
import { useParams } from 'react-router-dom';


const ModuloPage = () => {
  const { detalleModulo } = useContext(GlobalContext);
  //const [showForm, setShowForm] = useState()
  const [moduloInfo, setModuloInfo] = useState('Cargando...');
  const { moduleId } = useParams();

  useEffect(() => {
    const obtenerInfoModulo = async (moduleId) => {
      try {
        const { data, error } = await supabase
          .from('modulo')
          .select('*')
          .eq('id', moduleId);

        if (error) {
          throw error;
        }

        setModuloInfo(data);
      } catch (error) {
        console.error('Error al obtener el módulo:', error.message);
      }
    };

    obtenerInfoModulo(moduleId);
  }, []);
  

  const obtenerIconoPorTipo = (tipo) => {
    
    switch (tipo) {
      case 'video':
        return <RiVideoFill className='text-xl'/>
        
      case 'material':
        return <RiBookOpenFill className='text-xl'/>
        
      case 'acciona':
        return <MdBackHand className='text-xl'/>
      
      case 'examen':
        return <RiFileEditFill className='text-xl'/>

      case 'quiz':
        return <RiListCheck3 className='text-xl'/>

      case 'numeral':
        return <LuDices className='text-xl'/>

      case 'camino':
        return <RiWalkFill className='text-xl'/>
 
    }
  };


  return (
    <main>
  
      <FormAddElement />

      <div className='flex flex-wrap gap-4'>
        <TablaModulo className=""/>
        <div className='bg-white rounded-lg p-5'>
          <span className='flex gap-2 items-center'><h1 className='text-black text-lg'>{moduloInfo[0].nombre}</h1><RiPencilFill className='text-gray-400'/></span>
          <span className='flex gap-2 items-center text-md'><h2>{moduloInfo[0].descripcion}</h2><RiPencilFill className='text-gray-400'/></span>

          {/* Mostrar lista de divs según el orden en detalle.orden */}
          {detalleModulo
            .sort((a, b) => a.orden - b.orden)
            .map((detalle) => (
              <div className="flex items-center gap-4 border border-gray-300 my-3 rounded-lg p-3" key={`${detalle.tipo}-${detalle.id}`}>
                <div className="bg-gray-200 p-4 rounded-[50%]" role="img" aria-label="icono-tipo">
                  {obtenerIconoPorTipo(detalle.tipo)}
                  
                </div>
                <div>{detalle.titulo}</div>
                
              </div>
            ))}
        </div>
      </div>
      
    </main>
  );
};

export default ModuloPage;
