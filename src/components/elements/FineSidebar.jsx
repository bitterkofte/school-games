import { IoCloseOutline } from "react-icons/io5";
import FineAccordion from "./FineAccordion";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function FineSidebar({
  isSidebarOpen,
  // setIsSidebarOpen,
  children,
}) {
  // const { myTests } = useSelector((state) => state.question);

  // const toggleSidebar = () => {
  //   setIsSidebarOpen(!isSidebarOpen);
  // };
  // const [myTests, setMyTests] = useState(localStorage.getItem("MyTests") || []);

  return (
    <div
      className={`fixed top-0 left-0 w-full md:w-96 h-full bg-gray-900 text-white transition-transform duration-300 ease-in-out z-10 select-none ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="p-5">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold">Menü</h2>
          {/* <button
            onClick={toggleSidebar}
            className="cursor-pointer hover:text-red-500 transition-colors"
          >
            <IoCloseOutline size={24} />
          </button> */}
        </div>

        {children}
      </div>
    </div>
  );
}
