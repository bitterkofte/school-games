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
    <div className="py-5 px-7 lg:py-10 lg:px-16 w-full lg:w-[45rem] mx-auto backdrop-blur-sm bg-white/10 rounded-xl shadow-lg space-y-4">
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
                  dispatch(nextQuestionHandler());
                  if (toastRef.current !== null) {
                    toast.dismiss(toastRef.current);
                    toastRef.current = null;
                  }
                }
          }
          // onClick={() => dispatch(showAnswerHandler(!showAnswer))}
          disabled={selectedOptions.length === 0}
          className={` ${
            !showAnswer
              ? // " lg:left-1/2 lg:-translate-x-1/2"
                // : "lg:left-[34.7rem] lg:translate-x-0"
                //   "right-5 lg:right-1 translate-x-0"
                // : "right-1/4 lg:right-1/2 -translate-x-1/2"
                "right-1/2 translate-x-1/2"
              : "right-7 lg:right-16"
            // "right-1/2 translate-x-0"
            // : "right-5 -translate-x-1/2"
          } absolute px-6 py-2 text-white bg-orange-900 hover:bg-orange-700 disabled:opacity-50 rounded transform ease-in-out transition-all duration-500 hover:cursor-pointer disabled:cursor-not-allowed`}
        >
          {!showAnswer ? "Kontrol Et" : "Sonraki"}
        </button>
      </div>
    </div>
  );
};
export default Question;
