import DetalleExamen from "../../components/Examenes/DetalleExamen";
import PreviewQuestions from "../../components/PreviewQuestions";

const ExamenPage = () => {
  return (
    <div className="flex gap-12">
      <DetalleExamen />
      <PreviewQuestions contentType={"examen"} />
    </div>
  );
};

export default ExamenPage;
