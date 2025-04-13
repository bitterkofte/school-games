import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isCorrectHandler } from "../../redux/questionSlice";

const SingleChoiceQuestion = () => {
  // const question = {
  //   text: "Which one is a JavaScript framework?",
  //   options: [
  //     { id: "a", text: "React" },
  //     { id: "b", text: "Laravel" },
  //     { id: "c", text: "Django" },
  //     { id: "d", text: "Flask" },
  //   ],
  //   correctAnswer: "a",
  // };

  const [selected, setSelected] = useState(null);
  const quiz = useSelector((state) => state.question);
  const dispatch = useDispatch();
  // const [showAnswer, setShowAnswer] = useState(false);

  const handleSelect = (id) => {
    if (!quiz.showAnswer) setSelected(id);
  };

  // const handleSave = () => {
  //   // setShowAnswer(true);
  //   dispatch(showAnswerHandler(true));
  //   dispatch(isCorrectHandler(selected === question.correctAnswer));
  // };

  useEffect(() => {
    dispatch(
      isCorrectHandler(
        selected === quiz.questions[quiz.currentQuestionNo].correctAnswer
      )
    );
  }, [selected]);

  // const isCorrect = selected === question.correctAnswer;

  return (
    // <div className="max-w-md mx-auto p-4 border rounded-xl shadow-lg space-y-4">
    //   <h2 className="text-3xl font-semibold">{question.text}</h2>
    <div className="space-y-2">
      {quiz.questions[quiz.currentQuestionNo].options.map((opt) => {
        const isSelected = selected === opt.id;
        const isCorrectAnswer =
          quiz.questions[quiz.currentQuestionNo].correctAnswer === opt.id;

        const base = "w-full p-3 border-2 rounded-xl transition";
        const hoverStyle = quiz.showAnswer
          ? "cursor-not-allowed"
          : "cursor-pointer hover:bg-sky-900";
        const selectedStyle =
          isSelected && !quiz.showAnswer ? "bg-sky-700 border-sky-500" : "";
        const correctStyle =
          quiz.showAnswer && isCorrectAnswer
            ? "border-green-600 bg-green-700 font-bold"
            : "";
        const incorrectStyle =
          quiz.showAnswer && isSelected && !isCorrectAnswer
            ? "border-red-500 bg-red-700"
            : "";

        return (
          <div
            key={opt.id}
            className={`${base} ${hoverStyle} ${selectedStyle} ${correctStyle} ${incorrectStyle}`}
            onClick={() => handleSelect(opt.id)}
          >
            {opt.text}
          </div>
        );
      })}
      {/* </div> */}

      {/* <button
        onClick={handleSave}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        disabled={showAnswer || selected === null}
      >
        Save
      </button>

      {showAnswer && (
        <div className="mt-4 text-lg font-medium">
          {isCorrect ? (
            <span className="text-green-600">✅ Correct!</span>
          ) : (
            <span className="text-red-600">
              ❌ Wrong. The correct answer is "
              {
                question.options.find((o) => o.id === question.correctAnswer)
                  .text
              }
              "
            </span>
          )}
        </div>
      )} */}
    </div>
  );
};

export default SingleChoiceQuestion;
