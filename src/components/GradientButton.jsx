import { useState } from "react";

const GradientButton = ({ children }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      // className={`
      //   relative overflow-hidden px-8 py-3 rounded-lg text-white font-bold
      //   transition-all duration-300 ease-in-out
      //   bg-gradient-to-r from-purple-500 via-pink-500 to-red-500
      //   bg-[length:200%_100%]
      //   ${isHovered ? "animate-gradient-x" : "bg-[position:0%_0%]"}
      // `}
      className="py-2 px-4 rounded-lg text-white font-bold hover:scale-105 shadow-lg transition-all duration-300 gradient-animation cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </button>
  );
};

export default GradientButton;
