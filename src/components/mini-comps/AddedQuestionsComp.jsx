import { MdDeleteForever } from "react-icons/md";
import { questionTypes } from "../../data/wholeQuestions";

const AddedQuestionsComp = ({ questions, handleDelete }) => {
  const optionFormer = (q) => {
    switch (q.type) {
      case "single-choice":
        return q.options.map((opt, j) => (
          <li
            key={j}
            className={`${
              q.answer === opt.id ? "text-green-400 font-bold" : ""
            }`}
          >
            {String.fromCharCode(65 + j)}
            {") "}
            {opt.text}
          </li>
        ));
      case "multiple-choice":
        return q.options.map((opt, j) => (
          <li
            key={j}
            className={`${
              q.answer.includes(opt.id) ? "text-green-400 font-bold" : ""
            }`}
          >
            {q.answer.includes(opt.id) ? `\u2611` : `\u2610`} {opt.text}
          </li>
        ));
      case "sorting":
        return q.options.map((opt, j) => (
          <li key={j}>
            {j + 1}
            {") "}
            {opt.text}
          </li>
        ));
      case "matching":
        return q.answer.map((opt, j) => (
          <li key={j}>
            {opt.main}-{opt.pair}
          </li>
        ));
      case "fill-in-the-blank":
        return q.answer.map((opt, j) => <li key={j}>{opt}</li>);
      case "turkiye-province":
        return <li className="text-green-400 font-bold">{q.answer}</li>;
      case "true-false":
        return (
          <li className="text-green-400 font-bold">
            {q.answer === "True" ? "Doğru" : "Yanlış"}
          </li>
        );
    }
  };
  return (
    <>
      <h3 className="text-lg font-medium">Eklenen Sorular</h3>
      {questions.length === 0 && (
        <p className="italic opacity-50">Henüz soru eklenmedi.</p>
      )}
      <ul className="space-y-3">
        {questions.map((q, i) => (
          <li
            key={i}
            className="bg-neutral-800/30 p-3 rounded shadow flex justify-between gap-2"
          >
            <div className="w-full">
              <div className="w-full flex justify-between items-center mb-2">
                <p className="text-xl font-bold text-gray-200">
                  {i + 1}. {q.text}
                </p>
                <p className="opacity-40 text-sm italic">
                  {questionTypes.find((qt) => qt.value === q.type).label}
                </p>
              </div>
              <ul className="list-discÇ pl-5Ç text-sm text-gray-300 list-none">
                {/* {q.options.map((opt, j) => (
                    <li key={j}>{opt.toString()}</li>
                  ))} */}
                {optionFormer(q)}
              </ul>
              {/* {optionFormer(q,i)} */}
              {/* <div className="text-sm text-green-300">
                Cevap: <strong>{q.answer?.toString()}</strong>
              </div> */}
            </div>
            <button
              onClick={() => handleDelete(i)}
              className="text-xl px-1 bg-neutral-600/40 rounded-md text-red-400 hover:text-red-500 hover:bg-red-800/40 cursor-pointer transition-all duration-200"
            >
              <MdDeleteForever className=" " />
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};
export default AddedQuestionsComp;
