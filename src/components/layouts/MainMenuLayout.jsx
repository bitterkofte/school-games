import { useDispatch, useSelector } from "react-redux";
import { windowSelector } from "../../redux/windowSlice";
import {
  questionsHandler,
  randomizeQuestions,
} from "../../redux/questionSlice";
import { createRandomizedProvinceQuestions } from "../../functions/randomizeTurkeyProvinces";
import { cherryPickQuestionHandler } from "../../functions/cherryPickQuestionHandler";
import { fQuestions, mQuestions } from "../../data/wholeQuestions";

const MainMenuLayout = () => {
  const { questions } = useSelector((state) => state.question);
  const dispatch = useDispatch();

  return (
    <div className="p-3 w-full h-screen text-white flex flex-col items-center justify-center text-center gap-8">
      {/* SECTION Logo */}
      <div className="text-7xl lg:text-9xl font-extrabold select-none tracking-widest italic mb-10">
        <h1>ŞipŞak</h1>
      </div>
      {/* SECTION Description */}
      <div className="p-5 select-none">
        <h2 className="text-2xl font-bol tracking-widerd">
          ŞipŞak'a hoşgeldin
        </h2>
        <p className="mt-4 text-xs opacity-70 tracking-widest italic">
          Başlamak için kategorini seç
        </p>
      </div>
      {/* SECTION Buttons */}
      <div className="flex justify-center items-center flex-wrap gap-4 font-bold select-none">
        <button
          onClick={() => {
            dispatch(questionsHandler(cherryPickQuestionHandler(1)));
            dispatch(windowSelector("quiz"));
          }}
          className="bg-purple-700 hover:bg-purple-600 py-2 px-4 rounded-lg shadow-lg hover:scale-105 cursor-pointer transition-all duration-300"
        >
          5 Soruluk
        </button>
        <button
          onClick={() => {
            dispatch(questionsHandler(cherryPickQuestionHandler(2)));
            dispatch(windowSelector("quiz"));
          }}
          className="bg-purple-700 hover:bg-purple-600 py-2 px-4 rounded-lg shadow-lg hover:scale-105 cursor-pointer transition-all duration-300"
        >
          10 Soruluk
        </button>
        {/* <button
          onClick={() => {
            dispatch(randomizeQuestions());
            dispatch(windowSelector("quiz"));
          }}
          className="bg-sky-700 hover:bg-sky-600 py-2 px-4 rounded-lg shadow-lg hover:scale-105 cursor-pointer transition-all duration-300"
        >
          Bütün
        </button> */}
        <button
          onClick={() => {
            dispatch(questionsHandler(createRandomizedProvinceQuestions()));
            dispatch(windowSelector("quiz"));
          }}
          className="bg-orange-700 hover:bg-orange-600 py-2 px-4 rounded-lg shadow-lg hover:scale-105 cursor-pointer transition-all duration-300"
        >
          Türkiye İl Haritası
        </button>
        <button
          onClick={() => {
            dispatch(questionsHandler(fQuestions));
            dispatch(windowSelector("quiz"));
          }}
          className="bg-sky-700 hover:bg-sky-600 py-2 px-4 rounded-lg shadow-lg hover:scale-105 cursor-pointer transition-all duration-300"
        >
          Boşluk Doldurma
        </button>
        <button
          onClick={() => {
            dispatch(questionsHandler(mQuestions));
            dispatch(windowSelector("quiz"));
          }}
          className="bg-pink-700 hover:bg-pink-600 py-2 px-4 rounded-lg shadow-lg hover:scale-105 cursor-pointer transition-all duration-300"
        >
          Eşleştirme
        </button>
        {/* <button
          onClick={() => dispatch(windowSelector("learn"))}
          className="bg-lime-700 hover:bg-lime-600 py-2 px-4 rounded-lg shadow-lg hover:scale-105 cursor-pointer transition-all duration-300"
        >
          Öğren
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
