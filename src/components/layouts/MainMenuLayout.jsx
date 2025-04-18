import { useDispatch, useSelector } from "react-redux";
import { windowSelector } from "../../redux/windowSlice";
import { questionsHandler } from "../../redux/questionSlice";
import { createRandomizedProvinceQuestions } from "../../functions/randomizeTurkeyProvinces";

const MainMenuLayout = () => {
  const { questions } = useSelector((state) => state.question);
  const dispatch = useDispatch();

  return (
    <div className="p-3 w-full h-screen text-white flex flex-col items-center justify-center text-center gap-5">
      {/* SECTION Logo */}
      <div className="text-9xl font-extrabold select-none">
        <h1>Quiz Game</h1>
      </div>
      {/* SECTION Description */}
      <div className="p-5">
        <h2 className="text-3xl font-bold">Welcome to the Quiz Game!</h2>
        <p className="mt-4 text-lg">Choose your category and start playing!</p>
      </div>
      {/* SECTION Buttons */}
      <div className="flex justify-between items-center gap-4 font-bold">
        <button
          onClick={() => dispatch(windowSelector("quiz"))}
          className="bg-purple-700 hover:bg-purple-600 py-2 px-4 rounded-lg shadow-lg hover:scale-105 cursor-pointer transition-all duration-300"
        >
          Start Quiz
        </button>
        <button
          onClick={() => {
            dispatch(questionsHandler(createRandomizedProvinceQuestions()));
            dispatch(windowSelector("quiz"));
          }}
          className="bg-orange-700 hover:bg-orange-600 py-2 px-4 rounded-lg shadow-lg hover:scale-105 cursor-pointer transition-all duration-300"
        >
          Türkiye Provinces
        </button>
        {/* <button className="bg-lime-700 hover:bg-lime-600 py-2 px-4 rounded-lg shadow-lg hover:scale-105 cursor-pointer transition-all duration-300">
          Load Quiz
        </button> */}
      </div>
      {/* SECTION Footer */}
      <div className="fixed bottom-5 left-5 text-xs opacity-20 font-bold select-none">
        <p>Developed by bitterkofte</p>
      </div>
    </div>
  );
};
export default MainMenuLayout;
