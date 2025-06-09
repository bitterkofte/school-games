import { useEffect, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa6";

export const Dropdown = ({ label, options, selected, selector, z }) => {
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleSelectionChange = (event) => {
    console.log("event.target.value: ", selected);
    const One = options.find((f) => f.value === event.target.value);
    selector(One);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsSelectorOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="h-10 w-full relative">
      <div
        className={`relative w-full md:w-96 overflow-hidden rounded-t-lg select-none transition-all duration-500 cursor-pointer ${
          isSelectorOpen ? "pb-88" : ""
        }`}
        ref={dropdownRef}
      >
        {/* SECTION SELECTED */}
        <div
          className={`h-12 box-border relative px-3 py-3 rounded-lg border-3 outline-none bg-gray-600 text-sky-400 font-semibold text-xl flex justify-between items-center transition-all duration-500 ${
            isSelectorOpen ? "border-sky-500" : "border-gray-500"
          }`}
          onClick={() => setIsSelectorOpen((prev) => !prev)}
          value={selected.value}
          onChange={handleSelectionChange}
          style={{ zIndex: 2 + z }}
        >
          <span className="truncate">{selected.label}</span>
          <span
            className={`flex items-center transition-all duration-500 ${
              isSelectorOpen
                ? "rotate-180 text-sky-500"
                : "rotate-0 text-sky-50"
            }`}
          >
            <FaChevronDown size={14} />
          </span>
        </div>

        {/* SECTION OPTIONS CONTAINER */}
        <div
          className={`box-border w-full pt-6 pb-2 px-2.5 absolute border-3 rounded-b-lg bg-sky-900 text-gray-100 transition-all duration-500 cursor-default ${
            isSelectorOpen ? "top-7 border-sky-500" : "-top-80 border-gray-500"
          }`}
          style={{ zIndex: 1 + z }}
        >
          {/* SECTION OPTIONS */}
          {options.map((type) => (
            <div
              className="border-l-4 border-transparent rounded-r-lg py-2 px-2 mb-1 last:mb-0 cursor-pointer transition-all duration-200 hover:border-sky-500 hover:bg-sky-700"
              key={type.value}
              onClick={() => {
                selector(type);
                setIsSelectorOpen(false);
              }}
            >
              {type.label}
            </div>
          ))}
        </div>
      </div>

      {/* SECTION LABEL */}
      <label
        className={`absolute px-2 py-1 -top-2 left-2 text-xs font-semibold bg-gray-600 rounded-2xl select-none after:content-[''] after:absolute after:left-0 after:top-0 after:right-0 after:bottom-[57%] after:border-3 after:border-b-0 after:rounded-t-[10px] after:transition-all after:duration-500 transition-all duration-500 ${
          isSelectorOpen
            ? "text-sky-500 after:border-sky-500"
            : "text-gray-300 after:border-gray-500"
        }`}
        htmlFor="questionType"
        style={{ zIndex: 3 + z }}
      >
        {label}
      </label>
    </div>
  );
};
