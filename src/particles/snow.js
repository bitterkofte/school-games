import { MoveDirection } from "@tsparticles/engine";

export const snow = {
  background: {
    color: "#0a0029",
  },
  particles: {
    number: {
      value: 100,
    },
    // speed: {
    //   min: 0.1,
    //   max: 0.5,
    // },
    move: {
      direction: MoveDirection.top,
      enable: true,
      random: true,
      straight: true,
      // speed: {
      //   min: 0.1,
      //   max: 0.5,
      // },
    },
    opacity: {
      value: { min: 0.1, max: 0.2 },
    },
    size: {
      value: { min: 1, max: 10 },
    },
    wobble: {
      distance: 20,
      enable: true,
      speed: {
        min: -5,
        max: 5,
      },
    },
  },
};
