import { IoCloseOutline } from "react-icons/io5";
import FineAccordion from "./FineAccordion";

export default function FineSidebar({ isSidebarOpen, setIsSidebarOpen }) {
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full md:w-96 h-full bg-gray-900 text-white transition-transform duration-300 ease-in-out z-10 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-8 mt-1">
          <h2 className="text-xl font-bold">Menü</h2>
          <button
            onClick={toggleSidebar}
            className="cursor-pointer hover:text-red-500 transition-colors"
          >
            <IoCloseOutline size={24} />
          </button>
        </div>

        <FineAccordion title={"Testlerim"}>
          <button className="">a</button>
          <button className="">b</button>
          <button className="">c</button>
          <button className="">c</button>
          <button className="">c</button>
          <button className="">c</button>
          <button className="">c</button>
        </FineAccordion>
      </div>
    </div>
  );
}
