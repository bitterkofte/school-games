import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isCorrectHandler, selectedHandler } from "../../redux/questionSlice";
import { optionStyles } from "../../styles/optionStyles";

const SingleChoiceQuestion = () => {
  // const [selected, setSelected] = useState(null);
  const { questions, showAnswer, currentQuestionNo, selectedOptions } =
    useSelector((state) => state.question);
  const dispatch = useDispatch();

  const handleSelect = (id) => {
    // if (!showAnswer) setSelected(id);
    if (!showAnswer) dispatch(selectedHandler([id]));
  };

  // useEffect(() => {
  //   dispatch(
  //     isCorrectHandler(
  //       selectedOptions[0] === questions[currentQuestionNo].correctAnswer
  //     )
  //   );
  //   // dispatch(selectedHandler(selected)); // Update selected options in the store
  // }, [selectedOptions]);

  return (
    <div className="space-y-2">
      {questions[currentQuestionNo].options.map((opt) => {
        const isSelected = selectedOptions[0] === opt.id;
        const isCorrectAnswer = questions[currentQuestionNo].answer === opt.id;

        const optS = optionStyles(showAnswer, isSelected, isCorrectAnswer);

        return (
          <div
            key={opt.id}
            className={`${optS.base} ${optS.hoverStyle} ${optS.selectedStyle} ${optS.correctStyle} ${optS.incorrectStyle} ${optS.correct}`}
            onClick={() => handleSelect(opt.id)}
          >
            {opt.text}
          </div>
        );
      })}
    </div>
  );
};

export default SingleChoiceQuestion;
