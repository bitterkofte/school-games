import { useDispatch, useSelector } from "react-redux";
import {
  closeModal,
  openModal,
  resetModal,
  windowSelector,
} from "../../redux/windowSlice";
import { myTestsHandler, questionsHandler } from "../../redux/questionSlice";
import { createRandomizedProvinceQuestions } from "../../functions/randomizeTurkeyProvinces";
import { cherryPickQuestionHandler } from "../../functions/cherryPickQuestionHandler";
import { useState } from "react";
import FineSidebar from "../elements/FineSidebar";
import { IoMenu } from "react-icons/io5";
import FineAccordion from "../elements/FineAccordion";
import HamburgerMenu from "../animated-buttons/HamburgerMenu";
import { HiOutlineStar, HiStar } from "react-icons/hi";
import { localStorageAndStateUpdater } from "../../functions/localStorageAndStateUpdater";
import { toast } from "sonner";
import { MdDeleteForever } from "react-icons/md";
import FineModal from "../elements/FineModal";

const MainMenuLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { myTests } = useSelector((state) => state.question);
  const { isModalOpen, modalTitle, modalText } = useSelector(
    (state) => state.window
  );

  const dispatch = useDispatch();

  const handleFavTest = (i) => {
    if (myTests.filter((e) => e.fav === true).length >= 3 && !myTests[i].fav) {
      toast.error("3'ten fazla favori test ekleyemezsiniz!");
      return;
    }
    const updatedTests = [...myTests];
    updatedTests[i] = { ...updatedTests[i], fav: !updatedTests[i].fav };
    localStorageAndStateUpdater(
      "MyTests",
      updatedTests,
      dispatch(myTestsHandler(updatedTests))
    );
  };
  const handleDeleteTest = (i) => {
    const updatedTests = [...myTests];
    updatedTests.splice(i, 1);
    localStorageAndStateUpdater(
      "MyTests",
      updatedTests,
      dispatch(myTestsHandler(updatedTests))
    );
  };

  const quizSelector = (questions) => {
    dispatch(questionsHandler(questions));
    dispatch(windowSelector("quiz"));
  };

  const modalCloseFunc = () => {
    dispatch(closeModal());
    setTimeout(() => resetModal(), 300);
  };

  return (
    <>
      {/* @ MODAL */}
      <FineModal
        isModalOpen={isModalOpen}
        title={modalTitle}
        text={modalText}
        confirmText={"Sil"}
        onConfirm={handleDeleteTest}
        onCancel={modalCloseFunc}
      />
      <div className="min-h-screen flex overflow-hidden">
        {/* @ SIDEBAR */}
        <FineSidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        >
          {/* # ACCORDION */}
          <FineAccordion title={"Testlerim"}>
            {!myTests || myTests.length === 0 ? (
              <p className="opacity-40 italic">Test bulunamadı</p>
            ) : (
              myTests.map((test, index) => (
                <div
                  key={index}
                  className="w-full flex items-center justify-between"
                >
                  <p>{test.name}</p>
                  <div className="flex items-center gap-2">
                    <button
                      className=" hover:text-red-600 cursor-pointer transition-all duration-200"
                      onClick={() => {
                        dispatch(
                          openModal({
                            title: "Testi Sil",
                            text:
                              test.name +
                              " testini silmek istediğinizden emin misiniz?",
                            action: "handleDeleteTest",
                          })
                        );
                      }}
                    >
                      <MdDeleteForever />
                    </button>
                    <button
                      className="cursor-pointer"
                      onClick={() => handleFavTest(index)}
                    >
                      {test.fav ? (
                        <HiStar className="text-amber-300" />
                      ) : (
                        <HiOutlineStar className="hover:text-amber-300" />
                      )}
                    </button>
                  </div>
                </div>
              ))
            )}
          </FineAccordion>
        </FineSidebar>
        {/* # SIDEBAR BUTTON */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className={`absolute top-5 left-5 p-2 rounded-lg cursor-pointer transition-all duration-300 ease-in-out z-[40] ${
            isSidebarOpen
              ? "translate-x-[calc(100vw-4.5rem)] md:translate-x-[calc(24rem-4.5rem)]"
              : "translate-x-0"
          }`}
        >
          <HamburgerMenu isOpen={isSidebarOpen} />
        </button>

        {/* @ MENU */}
        <div
          className={`p-3 w-full h-screen text-white flex-1 flex flex-col items-center justify-center text-center gap-8 transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? "translate-x-96" : "translate-x-0"
          }`}
        >
          {/* # HEAD */}
          <div className="">
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
          {/* # BUTTONS */}
          <div className="flex justify-center items-center flex-wrap gap-4 font-bold select-none">
            {myTests.map((test, i) => {
              if (test.fav)
                return (
                  <button
                    key={i}
                    onClick={() => quizSelector(test.questions)}
                    className="bg-teal-700 hover:bg-teal-600 py-2 px-4 rounded-lg shadow-lg hover:scale-105 cursor-pointer transition-all duration-300 gradient-animation-fav"
                  >
                    {test.name}
                  </button>
                );
            })}
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
                dispatch(windowSelector("create-test"));
              }}
              className="py-2 px-4 rounded-lg text-white font-bold hover:scale-105 shadow-lg transition-all duration-300 gradient-animation cursor-pointer"
            >
              Test Oluştur
            </button>
            <button
              onClick={() => dispatch(windowSelector("learn"))}
              className="bg-lime-700 hover:bg-lime-600 py-2 px-4 rounded-lg shadow-lg hover:scale-105 cursor-pointer transition-all duration-300"
            >
              Öğren
            </button>
          </div>
          {/* # FOOTER */}
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
    </>
  );
};
export default MainMenuLayout;
