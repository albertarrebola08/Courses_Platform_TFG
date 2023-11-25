import { useEffect, useState } from 'react';
import React from 'react';
import CursoForm from '../components/Cursos/CursoForm';
import TablaModulos from '../components/Modulos/TablaModulos';
import TablaCursos from '../components/Cursos/TablaCursos';
import ModuloForm from '../components/Modulos/ModuloForm';
import { supabase } from '../supabase/supabaseClient';
import TablaCurso from '../components/Cursos/TablaCurso';
import TablaVideos from '../components/Videos/TablaVideos'; 
import TablaQuizs from '../components/Quizs/TablaQuizs'; 
import TablaExamens from '../components/Examenes/TablaExamens';
import TablaMateriales from '../components/Materiales/TablaMateriales';
import TablaAccionas from '../components/Accionas/TablaAccionas';
import TablaModulo from '../components/Modulos/TablaModulo';


const AdminDashboard = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [cursos, setCursos] = useState([]);
    
    
        
  return (
    <div className='container'>
        <div className="header w-screen bg-[#fec446] text-gray-800 p-4">
            <h1 className='text-2xl'>Panel de Administrador - Rispot Amazon Course</h1>
        </div>
        {/* CAJA DE OPCIONES  */}

        
        <div className='flex justify-start gap-8 p-8'>
            <div className='cardOption' onClick={() => setSelectedOption('Cursos')}>Cursos</div>
            <div className='cardOption' onClick={() => setSelectedOption('Modulos')}>Mòduls</div>
            <div className='cardOption flex flex-col gap-2'>Activitats
              <div className='subCardOption' onClick={() => setSelectedOption('Quizs')}>Quizs</div>
              <div className='subCardOption'>Activitat 2</div>
              <div className='subCardOption'>Activitat 3</div>
            </div>
            <div className='cardOption'>Usuaris</div>
            <div className='cardOption2' onClick={() => setSelectedOption('Examens')}>Examens</div>
            <div className='cardOption2' onClick={() => setSelectedOption('Materials')}>Materials</div>
            <div className='cardOption2' onClick={() => setSelectedOption('Accionas')}>Accionas</div>
        </div>
        <div className='content p-8'>
            
            {selectedOption === 'Cursos' && (
                <div className='flex justify-between gap-4'>
                    <CursoForm />
                    <TablaCursos />
                </div>
            )}
            {selectedOption === 'Modulos' && (
                <div className='flex justify-between gap-4'>
                    <ModuloForm cursos={cursos} />
                    <TablaModulos cursos={cursos} />
                </div>
            )}
            {selectedOption === 'Videos' && (
                <div className='flex justify-between gap-4'>
                    {/* <VideoForm/>  */}
                    <TablaVideos/>
                </div>
            )}
            {selectedOption === 'Quizs' && (
                <div className='flex justify-between gap-4'>
                    {/* <QuizForm/>  */}
                    <TablaQuizs/>
                </div>
            )}
            {selectedOption === 'Examens' && (
                <div className='flex justify-between gap-4'>
                    {/* <ExamenForm/>  */}
                    <TablaExamens/>
                </div>
            )}
            {selectedOption === 'Materials' && (
                <div className='flex justify-between gap-4'>
                    {/* <MaterialForm/>  */}
                    <TablaMateriales/>
                </div>
            )}
            {selectedOption === 'Accionas' && (
                <div className='flex justify-between gap-4'>
                    {/* <AccionaForm/>  */}
                    <TablaAccionas/>
                </div>
            )}

            
        </div>

    </div>//fin container
    
    
  );
};

export default AdminDashboard;
