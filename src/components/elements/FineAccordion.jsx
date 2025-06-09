import { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";

const FineAccordion = ({ title, children }) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  return (
    <div className="bg-gray-600/20 rounded-lg shadow-md overflow-hidden select-none">
      <div
        onClick={() => setIsAccordionOpen(!isAccordionOpen)}
        className="w-full text-left cursor-pointer transition-colors duration-200"
      >
        <div className="p-4 flex justify-between items-center">
          <h3 className="text-lg font-semibold">{title}</h3>
          <div className="flex-shrink-0">
            <FaChevronDown
              className={`${
                isAccordionOpen ? "rotate-180" : "rotate-0"
              } transition-transform duration-200`}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div
        className={`px-3 flex flex-col gap-2 items-start bg-gray-600/20 transition-all  ${
          isAccordionOpen
            ? "py-2 max-h-96 opacity-100 duration-[820ms]"
            : "py-0 max-h-0 opacity-40 duration-300"
        }`}
      >
        {/* <div className="py-2 flex flex-col gap-2 items-start">{children}</div> */}
        {children}
      </div>
    </div>
  );
};
export default FineAccordion;
