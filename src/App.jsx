import BackgroundParticles from "./components/animated-backgrounds/BackgroundParticles";
import { Toaster } from "sonner";
import QuestionLayout from "./components/layouts/questionLayout";
import MainMenuLayout from "./components/layouts/MainMenuLayout";
import WindowSelector from "./components/WindowSelector";
import LearnTurkeyProvinceMap from "./components/learn/learnTurkeyProvinceMap";
import Navigation from "./components/Navigation";
import MatchingQuestion from "./components/questions/MatchingQuestion";
import SimpleMatch from "./components/SimpleMatch";

function App() {
  return (
    <>
      <div className="w-full bg-neutral-900? text-white">
        <BackgroundParticles />
        <Toaster position="top-center" richColors className="max-w-[80%]" />
        {/* <Navigation /> */}
        <WindowSelector />
        {/* <LearnTurkeyProvinceMap /> */}
        {/* <MatchingQuestion /> */}
        {/* <SimpleMatch /> */}
      </div>
    </>
  );
}

export default App;
