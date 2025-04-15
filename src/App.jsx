import { useEffect, useMemo, useState } from "react";
import Question from "./components/Question";
import BackgroundParticles from "./components/animated-backgrounds/BackgroundParticles";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import TurkiyeProvinceQuestion from "./components/questions/TurkiyeProvinceQuestion";
import { Toaster } from "sonner";
// import { loadSlim } from "@tsparticles/slim"; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.
// import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.

function App() {
  return (
    <>
      <div className="relative bg-neutral-900 text-white">
        <BackgroundParticles />
        <Toaster position="top-center" richColors />
        <div className="fixed top-0 left-0 w-full h-full z-10 flex flex-col items-center justify-center">
          <Question />
        </div>
      </div>
    </>
  );
}

export default App;
