import { useSelector } from "react-redux";
import Question from "../Question";
import AnimatedNumbers from "../AnimatedNumbers";

const QuestionLayout = () => {
  const { points } = useSelector((state) => state.question);
  return (
    <>
      <div className="fixed top-5 right-5 text-4xl font-extrabold select-none">
        <AnimatedNumbers points={points} />
      </div>
      <div className="p-5 fixed top-0 left-0 w-full h-full z-10 flex flex-col items-center justify-center">
        <Question />
      </div>
    </>
  );
};
export default QuestionLayout;
