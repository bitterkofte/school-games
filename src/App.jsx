import BackgroundParticles from "./components/animated-backgrounds/BackgroundParticles";
import { Toaster } from "sonner";
import WindowSelector from "./components/WindowSelector";

function App() {
  return (
    <>
      <div className="w-full bg-neutral-900? text-white">
        <BackgroundParticles />
        <Toaster position="top-center" richColors className="max-w-[80%]" />
        {/* <Navigation /> */}
        <WindowSelector />
      </div>
    </>
  );
}

export default App;
