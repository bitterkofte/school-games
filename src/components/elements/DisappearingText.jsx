const DisappearingText = ({ district, isAnimating, placeholder }) => {
  const isPlaceholder =
    district === placeholder ? "text-white/50 italic font-medium" : "";
  return (
    <div className="text-container relative overflow-hidden bg-sky-600ç">
      <div
        className={`whole relative w-full text-center text-lg font-bold text-white transition-all duration-600 ease-in-out ${
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
          className={`toppart ${isPlaceholder} bg-red-400Ç w-full h-full absolute overflow-hidden`}
        >
          <div
            className={`toppart bg-red-400Ç w-full absolute ${
              isAnimating ? "t-disappear" : "t-appear"
            }`}
          >
            {district}
          </div>
        </div>
        <div
          className={`botpart ${isPlaceholder} bg-red-600Ç w-full h-full absolute overflow-hidden`}
        >
          <div
            className={`botpart bg-red-600Ç w-full absolute ${
              isAnimating ? "b-disappear" : "b-appear"
            }`}
          >
            {district}
          </div>
        </div>
      </div>
      {/* <button
          onClick={changeName}
          disabled={isAnimating}
          className={`px-8 py-4 bg-white text-purple-600 font-semibold rounded-lg shadow-lg transition-all duration-200 hover:bg-white/90 hover:shadow-xl hover:scale-105 ${
            isAnimating ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          {isAnimating ? "Animating..." : "Change Name"}
        </button> */}
    </div>
  );
};
export default DisappearingText;
