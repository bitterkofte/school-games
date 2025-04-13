import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { MoveDirection } from "@tsparticles/engine";
// import { loadSlim } from "@tsparticles/slim"; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.
import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { snow } from "../../particles/snow";
import { bigCircles } from "../../particles/bigCircles";

const BackgroundParticles = () => {
  const [init, setInit] = useState(false);
  const [svgBG, setSvgBG] = useState(bigCircles);

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      //await loadAll(engine);
      await loadFull(engine);
      // await loadSlim(engine);
      //await loadBasic(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = (container) => {
    console.log(container);
  };

  const options = useMemo(() => svgBG, [svgBG]);

  if (init) {
    return (
      <>
        {/* <div
          className="z-50 fixed top-5 left-5 p-4 rounded-2xl bg-amber-600/70 select-none text-xs"
          onClick={() =>
            setSvgBG((prev) => ({
              ...prev,
              particles: {
                ...prev.particles,
                move: {
                  ...prev.particles.move,
                  enable: !prev.particles.move.enable,
                  // enable: prev.particles.move.enable ? false : true,
                },
              },
            }))
          }
        >
          ▐▐
        </div> */}
        <div className="fixed top-0 left-0 w-full h-full blur-2xl">
          <Particles
            id="tsparticles"
            particlesLoaded={particlesLoaded}
            options={options}
          />
        </div>
      </>
    );
  }
};

export default BackgroundParticles;
