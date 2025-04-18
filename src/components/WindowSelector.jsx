import { useSelector } from "react-redux";
import MainMenuLayout from "./layouts/MainMenuLayout";
import QuestionLayout from "./layouts/questionLayout";
import ResultsLayout from "./layouts/ResultsLayout";

const WindowSelector = () => {
  const { window } = useSelector((state) => state.window);
  switch (window) {
    case "main-menu":
      return <MainMenuLayout />;
    case "quiz":
      return <QuestionLayout />;
    case "settings":
      return <div>Settings</div>;
    case "results":
      return <ResultsLayout />;
    default:
      return <MainMenuLayout />;
  }
};
export default WindowSelector;
