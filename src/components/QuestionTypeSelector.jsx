import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaRegCircle } from "react-icons/fa6";
import { FiPlusCircle } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
import { FineSwitch } from "./elements/FineSwitch";
import { SearchableDropdown } from "./elements/SearchableDropdown";
import { turkiyeProvinces } from "../data/turkiyeProvinces";
import FineInput from "./elements/FineInput";
import {
  isAnyElementEmpty,
  isAnyElementSame,
} from "../functions/fineFunctions";

const QuestionTypeSelector = ({
  questionType,
  options,
  setOptions,
  handleOptionChange,
  answer,
  setAnswer,
}) => {
  const [isOptionFocused, setIsOptionFocused] = useState(false);

  const optionAddHandler = () => {
    if (options.length >= 6) return;
    setOptions((prev) => [...prev, ""]);
  };

  // useEffect(() => {
  //   if (questionType === "matching")
  //     setAnswer([
  //       { main: "", pair: "" },
  //       { main: "", pair: "" },
  //       { main: "", pair: "" },
  //     ]);
  //   else return;
  // }, [questionType]);

  // useEffect(() => {
  //   if (isAnyElementSame(options)) {
  //     setAnswer("");
  //   } else return;
  // }, [options]);

  const answerHandler = (opt) => {
    if (questionType === "single-choice") setAnswer(opt);
    else if (questionType === "multiple-choice") {
      if (answer.includes(opt)) {
        setAnswer(answer.filter((item) => item !== opt));
      } else {
        setAnswer([...answer, opt]);
      }
    }
  };

  const deleteOptionHandler = (index) => {
    if (options.length <= 2) return; // Prevent deletion if only 2 options left
    if (options[index] === answer) {
      setAnswer(""); // Clear answer if the deleted option was selected
    }
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };

  // SECTION ---------------------------------- SINGLE-CHOICE, MULTIPLE-CHOICE, SORTING
  if (["single-choice", "multiple-choice", "sorting"].includes(questionType)) {
    return (
      <div className="space-y-1">
        {/* <label>Seçenekler:</label> */}
        <div className="space-y-4">
          {options.map((opt, i) => (
            // NOTE OPTION
            <div
              // className="flex justify-between items-center border-2 border-gray-400 px-2 py-1 rounded"
              className={`flex justify-between items-center box-border relative px-2 pt-3 pb-2 rounded-lg border-3 outline-none bg-gray-600 font-semibold text-xl transition-all duration-500 ${
                isOptionFocused === i ? "border-lime-500" : "border-gray-500"
              }`}
              key={i}
            >
              <input
                type="text"
                value={opt}
                maxLength={100}
                className="w-full pl-2 bg-transparent border-0 outline-0 placeholder:opacity-50"
                onChange={(e) => handleOptionChange(e.target.value, i)}
                placeholder={`Seçenek ${i + 1}`}
                onFocus={() => setIsOptionFocused(i)}
                onBlur={() => setIsOptionFocused(false)}
              />
              <div className="pr-2 flex items-center gap-2 ">
                <MdDeleteForever
                  onClick={() => deleteOptionHandler(i)}
                  className={`text-xl transition-all duration-200 ${
                    options.length <= 2
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer hover:text-red-600"
                  }`}
                />
                {questionType !== "sorting" && (
                  <button
                    className="cursor-pointer hover:text-green-600 transition-all duration-200 btn-disabled"
                    onClick={() => answerHandler(opt)}
                    disabled={
                      isAnyElementSame(options) ||
                      isAnyElementEmpty(options) ||
                      opt.trim() === ""
                    }
                  >
                    {answer.includes(opt) && opt.trim() !== "" ? (
                      <FaCheckCircle />
                    ) : (
                      <FaRegCircle />
                    )}
                  </button>
                )}
              </div>
              <label
                className={`absolute px-2 py-1 -top-2.5 left-2 text-xs font-semibold bg-gray-600 rounded-2xl select-none after:content-[''] after:absolute after:left-0 after:top-0 after:right-0 after:bottom-[57%] after:border-3 after:border-b-0 after:rounded-t-[10px] after:transition-all after:duration-500 transition-all duration-500 ${
                  isOptionFocused === i
                    ? "text-lime-500 after:border-lime-500"
                    : "text-gray-300 after:border-gray-500"
                }`}
              >
                Seçenek {i + 1}
              </label>
            </div>
          ))}
        </div>
        <button
          className="w-full flex items-center justify-center gap-2 active:scale-95 border-2 border-transparent hover:border-lime-600 bg-teal-900 hover:text-lime-500 text-white px-4 py-2 rounded-lg mt-2 cursor-pointer transition-all duration-200 btn-disabled"
          onClick={optionAddHandler}
          disabled={options.length >= 6}
        >
          <span>Seçenek Ekle</span> <FiPlusCircle />
        </button>
        <ul className="pl-5 opacity-50 italic list-disc">
          {questionType === "sorting" && (
            <li>Şıkları cevap sırasında doldurunuz.</li>
          )}
          <li>
            Lütfen tüm seçenekleri doldurun ve hiçbir seçeneğin aynı
            olmadığından emin olun.
          </li>
          {questionType !== "sorting" && (
            <li>
              Tüm şıkları doldurduktan sonra sağ kenarda bulunan çember ile
              doğru{" "}
              {questionType === "single-choice" ? "seçeneği" : "seçenekleri"}{" "}
              işaretleyiniz.
            </li>
          )}
          <li>En fazla 6 seçenek ekleyebilirsiniz.</li>
          <li>Seçenek metni karakter limiti 100'dür.</li>
        </ul>
      </div>
    );
    // SECTION ---------------------------------- TRUE-FALSE
  } else if (questionType === "true-false") {
    return (
      <div className="">
        <FineSwitch
          option1="Doğru"
          option1Color="bg-green-500"
          option2="Yanlış"
          option2Color="bg-red-500"
          onChange={(_, optionText) => setAnswer(optionText)}
        />
        {/* <p>{answer}</p> */}
      </div>
    );
    // SECTION ----------------------------------  FILL-IN-THE-BLANK
  } else if (questionType === "fill-in-the-blank") {
    return (
      <div className="space-y-3">
        {/* <label>Doğru Cevap(lar): (| ile ayırın)</label> */}
        <ul className="pl-5 opacity-50 italic list-disc">
          <li>Cevapları çift köşeli parantez içerisinde belirtin.</li>
          <li>En fazla 4 boşluk(cevap) ekleyebilirsiniz.</li>
          <li>Soru metni karakter limiti 200'dür.</li>
        </ul>
        <p className="opacity-50 italic">
          Örnek: Türkiyenin başkenti <strong>[[Ankara]]</strong>'dır ve en
          kalabalık şehri <strong> [[İstanbul]]</strong>'dur.
        </p>
      </div>
    );
    // SECTION ----------------------------------  TURKIYE-PROVINCE
  } else if (questionType === "turkiye-province") {
    return (
      <div className="">
        <SearchableDropdown
          options={turkiyeProvinces}
          selected={answer}
          selector={setAnswer}
          label="İl"
          z={0}
        />
      </div>
    );
    // SECTION ----------------------------------  MATCHING
  } else if (questionType === "matching") {
    // console.log("answer: ", answer, typeof answer);
    const pairAddHandler = () => {
      if (answer.length >= 8) return;
      setAnswer((prev) => [...prev, { main: "", pair: "" }]);
    };
    return (
      <div className="">
        {!answer ? (
          <p>Yükleniyor...</p>
        ) : (
          answer.map((pair, index) => (
            <div
              key={index}
              className="relative flex items-center justify-between gap-2 p-2 rounded-lg mb-2"
            >
              <FineInput
                label="Anahtar"
                maxLength={20}
                isFocused={isOptionFocused}
                setFocused={(i) => {
                  setIsOptionFocused(i);
                }}
                value={pair.main}
                index={index}
                onChange={(e) => {
                  const newAnswer = [...answer];
                  newAnswer[index].main = e;
                  setAnswer(newAnswer);
                }}
              />
              <FineInput
                label="Çift"
                maxLength={20}
                isFocused={isOptionFocused}
                setFocused={(i) => {
                  setIsOptionFocused(i);
                }}
                type="text"
                value={pair.pair}
                index={index}
                onChange={(e) => {
                  const newAnswer = [...answer];
                  newAnswer[index].pair = e;
                  setAnswer(newAnswer);
                }}
              />
              <button
                onClick={() => {
                  if (answer.length <= 2) return; // Prevent deletion if only 2 pairs left
                  const newAnswer = [...answer];
                  newAnswer.splice(index, 1);
                  setAnswer(newAnswer);
                }}
                disabled={answer.length <= 2}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-700 rounded-full p-2 cursor-pointer hover:bg-red-600 active:scale-50 transition-all duration-300 btn-disabled"
              >
                <MdDeleteForever />
              </button>
            </div>
          ))
        )}
        <button
          className="w-full flex items-center justify-center gap-2 active:scale-95 border-2 border-transparent hover:border-lime-600 bg-teal-900 hover:text-lime-500 text-white px-4 py-2 rounded-lg mt-2 cursor-pointer transition-all duration-200 btn-disabled"
          onClick={pairAddHandler}
          disabled={answer.length >= 8}
        >
          <span>Çift Ekle</span> <FiPlusCircle />
        </button>
        <ul className="pl-5 opacity-50 italic list-disc">
          <li>Herbir anahtar kelime farklı olmalıdır.</li>
          <li>En fazla 8 eşleştirme çifti ekleyebilirsiniz.</li>
          <li>Seçenek karakter limiti 20'dir.</li>
        </ul>
      </div>
    );
  }
};
export default QuestionTypeSelector;
