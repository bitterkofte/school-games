import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectedHandler } from "../../redux/questionSlice";

export default function FillInTheBlankQuestion({ text, answer }) {
  const dispatch = useDispatch();
  const { showAnswer } = useSelector((state) => state.question);

  const blankCount = (text.match(/\[\[blank\]\]/g) || []).length;
  const [inputs, setInputs] = useState(Array(blankCount).fill(""));

  const handleChange = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index] = value.replace(/\u0130/g, "I");
    setInputs(newInputs);
  };

  useEffect(() => {
    if (
      inputs.length === answer.length &&
      inputs.every((val) => val.trim() !== "")
    )
      dispatch(selectedHandler(inputs));
    else dispatch(selectedHandler([]));
  }, [inputs]);

  useEffect(() => {
    setInputs(Array(blankCount).fill(""));
  }, [text]);

  const renderQuestionWithBlanks = () => {
    const parts = text.split(/\[\[blank\]\]/g);
    let result = [];

    for (let i = 0; i < parts.length; i++) {
      result.push(<span key={`text-${i}`}>{parts[i]}</span>);

      if (i < blankCount) {
        const userAnswer = inputs[i] || "";
        const correctAnswer = answer[i];
        const isCorrect =
          userAnswer.trim().toLowerCase() ===
          correctAnswer.trim().toLowerCase();

        result.push(
          <input
            key={`input-${i}`}
            type="text"
            placeholder="cevap"
            maxLength={15}
            className={`
              max-w-1/4 mx-1 px-2 py-1 rounded bg-transparent border-b placeholder:italic placeholder:font-light
              ${
                showAnswer
                  ? isCorrect
                    ? "border-green-500 text-green-500 font-semibold"
                    : "border-red-500 text-red-500 font-semibold"
                  : "border-white/30"
              }
              outline-none
            `}
            value={userAnswer}
            disabled={showAnswer}
            onChange={(e) => handleChange(i, e.target.value)}
          />
        );
      }
    }
    return result;
  };

  return (
    <>
      {renderQuestionWithBlanks()}
      <p className="opacity-30 text-xs italic">
        Eğer cevaplarda sıralama önemsizse cevaplarınızı alfabetik sıralamaya
        göre yazınız. Sayı sorularında yazı yerine rakam kullanınız (tarihler
        dışında).
      </p>
    </>
  );
}
