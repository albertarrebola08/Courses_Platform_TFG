import DetalleQuiz from "../../components/Quizs/DetalleQuiz";
import PreviewQuestions from "../../components/PreviewQuestions";
const QuizPage = () => {
  return (
    <div className="flex gap-12">
      <DetalleQuiz />
      <PreviewQuestions contentType={"quiz"} />
    </div>
  );
};

export default QuizPage;
