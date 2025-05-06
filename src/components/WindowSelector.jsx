import { useSelector } from "react-redux";
import MainMenuLayout from "./layouts/MainMenuLayout";
import QuestionLayout from "./layouts/questionLayout";
import ResultsLayout from "./layouts/ResultsLayout";
import LearnLayout from "./layouts/LearnLayout";

const WindowSelector = () => {
  const { window } = useSelector((state) => state.window);
  switch (window) {
    case "main-menu":
      return <MainMenuLayout />;
    case "quiz":
      return <QuestionLayout />;
    case "learn":
      return <LearnLayout />;
    case "results":
      return <ResultsLayout />;
    default:
      return <MainMenuLayout />;
  }
};
export default WindowSelector;
