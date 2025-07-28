import { useSelector } from "react-redux";
import MainMenuLayout from "./layouts/MainMenuLayout";
import QuestionLayout from "./layouts/questionLayout";
import ResultsLayout from "./layouts/ResultsLayout";
import LearnLayout from "./layouts/LearnLayout";
import CreateTestLayout from "./layouts/CreateTestLayout";
import Navigation from "./Navigation";
// import { useModal } from "../hooks/useModal";
// import FineModal from "./elements/FineModal";

const WindowSelector = () => {
  const { window } = useSelector((state) => state.window);
  // const { isModalOpen, modalTitle, modalText } = useSelector(
  //   (state) => state.window
  // );
  // const { executeAction, hideModal, modalChildren } = useModal();
  // const { isOpen, title, text, children, executeConfirm, executeCancel } =
  //   useModal();
  const wS = () => {
    switch (window) {
      case "main-menu":
        return <MainMenuLayout />;
      case "quiz":
        return <QuestionLayout />;
      case "learn":
        return <LearnLayout />;
      case "results":
        return <ResultsLayout />;
      case "create-test":
        return <CreateTestLayout />;
      default:
        return <MainMenuLayout />;
    }
  };
  return (
    <>
      {/* <FineModal
        isModalOpen={isOpen}
        title={title}
        text={text}
        onConfirm={executeConfirm}
        onCancel={executeCancel}
      >
        {children}
      </FineModal> */}
      {/* {window !== "main-menu" && <Navigation />} */}
      <Navigation />
      {wS()}
    </>
  );
};
export default WindowSelector;
