import CursoForm from "../../components/Cursos/CursoForm";
import CardsCursos from "../../components/Cursos/CardsCursos";
import { useEffect, useState } from "react";
import { supabase } from "../../supabase/supabaseClient";
import { Breadcrumb } from "pol-ui";
import { TiHome } from "react-icons/ti";
import DetalleExamen from "../../components/Examenes/DetalleExamen";
import PreviewExam from "../../components/Examenes/PreviewExam";

const ExamenPage = () => {
  return (
    <div className="flex gap-12">
      <DetalleExamen />
      <PreviewExam />
    </div>
  );
};

export default ExamenPage;
