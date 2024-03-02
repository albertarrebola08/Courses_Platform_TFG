import DetalleQuiz from "../../components/Quizs/DetalleQuiz";
import PreviewQuestions from "../../components/PreviewQuestions";
const QuizPage = () => {
  return (
    <div className="flex justify-between px-4">
      <DetalleQuiz />
      <PreviewQuestions contentType={"quiz"} />
    </div>
  );
};

export default QuizPage;
