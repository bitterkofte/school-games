import { useState } from "react";
import MultipleChoiceQuestion from "./questions/MultipleChoiceQuestion";
import SingleChoiceQuestion from "./questions/SingleChoiceQuestion";
import { useDispatch, useSelector } from "react-redux";
import { nextQuestionHandler, showAnswerHandler } from "../redux/questionSlice";
import SortingQuestion from "./questions/SortingQuestion";

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
    }
  };

  return (
    <div>
      <div className="max-w-md mx-auto p-4 bg-neutral-700 rounded-xl shadow-lg space-y-4">
        <h2 className="text-3xl font-semibold">
          {quiz.questions[quiz.currentQuestionNo].text}
        </h2>

        {QuestionSelector()}

        <button
          onClick={handleSave}
          className="mt-4 px-4 py-2 text-white rounded bg-orange-900 hover:bg-orange-700 disabled:opacity-50 cursor-pointer transition-all"
          disabled={quiz.showAnswer}
        >
          Check
        </button>
        <button
          onClick={() => dispatch(nextQuestionHandler())}
          className="mt-4 px-4 py-2 text-white rounded bg-orange-900 hover:bg-orange-700 disabled:opacity-50 cursor-pointer transition-all"
          disabled={!quiz.showAnswer}
        >
          Next
        </button>

        {quiz.showAnswer && (
          <div className="mt-4 text-lg font-medium">
            {quiz.correctness ? (
              <span className="text-green-600">✅ Correct!</span>
            ) : (
              <span className="text-red-600">❌ Wrong. Try again!</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default Question;
