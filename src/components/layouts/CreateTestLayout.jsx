import { useState, useEffect, useMemo } from "react";
import { Dropdown } from "../elements/Dropdown";
import { questionTypes } from "../../data/wholeQuestions";
import QuestionTypeSelector from "../QuestionTypeSelector";
import { createFitbQuestion } from "../../functions/createFitbQuestion";
import { isAnyElementSame } from "../../functions/fineFunctions";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { FaSave } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import FineModal from "../elements/FineModal";
import { toast } from "sonner";
import {
  closeModal,
  openModal,
  resetModal,
  windowSelector,
} from "../../redux/windowSlice";
import { AiFillHome } from "react-icons/ai";
import AddedQuestionsComp from "../mini-comps/AddedQuestionsComp";
import { questionFormer } from "../../functions/questionFormer";
import { questionAddDisableHandler } from "../../functions/questionAddDisableHandler";
import { resetTestForm } from "../../functions/resetTestForm";
import { toastError } from "../../functions/toastError";
import FloatingButton from "../elements/FloatingButton";

const LOCAL_STORAGE_KEY = "BackupUnfinishedTest";

const CreateTestLayout = () => {
  const [questions, setQuestions] = useState([]);
  const [questionType, setQuestionType] = useState(questionTypes[0]);
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState(["", "", ""]);
  const [answer, setAnswer] = useState("");
  const [isTextareaFocused, setIsTextareaFocused] = useState(false);
  const [testName, setTestName] = useState("");
  const { isModalOpen, modalText, modalTitle, modalAction } = useSelector(
    (state) => state.window
  );
  const dispatch = useDispatch();

  // Question Add Disable Checker
  const isAddDisabled = useMemo(() => {
    return questionAddDisableHandler(
      questionText,
      questionType,
      options,
      answer
    );
  }, [questionText, questionType.value, options, answer]);

  // Reset form when question-type change
  useEffect(() => {
    resetTestForm(setQuestionText, setOptions, setAnswer, questionType);
  }, [questionType]);

  // Prevent cloning the answer
  useEffect(() => {
    if (isAnyElementSame(options)) {
      setAnswer("");
    } else return;
  }, [options]);

  // Updating from LocalStorage
  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) setQuestions(JSON.parse(stored));
    const myTests = JSON.parse(localStorage.getItem("MyTests"));
    if (!myTests) localStorage.setItem("MyTests", JSON.stringify([]));
  }, []);

  // Question text updater
  const questionTextChanger = (txt) => {
    if (questionType.value === "fill-in-the-blank") {
      const [newText, extracted] = createFitbQuestion(txt);
      setQuestionText(newText);
      setAnswer(extracted);
    } else setQuestionText(txt);
  };

  // Option text updater
  const optionTextChanger = (value, i) => {
    const newOpts = [...options];
    newOpts[i] = value;
    setOptions(newOpts);
  };

  // Add quesiton
  const handleAddQuestion = () => {
    if (!questionText.trim()) return;
    const newQuestion = questionFormer(
      questionType,
      questionText,
      options,
      answer
    );
    const updated = [...questions, newQuestion];
    setQuestions(updated);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    resetTestForm(setQuestionText, setOptions, setAnswer, questionType);
  };

  // Delete question
  const handleDeleteAddedQuestion = (index) => {
    const updated = [...questions];
    updated.splice(index, 1);
    setQuestions(updated);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  };

  // Add test
  const handleSaveTest = () => {
    const myTests = JSON.parse(localStorage.getItem("MyTests"));
    if (!testName.trim()) return toastError("Lütfen test ismini girin!");
    if (myTests.find((t) => t.name === testName))
      return toastError("Bu isimde bir test zaten var!");
    // Submiting the test
    myTests.push({ name: testName, fav: false, questions });
    localStorage.setItem("MyTests", JSON.stringify(myTests));
    //Reset form and state
    localStorage.setItem(LOCAL_STORAGE_KEY, "");
    setQuestions([]);
    setTestName("");
    modalCloseFunc();
    toast.success("Test başarıyla kaydedildi!");
  };

  function modalCloseFunc() {
    dispatch(closeModal());
    setTimeout(() => resetModal(), 300);
  }

  return (
    <>
      <FineModal
        isModalOpen={isModalOpen}
        title={modalTitle}
        text={modalText}
        confirmText={"Kaydet"}
        onConfirm={handleSaveTest}
        onCancel={modalCloseFunc}
      >
        <input
          type="text"
          maxLength={15}
          className="w-full px-2 py-1 border-2 text-xl outline-0 rounded-lg border-gray-400 focus:border-white transition-all duration-200"
          value={testName}
          onChange={(e) => setTestName(e.target.value)}
          placeholder=""
        />
      </FineModal>
      <div className="animate-revive max-w-xl mx-5 md:mx-auto my-5 p-8 space-y-6 bg-white/10 backdrop-blur rounded-lg font-[Poppins] shadow-lg">
        <h2 className="text-3xl font-semibold spacing-wide">Test Oluştur</h2>

        <div className="space-y-8">
          <Dropdown
            label="Question Type"
            options={questionTypes}
            selected={questionType}
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
                className="w-full h-32 pl-2 bg-transparent outline-0 border-0 resize-none text-gray-200"
                maxLength={200}
                placeholder="Soru metnini buraya yazın..."
                value={questionText}
                onChange={(e) => questionTextChanger(e.target.value)}
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
            handleOptionChange={optionTextChanger}
            answer={answer}
            setAnswer={setAnswer}
          />
        </div>

        <div className="flex justify-between items-center gap-4">
          <button
            onClick={handleAddQuestion}
            className="px-4 py-2 flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 rounded text-white cursor-pointer btn-disabled"
            disabled={isAddDisabled}
          >
            <span>Soruyu Ekle</span> <FaArrowRightToBracket />
          </button>

          <button
            onClick={() =>
              dispatch(
                openModal({
                  title: "Testi Kaydet",
                  text: "Test adını giriniz",
                  action: "handleSaveTest",
                })
              )
            }
            className="px-4 py-2 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 rounded text-white cursor-pointer btn-disabled"
            disabled={questions.length < 3}
          >
            <span>Testi Kaydet</span> <FaSave />
          </button>
        </div>

        <hr />
        <AddedQuestionsComp
          handleDelete={handleDeleteAddedQuestion}
          questions={questions}
        />
      </div>
      {/* <FloatingButton
        position={"top-left"}
        margin={"5"}
        bg={"teal"}
        content={<AiFillHome />}
        action={() => dispatch(windowSelector("main-menu"))}
      /> */}
      {/* <div
        onClick={() => {
          toast.dismiss();
          dispatch(windowSelector("main-menu"));
        }}
        className="fixed bottom-5 left-5 p-2 text-3xl bg-teal-500 rounded-xl opacity-70 hover:opacity-100 cursor-pointer z-50 transition-all duration-200"
      >
        <AiFillHome />
      </div> */}
    </>
  );
};

export default CreateTestLayout;
