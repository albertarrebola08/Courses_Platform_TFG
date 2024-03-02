import DetalleNumeral from "../../components/Numerales/DetalleNumeral";
import PreviewQuestions from "../../components/PreviewQuestions";
const NumeralPage = () => {
  return (
    <div className="flex gap-12">
      <DetalleNumeral />
      <PreviewQuestions contentType={"numeral"} />
    </div>
  );
};

export default NumeralPage;
