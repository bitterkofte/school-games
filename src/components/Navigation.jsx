import { useState } from "react";
import { FaMapSigns } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { windowSelector } from "../redux/windowSlice";
import { ImExit } from "react-icons/im";
import { AiFillHome } from "react-icons/ai";

const Navigation = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { window } = useSelector((state) => state.window);

  const dispatch = useDispatch();

  // const hoverAnimationHanler

  const leftButtonHandler = () => {
    if (window === "quiz") dispatch(windowSelector("results"));
    else if (window === "results") dispatch(windowSelector("home"));
    else dispatch(windowSelector("main-menu"));
  };

  const iconSelector = () => {
    switch (window) {
      case "quiz":
        return <ImExit />;
      case "results":
        return <AiFillHome />;
      // case "learn":
      //   return <FaMapSigns />;
      // case "create-test":
      //   return <FaMapSigns />;
      default:
        return <FaArrowLeft />;
    }
  };

  return (
    <div
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`fixed top-0 left-0 animate-nav-slide w-[4.5%] hover:w-[100%] flex items-center rounded-r-2xl hover:rounded-none text-2xl hover:shadow-2xl backdrop-blur-xl bg-purple-600/30 text-white ease-in-out transition-all duration-300 z-50 overflow-hidden ${
        window === "main-menu" ? "translate-x-[-100%]" : "translate-x-0"
      }`}
    >
      <div
        className={`p-5 cursor-pointer ${
          isHovered ? "rotate-[720deg]" : "rotate-0"
        } transition-transform duration-100 ease-in-out`}
        onClick={leftButtonHandler}
      >
        {!isHovered ? <FaMapSigns /> : iconSelector()}
      </div>
    </div>
  );
};
export default Navigation;
