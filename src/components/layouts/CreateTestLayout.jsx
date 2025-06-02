import { useState, useEffect, useMemo } from "react";
import { Dropdown } from "../elements/Dropdown";
import { questionTypes } from "../../data/wholeQuestions";
import QuestionTypeSelector from "../QuestionTypeSelector";
import { createFitbQuestion } from "../../functions/createFitbQuestion";
import {
  areAllValuesUnique,
  isAnyElementSame,
} from "../../functions/fineFunctions";
import { FaArrowRightToBracket } from "react-icons/fa6";

const LOCAL_STORAGE_KEY = "customTest";

const CreateTestLayout = () => {
  // const [selectedQuestionType, setSelectedQuestionType] = useState({
  //   value: "single-choice",
  //   label: "Çoktan Seçmeli - Tek Cevap",
  // });
  const [questions, setQuestions] = useState([]);
  const [questionType, setQuestionType] = useState({
    value: "single-choice",
    label: "Çoktan Seçmeli - Tek Cevap",
  });
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState(["", "", ""]);
  const [answer, setAnswer] = useState("");
  const [isTextareaFocused, setIsTextareaFocused] = useState(false);

  const isAddDisabled = useMemo(() => {
    // Your validation logic here
    return questionAddDisableHandler();
  }, [questionText, questionType.value, options, answer]);

  const resetForm = () => {
    setQuestionText("");
    if (
      ["single-choice", "multiple-choice", "sorting"].includes(
        questionType.value
      )
    ) {
      setOptions(["", "", ""]);
      setAnswer("");
    } else if (questionType.value === "matching") {
      // console.log("matching question type selected");
      setAnswer([
        { main: "", pair: "" },
        { main: "", pair: "" },
        { main: "", pair: "" },
      ]);
    } else if (questionType.value === "fill-in-the-blank") {
      setAnswer("");
    } else if (questionType.value === "true-false") {
      setAnswer("Doğru");
    } else if (questionType.value === "turkiye-province") {
      setQuestionText(answer + " ilimiz hangisidir?");
      // setQuestionText("");
      setAnswer("");
    } else {
      setOptions(["", "", ""]);
      setAnswer("");
    }
  };

  function questionAddDisableHandler() {
    if (!questionText.trim()) return true;
    if (
      ["single-choice", "multiple-choice", "sorting"].includes(
        questionType.value
      ) &&
      isAnyElementSame(options)
    )
      return true;
    else if (questionType.value === "single-choice") {
      return !options.some((opt) => opt.trim()) || !answer.trim();
    } else if (questionType.value === "multiple-choice") {
      return (
        !options.some((opt) => opt.trim()) ||
        !answer.some((a) => a.trim()) ||
        answer.length < 2
      );
    } else if (questionType.value === "sorting") {
      return !options.some((opt) => opt.trim());
    } else if (questionType.value === "matching") {
      return (
        answer.some((pair) => !pair.main.trim() || !pair.pair.trim()) ||
        !areAllValuesUnique(answer, "main")
      );
    } else if (questionType.value === "fill-in-the-blank") {
      return !answer.trim();
    } else if (questionType.value === "true-false") {
      // return !answer.trim();
      return false;
    } else if (questionType.value === "turkiye-province") {
      return answer === "";
    }
  }

  useEffect(() => {
    if (questionType.value === "turkiye-province" && answer) {
      setQuestionText(answer + " ilimiz hangisidir?");
    } else return;
  }, [answer, questionType]);

  useEffect(() => {
    resetForm();
  }, [questionType]);

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) setQuestions(JSON.parse(stored));
  }, []);

  const handleQuestionText = (txt) => {
    if (questionType.value === "fill-in-the-blank") {
      const [newText, extracted] = createFitbQuestion(txt);
      setQuestionText(newText);
      setAnswer(extracted);
    } else setQuestionText(txt);
  };

  const handleAddQuestion = () => {
    if (!questionText.trim()) return;

    const newQuestion = {
      type: questionType.value,
      ...(questionType.value === "single-choice" && {
        text: questionText,
        options,
        answer,
      }),
      ...(questionType.value === "true-false" && {
        text: questionText,
        answer,
      }),
      ...(questionType.value === "turkiye-province" && {
        text: questionText,
        answer,
      }),
      ...(questionType.value === "matching" && {
        text: questionText,
        answer,
      }),
      ...(questionType.value === "fill-in-the-blank" && {
        text: questionText.replace(/\[\[[^\]]*\]\]/g, "[[blank]]"),
        answer: answer.map((s) => s.trim()),
        // answer: answer.split("|").map((s) => s.trim()), // support multiple blanks
      }),
    };

    const updated = [...questions, newQuestion];
    setQuestions(updated);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    resetForm();
  };

  // const resetForm = () => {
  //   setQuestionText("");
  //   setOptions(["", "", "", ""]);
  //   setAnswer("");
  // };

  const handleOptionChange = (value, i) => {
    const newOpts = [...options];
    newOpts[i] = value;
    setOptions(newOpts);
  };

  useEffect(() => {
    if (isAnyElementSame(options)) {
      setAnswer("");
    } else return;
  }, [options]);

  const handleDelete = (index) => {
    const updated = [...questions];
    updated.splice(index, 1);
    setQuestions(updated);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  };

  return (
    <div className="max-w-xl mx-auto my-10 p-8 space-y-6 bg-white/10 backdrop-blur rounded-lg font-[Poppins] shadow-lg">
      <h2 className="text-3xl font-semibold spacing-wide">Test Oluştur</h2>

      <div className="space-y-8">
        <Dropdown
          label="Question Type"
          options={questionTypes}
          selected={questionType}
          // selector={(qT) => dispatch(setQuestionType(qT))}
          selector={(qT) => setQuestionType(qT)}
          z={3}
        />

        {questionType.value !== "turkiye-province" && (
          <div
            className={`min-h-32 box-border relative px-2 pt-3 rounded-lg border-3 outline-none bg-gray-600 text-orange-400 font-semibold text-xl transition-all duration-500 ${
              isTextareaFocused ? "border-orange-500" : "border-gray-500"
            }`}
          >
            <textarea
              className="w-full h-32 pl-2 overflow-ellipsis bg-transparent outline-0 border-0 resize-none text-gray-200"
              maxLength={200}
              placeholder="Soru metnini buraya yazın..."
              value={questionText}
              onChange={(e) => handleQuestionText(e.target.value)}
              onFocus={() => setIsTextareaFocused(true)}
              onBlur={() => setIsTextareaFocused(false)}
            />
            <label
              className={`absolute px-2 py-1 -top-2.5 left-2 text-xs font-semibold bg-gray-600 rounded-2xl select-none after:content-[''] after:absolute after:left-0 after:top-0 after:right-0 after:bottom-[57%] after:border-3 after:border-b-0 after:rounded-t-[10px] after:transition-all after:duration-500 transition-all duration-500 ${
                isTextareaFocused
                  ? "text-orange-500 after:border-orange-500"
                  : "text-gray-300 after:border-gray-500"
              }`}
              htmlFor="soruMetni"
            >
              Soru Metni
            </label>
          </div>
        )}

        <QuestionTypeSelector
          questionType={questionType.value}
          options={options}
          setOptions={setOptions}
          handleOptionChange={handleOptionChange}
          answer={answer}
          setAnswer={setAnswer}
        />
      </div>

      <button
        onClick={handleAddQuestion}
        className="px-4 py-2 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 rounded text-white cursor-pointer btn-disabled"
        disabled={isAddDisabled}
        // disabled={!questionText.trim()}
      >
        <span>Soruyu Ekle</span> <FaArrowRightToBracket />
      </button>

      <hr />

      <h3 className="text-lg font-medium">Eklenen Sorular</h3>
      {questions.length === 0 && (
        <p className="italic opacity-50">Henüz soru eklenmedi.</p>
      )}
      <ul className="space-y-3">
        {questions.map((q, i) => (
          <li
            key={i}
            className="bg-neutral-800/30 p-3 rounded shadow flex justify-between"
          >
            <div>
              <strong>
                {i + 1}. {q.text}
              </strong>
              {q.options && (
                <ul className="list-disc pl-5 text-sm text-gray-300">
                  {q.options.map((opt, j) => (
                    <li key={j}>{opt}</li>
                  ))}
                </ul>
              )}
              <div className="text-sm text-green-300">
                Cevap: <strong>{q.answer?.toString()}</strong>
              </div>
            </div>
            <button
              onClick={() => handleDelete(i)}
              className="text-red-400 hover:text-red-600"
            >
              Sil
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CreateTestLayout;
