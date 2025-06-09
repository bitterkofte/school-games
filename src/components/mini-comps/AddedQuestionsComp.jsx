const AddedQuestionsComp = ({ questions, handleDelete }) => {
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
            className="bg-neutral-800/30 p-3 rounded shadow flex justify-between"
          >
            <div>
              <strong>
                {i + 1}. {q.text}
              </strong>
              {q.options && (
                <ul className="list-disc pl-5 text-sm text-gray-300">
                  {q.options.map((opt, j) => (
                    <li key={j}>{opt.toString()}</li>
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
    </>
  );
};
export default AddedQuestionsComp;
