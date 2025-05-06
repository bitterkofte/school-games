import { useDispatch, useSelector } from "react-redux";
import { windowSelector } from "../../redux/windowSlice";
import { resetHandler } from "../../redux/questionSlice";

const ResultsLayout = () => {
  const { points, questions } = useSelector((state) => state.question);
  const dispatch = useDispatch();

  return (
    <div className="h-screen flex justify-center items-center select-none">
      <div className="py-14 px-20 rounded-4xl overflow-hidden font-extrabold text-center backdrop-blur-2xl bg-sky-300/10">
        <h1 className="text-6xl mb-6">Testi tamamladın!</h1>
        <p className="text-4xl mb-3">
          Puanın:{" "}
          <span className="text-sky-600 animate-pulse-blue">{points}</span>
        </p>
        <p className="text-4xl mb-6">
          Doğru sayın:{" "}
          <span className="text-green-600? animate-pulse? animate-pulse-correct-province">
            {points / 10}/{questions.length}
          </span>
        </p>
        <p className="mt-2 text-lg opacity-60 mb-6">
          Oynadığın için teşekkürler!
        </p>
        <button
          className="bg-purple-700 hover:bg-purple-600 py-2 px-4 rounded-lg shadow-lg hover:scale-105 cursor-pointer transition-all duration-300"
          onClick={() => {
            dispatch(windowSelector("main-menu"));
            dispatch(resetHandler());
          }}
        >
          Ana sayfa
        </button>
      </div>
    </div>
  );
};
export default ResultsLayout;
