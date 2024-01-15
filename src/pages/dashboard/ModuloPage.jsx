import React, { useContext } from 'react';
import { GlobalContext } from '../../GlobalContext';
import { Button } from 'pol-ui';
import TablaModulo from '../../components/Modulos/TablaModulo';
import { RiVideoFill,RiBookOpenFill,RiFileEditFill,RiListCheck3,RiWalkFill      } from "react-icons/ri";
import { LuDices } from "react-icons/lu";
import { MdBackHand } from "react-icons/md";


const ModuloPage = () => {
  const { detalleModulo } = useContext(GlobalContext);

  const obtenerIconoPorTipo = (tipo) => {
    
    switch (tipo) {
      case 'video':
        return <RiVideoFill className='text-3xl'/>
        
      case 'material':
        return <RiBookOpenFill className='text-3xl'/>
        
      case 'acciona':
        return <MdBackHand className='text-3xl'/>
      
      case 'examen':
        return <RiFileEditFill className='text-3xl'/>

      case 'quiz':
        return <RiListCheck3 className='text-3xl'/>

      case 'numeral':
        return <LuDices className='text-3xl'/>

      case 'camino':
        return <RiWalkFill className='text-3xl'/>


        
    }
  };

  return (
    <div className='flex flex-wrap gap-5'>
      <TablaModulo className=""/>
      <div className='bg-white rounded-lg p-8'>
        <h1 className='text-black'>Modulo 1: Introducción al mercado</h1>

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
  );
};

export default ModuloPage;
