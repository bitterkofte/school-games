import { useState } from "react";
import MultipleChoiceQuestion from "./questions/MultipleChoiceQuestion";
import SingleChoiceQuestion from "./questions/SingleChoiceQuestion";
import { useDispatch, useSelector } from "react-redux";
import { nextQuestionHandler, showAnswerHandler } from "../redux/questionSlice";
import SortingQuestion from "./questions/SortingQuestion";
import TrueFalseQuestion from "./questions/TrueFalseQuestion";
import TurkiyeProvinceQuestion from "./questions/TurkiyeProvinceQuestion";

const Question = () => {
  const quiz = useSelector((state) => state.question);
  const dispatch = useDispatch();

  const handleSave = () => {
    dispatch(showAnswerHandler(true));
  };

  const QuestionSelector = () => {
    switch (quiz.questions[quiz.currentQuestionNo].type) {
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
    // w-full h-full relative z-10 flex flex-col items-center justify-center p-4
    <div className="relative py-10 px-16 w-[45rem] mx-auto backdrop-blur-sm bg-white/10 rounded-xl shadow-lg space-y-4">
      <h2 className="text-3xl font-semibold">
        {quiz.questions[quiz.currentQuestionNo].text}
      </h2>

      {QuestionSelector()}

      {/* <button
        onClick={handleSave}
        className="mt-4 px-4 py-2 text-white rounded bg-orange-900 hover:bg-orange-700 disabled:opacity-50 cursor-pointer transition-all"
        disabled={quiz.showAnswer || quiz.selectedOptions.length === 0}
      >
        Save
      </button>
      <button
        onClick={() => dispatch(nextQuestionHandler())}
        className="mt-4 px-4 py-2 text-white rounded bg-orange-900 hover:bg-orange-700 disabled:opacity-50 cursor-pointer transition-all"
        disabled={!quiz.showAnswer}
      >
        Next
      </button> */}

      <div className=" h-12 mt-8">
        {/* {!quiz.showAnswer ? (
          <button
            onClick={handleSave}
            disabled={quiz.selectedOptions.length === 0}
            className="absolute left-1/2 -translate-x-1/2 px-6 py-2 text-white bg-orange-900 hover:bg-orange-700 disabled:opacity-50 rounded transition-all duration-500"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => dispatch(nextQuestionHandler())}
            className="absolute right-0 px-6 py-2 text-white bg-orange-900 hover:bg-orange-700 rounded transition-all duration-500 translate-x-0 opacity-100"
          >
            Next
          </button>
        )} */}
        <button
          onClick={
            !quiz.showAnswer
              ? handleSave
              : () => dispatch(nextQuestionHandler())
          }
          // onClick={() => dispatch(showAnswerHandler(!quiz.showAnswer))}
          disabled={quiz.selectedOptions.length === 0}
          className={` ${
            !quiz.showAnswer
              ? "left-1/2 -translate-x-1/2"
              : "left-[34.7rem] translate-x-0"
          } absolute px-6 py-2 text-white bg-orange-900 hover:bg-orange-700 disabled:opacity-50 rounded transition-all duration-500 hover:cursor-pointer disabled:cursor-not-allowed`}
        >
          {!quiz.showAnswer ? "Kontrol Et" : "Sonraki"}
        </button>
      </div>

      {/* {quiz.showAnswer && (
        <div className="mt-4 text-lg font-medium">
          {quiz.correctness ? (
            <span className="text-green-600">✅ Doğru!</span>
          ) : (
            <span className="text-red-600">❌ Yanlış!</span>
          )}
        </div>
      )} */}
    </div>
  );
};
export default Question;
