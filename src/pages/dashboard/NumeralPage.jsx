import DetalleNumeral from "../../components/Numerales/DetalleNumeral";
import PreviewQuestions from "../../components/PreviewQuestions";
const NumeralPage = () => {
  return (
    <div className="flex justify-between px-4">
      <DetalleNumeral />
      <PreviewQuestions contentType={"numeral"} />
    </div>
  );
};

export default NumeralPage;
