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


const Dashboard = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [cursos, setCursos] = useState([]);
    
    
        
  return (
    <div className="container-fluid ">
        <header>
            <div className="logo"></div>
            <div>Bienvenido Albert </div>
            <div className="settings"></div>
            <div className="profile"></div>
        </header>
        <aside></aside>
        <main></main>
        <header></header>
    </div>
  )
}
export default Dashboard;