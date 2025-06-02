export const randomizer = (array) =>
  [...array].sort(
    () => crypto.getRandomValues(new Uint32Array(1))[0] - 2147483648
  );
