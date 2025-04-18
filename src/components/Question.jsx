import { useRef } from "react";
import MultipleChoiceQuestion from "./questions/MultipleChoiceQuestion";
import SingleChoiceQuestion from "./questions/SingleChoiceQuestion";
import { useDispatch, useSelector } from "react-redux";
import {
  nextQuestionHandler,
  pointHandler,
  showAnswerHandler,
} from "../redux/questionSlice";
import SortingQuestion from "./questions/SortingQuestion";
import TrueFalseQuestion from "./questions/TrueFalseQuestion";
import TurkiyeProvinceQuestion from "./questions/TurkiyeProvinceQuestion";
import { toast } from "sonner";
import { windowSelector } from "../redux/windowSlice";

const Question = () => {
  const {
    questions,
    currentQuestionNo,
    correctness,
    showAnswer,
    selectedOptions,
  } = useSelector((state) => state.question);
  const dispatch = useDispatch();
  const toastRef = useRef(null);

  const handleSave = () => {
    dispatch(showAnswerHandler(true));
    if (toastRef.current === null) {
      toastRef.current = correctness
        ? toast.success("Doğru cevap!", {
            duration: Infinity,
          })
        : toast.error("Yanlış cevap!", {
            duration: Infinity,
          });
    }
    if (correctness) dispatch(pointHandler(10));
  };

  const QuestionSelector = () => {
    switch (questions[currentQuestionNo].type) {
      case "single-choice":
        return <SingleChoiceQuestion />;
      case "multiple-choice":
        return <MultipleChoiceQuestion />;
      case "sorting":
        return <SortingQuestion />;
      case "true-false":
        return <TrueFalseQuestion />;
      case "turkiye-province":
        return <TurkiyeProvinceQuestion />;
    }
  };

  return (
    <div className="py-5 px-7 lg:py-10 lg:px-16 w-full lg:w-[45rem] mx-auto backdrop-blur-sm bg-white/10 rounded-xl shadow-2xl space-y-4">
      <h2 className="text-3xl font-semibold">
        {questions[currentQuestionNo].text}
      </h2>

      {QuestionSelector()}

      <div className=" h-12 mt-8">
        <button
          onClick={
            !showAnswer
              ? handleSave
              : () => {
                  if (toastRef.current !== null) {
                    toast.dismiss(toastRef.current);
                    toastRef.current = null;
                  }
                  if (currentQuestionNo < questions.length - 1)
                    dispatch(nextQuestionHandler());
                  else dispatch(windowSelector("results"));
                }
          }
          // onClick={() => dispatch(showAnswerHandler(!showAnswer))}
          disabled={selectedOptions.length === 0}
          className={` ${
            !showAnswer
              ? "right-1/2 translate-x-1/2 bg-sky-700 hover:bg-sky-800 disabled:hover:bg-sky-700"
              : currentQuestionNo === questions.length - 1
              ? "right-7 lg:right-16 bg-purple-600 hover:bg-purple-700 disabled:hover:bg-purple-600"
              : correctness
              ? "right-7 lg:right-16 bg-green-600 hover:bg-green-700 disabled:hover:bg-green-600"
              : "right-7 lg:right-16 bg-red-600 hover:bg-red-700 disabled:hover:bg-red-600"
          } absolute px-6 py-2 text-white disabled:opacity-50 rounded transform ease-in-out transition-all duration-500 hover:cursor-pointer disabled:cursor-not-allowed select-none`}
        >
          {!showAnswer
            ? "Kontrol Et"
            : currentQuestionNo < questions.length - 1
            ? "Sonraki"
            : "Bitir"}
        </button>
      </div>
    </div>
  );
};
export default Question;
