import BackgroundParticles from "./components/animated-backgrounds/BackgroundParticles";
import { Toaster } from "sonner";
import QuestionLayout from "./components/layouts/questionLayout";

function App() {
  return (
    <>
      <div className="bg-neutral-900 text-white">
        <BackgroundParticles />
        <Toaster position="top-center" richColors className="max-w-[80%]" />
        <QuestionLayout />
      </div>
    </>
  );
}

export default App;
