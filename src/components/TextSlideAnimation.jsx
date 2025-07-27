import React, { useState } from "react";

const TextSlideAnimation = () => {
  const [currentName, setCurrentName] = useState("John Doe");
  const [isAnimating, setIsAnimating] = useState(false);

  const names = [
    "John Doe",
    "Jane Smith",
    "Alex Johnson",
    "Maria Garcia",
    "David Wilson",
  ];

  const changeName = () => {
    if (isAnimating) return;

    setIsAnimating(true);

    // After exit animation completes, change text and start enter animation
    setTimeout(() => {
      const currentIndex = names.indexOf(currentName);
      const nextIndex = (currentIndex + 1) % names.length;
      setCurrentName(names[nextIndex]);

      // Reset animation state after enter animation completes
      setTimeout(() => {
        setIsAnimating(false);
      }, 500);
    }, 500);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 p-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">
          Horizontal Slide Text Animation
        </h1>
        <p className="text-white/80">
          Click the button to see the text animation effect
        </p>
      </div>

      <div className="relative mb-12">
        <div className="text-container relative overflow-hidden bg-sky-600 backdrop-blur-sm rounded-lg px-8 py-6 border border-white/20">
          <div
            className={`whole relative w-[800px] text-center text-8xl font-bold text-white transition-all duration-600 ease-in-out ${
              isAnimating ? "slide-out" : "slide-in"
            }`}
          >
            <div className="relative w-full text-transparent select-none -z-20">
              INVISIBLE
            </div>
            {/* <div
              className={`bgtop w-full absolute z-50 bg-sky-600 text-transparent select-none ${
                isAnimating ? "smash" : ""
              }`}
            >
              BG TOP
            </div>
            <div
              className={`bgbot w-full absolute z-50 bg-sky-600 text-transparent select-none ${
                isAnimating ? "smash" : ""
              }`}
            >
              BG BOT
            </div> */}
            <div
              className={`toppart bg-red-400 w-full h-full absolute overflow-hidden`}
            >
              <div
                className={`toppart bg-red-400 w-full absolute ${
                  isAnimating ? "t-disappear" : "t-appear"
                }`}
              >
                {currentName}
              </div>
            </div>
            <div
              className={`botpart bg-red-600 w-full h-full absolute overflow-hidden`}
            >
              <div
                className={`botpart bg-red-600 w-full absolute ${
                  isAnimating ? "b-disappear" : "b-appear"
                }`}
              >
                {currentName}
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={changeName}
        disabled={isAnimating}
        className={`px-8 py-4 bg-white text-purple-600 font-semibold rounded-lg shadow-lg transition-all duration-200 hover:bg-white/90 hover:shadow-xl hover:scale-105 ${
          isAnimating ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        {isAnimating ? "Animating..." : "Change Name"}
      </button>
    </div>
  );
};

export default TextSlideAnimation;
