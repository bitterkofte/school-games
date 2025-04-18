import BackgroundParticles from "./components/animated-backgrounds/BackgroundParticles";
import { Toaster } from "sonner";
import QuestionLayout from "./components/layouts/questionLayout";
import MainMenuLayout from "./components/layouts/MainMenuLayout";
import WindowSelector from "./components/WindowSelector";

function App() {
  return (
    <>
      <div className="w-full bg-neutral-900? text-white">
        <BackgroundParticles />
        <Toaster position="top-center" richColors className="max-w-[80%]" />
        {/* <QuestionLayout /> */}
        {/* <MainMenuLayout /> */}
        <WindowSelector />
      </div>
    </>
  );
}

export default App;
