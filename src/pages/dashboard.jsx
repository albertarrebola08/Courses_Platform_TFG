import { useEffect, useState } from 'react';
import React from 'react';
import CursoForm from '../components/Cursos/CursoForm';
import TablaModulos from '../components/Modulos/TablaModulos';
import CardsCursos from '../components/Cursos/CardsCursos';
import ModuloForm from '../components/Modulos/ModuloForm';
import { supabase } from '../supabase/supabaseClient';
import TablaCurso from '../components/Cursos/TablaCurso';
import TablaVideos from '../components/Videos/TablaVideos'; 
import TablaQuizs from '../components/Quizs/TablaQuizs'; 
import TablaExamens from '../components/Examenes/TablaExamens';
import TablaMateriales from '../components/Materiales/TablaMateriales';
import TablaAccionas from '../components/Accionas/TablaAccionas';
import TablaModulo from '../components/Modulos/TablaModulo';
import { RiArrowDropDownLine } from "react-icons/ri";
import { RiMenu2Line } from "react-icons/ri";
import { RiShapesFill } from "react-icons/ri";


const Dashboard = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [cursos, setCursos] = useState([]);
    
    const [openModuls, setOpenModuls] = useState(false)
    const [openActivitats, setOpenActivitats] = useState(false)
    const [openMenu,setOpenMenu] = useState(true)
    
  return (


  <div className="grid grid-cols- ">
    <div className="col-span-2  flex justify-between items-center p-4 bg-gray-50">
      <div className="flex w-1/2 gap-4 items-center text-2xl font-bold">
        <RiMenu2Line 
          className=' bg-[white] rounded-lg w-[40px] h-[40px]'
          onClick={() => setOpenMenu(prevState => !prevState)}
        />
        <img className="w-[46px] " src="https://static.vecteezy.com/system/resources/previews/001/192/065/non_2x/circle-logo-turbine-png.png" alt="" />Rispot Consulting</div>
      <div className=" flex gap-2 w-2/4 ">
        <span className='text-2xl font-bold'>Benvingut Pau !</span>
        <img className='w-[32px]' src="https://em-content.zobj.net/source/apple/237/waving-hand-sign_1f44b.png" alt="emoji-hello" />
      </div>
      <div className="w-1/4 text-lg font-bold">Columna 3</div>
    </div>

   
    <div className="col-span-2 grid grid-cols-5 gap-4 font-medium h-[100vh]">
      {/* sidebar */}
      <div className={openMenu ? 'col-span-1 bg-white p-4  py-5' : 'hidden'}>
        <ul className="space-y-4 text-lg ">
          <li className='hover:bg-gray-100 p-3 rounded-md' onClick={() => setSelectedOption('Cursos')}> 
            <div className='flex gap-2 items-center'>
              <RiShapesFill />
              <button  >Els meus cursos</button>
            </div>
          </li>
          <li className='hover:bg-gray-100 p-3 rounded-md'> 
            <div className='flex gap-2 items-center'>
              <RiShapesFill />
              <button >Preguntes diàries</button>
            </div>
          </li>
          <li className='hover: p-3 rounded-md'  >
            <div onClick={() => setOpenModuls(prevState => !prevState)} className='flex gap-2 items-center '>
              <RiShapesFill />
              <div className='flex gap-2 items-center'>
                <button onClick={() => setSelectedOption('Moduls')}>Mòduls</button> 
                <RiArrowDropDownLine/>
              </div>
            </div>
            <div className={openModuls ? 'block ms-8' : 'hidden'}>
              <ul className='flex flex-col gap-4 mt-4'>
                <li onClick={() => setSelectedOption('Videos')}><button>Videos</button></li>
                <li onClick={() => setSelectedOption('Accionas')}><button>Accionas</button></li>
                <li onClick={() => setSelectedOption('Materials')}><button>Materials</button></li>
                <li>
                  <div onClick={() => setOpenActivitats(prevState => !prevState)} className='flex gap-2 items-center '>
                    
                    <div className='flex gap-2 items-center'>
                      <button>Activitats</button> 
                      <RiArrowDropDownLine/>
                    </div>
                  </div>
                    <div className={openActivitats ? 'block ms-4' : 'hidden'}>
                      <ul className='flex flex-col gap-4 mt-4'>
                        <li onClick={() => setSelectedOption('Quizs')}><button >Quiz</button></li>
                        <li><button>Xat simulat</button></li>
                        <li><button>Resposta única</button></li>
                      </ul>
                    </div>
                </li>
                <li onClick={() => setSelectedOption('Quizs')}>
                <div className='flex gap-2 items-center'>
                  
                  <button>Exàmens</button>
                </div>
                </li>
                
              </ul>
            </div>
          </li>
          
          <li className='hover:bg-gray-100 p-3 rounded-md'>
          <div className='flex gap-2 items-center'>
              <RiShapesFill />
              <button>Usuaris i accessos</button>
            </div>
          </li>

          <hr />

          <li className='hover:bg-gray-100 p-3 rounded-md'>
          <div className='flex gap-2 items-center'>
              <RiShapesFill />
              <button>El meu perfil</button>
            </div>
          </li>
          <li className='hover:bg-gray-100 p-3 rounded-md'>
          <div className='flex gap-2 items-center'>
              <RiShapesFill />
              <button>Tancar sessió</button>
            </div>
          </li>
        </ul>
      </div>


      <div className="col-span-4 p-4 bg-blue-50">
        <div className='p-4 bg-white rounded-lg h-[100%]'>
          <h1 className="text-2xl font-bold mb-4">Contenido Principal</h1>
          {/* aqui va el contenido depende del clic en el menu sidebar */}

          {selectedOption === 'Cursos' && (
            <div className='flex flex-col gap-4'>
              <CursoForm/>
              <CardsCursos/>
            </div>
          )}
          {selectedOption === 'Videos' && (
            <div className='flex flex-col gap-4'>
              <TablaVideos/>
            </div>
          )}
          {selectedOption === 'Materials' && (
            <div className='flex flex-wrap gap-4'>
              <TablaMateriales/>
            </div>
          )}
          {selectedOption === 'Accionas' && (
            <div className='flex flex-col gap-4'>
              <TablaAccionas />
            </div>
          )}
          {selectedOption === 'Moduls' && (
            <div className='flex flex-col gap-4'>
              <ModuloForm cursos={cursos} />
              <TablaModulos cursos={cursos} />
            </div>
          )}
          {selectedOption === 'Quizs' && (
            <div className='flex flex-col gap-4'>
              <TablaQuizs/>
            </div>
          )}
          {selectedOption === 'Examens' && (
            <div className='flex flex-col gap-4'>
              <ModuloForm cursos={cursos} />
              <TablaModulos cursos={cursos} />
            </div>
          )}
        </div>
        
      </div>
    </div>

  
    <div className="col-span-2 p-4 bg-gray-200 mt-4">
      <p className="text-center">Pie de Página</p>
    </div>
  </div>


  )
}
export default Dashboard;