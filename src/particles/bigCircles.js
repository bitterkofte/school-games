import { MoveDirection, OutMode } from "@tsparticles/engine";

export const bigCircles = {
  fpsLimit: 120,
  background: {
    color: "#1c1826",
  },
  particles: {
    number: {
      value: 50,
    },
    color: {
      value: [
        "#3998D0",
        "#2EB6AF",
        "#A9BD33",
        "#FEC73B",
        "#F89930",
        "#F45623",
        "#D62E32",
        "#EB586E",
        "#9952CF",
      ],
    },
    shape: {
      type: "circle",
    },
    opacity: {
      // value: { min: 0.4, max: 0.8 },
      value: { min: 0.1, max: 0.3 },
    },
    size: {
      value: { min: 50, max: 100 },
    },
    move: {
      enable: true,
      angle: {
        value: 30,
        offset: 0,
      },
      speed: {
        min: 1,
        max: 2,
      },
      // speed: 10,
      direction: MoveDirection.top,
      outModes: {
        default: OutMode.destroy,
        bottom: OutMode.none,
      },
    },
  },
  detectRetina: true,
  emitters: {
    position: {
      x: 50,
      y: 134,
    },
    rate: {
      delay: 0.5,
      quantity: 0.4,
    },
    size: {
      width: 100,
      height: 50,
    },
  },
};
