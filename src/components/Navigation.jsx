import { useState } from "react";
import { FaMapSigns } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { windowSelector } from "../redux/windowSlice";

const Navigation = () => {
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();

  // const hoverAnimationHanler

  const leftButtonHandler = () => {
    dispatch(windowSelector("main-menu"));
  };

  return (
    <div
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed top-0 left-0 w-[4.5%] hover:w-[100%] flex items-center rounded-r-2xl hover:rounded-none text-2xl hover:shadow-2xl backdrop-blur-xl bg-purple-600/30 text-white ease-in-out transition-all duration-300 z-50 overflow-hidden"
    >
      <div
        className={`p-5 cursor-pointer ${
          isHovered ? "rotate-[720deg]" : "rotate-0"
        } transition-transform duration-100 ease-in-out`}
        onClick={leftButtonHandler}
      >
        {!isHovered ? <FaMapSigns /> : <FaArrowLeft />}
      </div>
    </div>
  );
};
export default Navigation;
