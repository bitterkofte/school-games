import { useDispatch, useSelector } from "react-redux";
import { windowSelector } from "../../redux/windowSlice";
import { resetHandler } from "../../redux/questionSlice";

const ResultsLayout = () => {
  const { points } = useSelector((state) => state.question);
  const dispatch = useDispatch();

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="py-10 px-8 rounded-4xl overflow-hidden font-extrabold text-center backdrop-blur-2xl bg-sky-300/10">
        <h1 className="text-5xl">Quiz Completed!</h1>
        <p className="mt-4 text-3xl">
          Your Score: <span className="text-sky-600">{points}</span>
        </p>
        <p className="mt-2 text-xl mb-10">Thank you for playing!</p>
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
