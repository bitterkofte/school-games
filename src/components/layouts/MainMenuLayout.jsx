import { useDispatch, useSelector } from "react-redux";
import { windowSelector } from "../../redux/windowSlice";
import {
  questionsHandler,
  randomizeQuestions,
} from "../../redux/questionSlice";
import { createRandomizedProvinceQuestions } from "../../functions/randomizeTurkeyProvinces";
import { cherryPickQuestionHandler } from "../../functions/cherryPickQuestionHandler";
import { fQuestions, mQuestions, sQuestions } from "../../data/wholeQuestions";
import { useEffect, useState } from "react";
import FineSidebar from "../elements/FineSidebar";
import { IoMenu } from "react-icons/io5";

const MainMenuLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { questions } = useSelector((state) => state.question);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(localStorage.getItem("MyTests"));
  // }, []);

  return (
    <div className="min-h-screen flex overflow-hidden">
      <FineSidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div
        className={`p-3 w-full h-screen text-white flex-1 flex flex-col items-center justify-center text-center gap-8 transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-96" : "translate-x-0"
        }`}
      >
        {/* SECTION HEAD */}
        <div className="">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            // onClick={() => {
            //   setIsSidebarOpen(!isSidebarOpen);
            //   dispatch(localStorage.getItem("MyTests"));
            // }}
            className="absolute top-5 left-5 p-2 rounded-lg transition-colors cursor-pointer"
          >
            <IoMenu size={24} />
          </button>
          <div className="text-7xl lg:text-9xl font-extrabold select-none tracking-widest italic mb-10">
            <h1>ŞipŞak</h1>
          </div>
          <div className="p-5 select-none">
            <h2 className="text-2xl font-bol tracking-widerd">
              ŞipŞak'a hoşgeldin
            </h2>
            <p className="mt-4 text-xs opacity-70 tracking-widest italic">
              Başlamak için kategorini seç
            </p>
          </div>
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
          <button
            onClick={() => {
              dispatch(questionsHandler(sQuestions));
              dispatch(windowSelector("quiz"));
            }}
            className="bg-pink-700 hover:bg-pink-600 py-2 px-4 rounded-lg shadow-lg hover:scale-105 cursor-pointer transition-all duration-300"
          >
            Sıralama
          </button>
          <button
            onClick={() => {
              dispatch(windowSelector("create-test"));
            }}
            className="py-2 px-4 rounded-lg text-white font-bold hover:scale-105 shadow-lg transition-all duration-300 gradient-animation cursor-pointer"
          >
            Test Oluştur
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
        {/* {isSidebarOpen && ( */}
        <div
          className={`absolute inset-0 bg-black z-[10] transition-opacity duration-300 ease-in-out ${
            isSidebarOpen
              ? "opacity-50 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setIsSidebarOpen(false)}
        ></div>
        {/* )} */}
      </div>
    </div>
  );
};
export default MainMenuLayout;
