import { useEffect, useRef, useState } from "react";
import { FaChevronDown, FaSearch } from "react-icons/fa";

export const SearchableDropdown = ({
  label,
  options,
  selected,
  selector,
  z = 0,
}) => {
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  // Filter options based on search term
  const filteredOptions = options.filter((option) =>
    typeof option === "string"
      ? option.toLowerCase().includes(searchTerm.toLowerCase())
      : option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectionChange = (selectedOption) => {
    selector(selectedOption);
    setIsSelectorOpen(false);
    setSearchTerm(""); // Clear search when selection is made
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDropdownToggle = () => {
    setIsSelectorOpen((prev) => {
      const newState = !prev;
      if (newState) {
        // Focus search input when dropdown opens
        setTimeout(() => {
          searchInputRef.current?.focus();
        }, 100);
      } else {
        // Clear search when dropdown closes
        setSearchTerm("");
      }
      return newState;
    });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      setIsSelectorOpen(false);
      setSearchTerm("");
    } else if (event.key === "Enter" && filteredOptions.length > 0) {
      handleSelectionChange(filteredOptions[0]);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsSelectorOpen(false);
        setSearchTerm("");
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="h-10 relative">
      <div
        className={`relative w-96 overflow-hidden rounded-t-lg select-none transition-all duration-500 cursor-pointer ${
          isSelectorOpen ? "pb-88" : ""
        }`}
        ref={dropdownRef}
      >
        {/* SECTION SELECTED */}
        <div
          className={`h-12 box-border relative px-3 py-3 rounded-lg border-3 outline-none bg-gray-600 text-lime-400 font-semibold text-xl flex justify-between items-center transition-all duration-500 ${
            isSelectorOpen ? "border-lime-500" : "border-gray-500"
          }`}
          onClick={handleDropdownToggle}
          style={{ zIndex: 2 + z }}
        >
          {selected.label || selected || (
            <span className="text-gray-400 italic text-sm">
              {label} seçiniz
            </span>
          )}
          <span
            className={`flex items-center transition-all duration-500 ${
              isSelectorOpen
                ? "rotate-180 text-lime-500"
                : "rotate-0 text-lime-50"
            }`}
          >
            <FaChevronDown size={14} />
          </span>
        </div>

        {/* SECTION OPTIONS CONTAINER */}
        <div
          className={`box-border w-full pt-6 pb-2 px-2.5 absolute border-3 rounded-b-lg bg-lime-900 text-gray-100 transition-all duration-500 cursor-default ${
            isSelectorOpen ? "top-7 border-lime-500" : "-top-80 border-gray-500"
          }`}
          style={{ zIndex: 1 + z }}
        >
          {/* SEARCH INPUT */}
          <div className="relative mb-3">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="h-4 w-4 text-gray-400" />
            </div>
            <input
              ref={searchInputRef}
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
              placeholder="Search options..."
              className="w-full pl-10 pr-3 py-2 bg-lime-800 border border-lime-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-lime-500 transition-colors duration-200"
            />
          </div>

          {/* SECTION OPTIONS */}
          <div className="max-h-48 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((type) => (
                <div
                  className="border-l-4 border-transparent rounded-r-lg py-2 px-2 mb-1 last:mb-0 cursor-pointer transition-all duration-200 hover:border-lime-500 hover:bg-lime-700"
                  key={type.value || type}
                  onClick={() => handleSelectionChange(type)}
                >
                  {type.label || type}
                </div>
              ))
            ) : (
              <div className="py-2 px-2 text-gray-400 text-center italic">
                No options match your search
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SECTION LABEL */}
      <label
        className={`absolute px-2 py-1 -top-2 left-2 text-xs font-semibold bg-gray-600 rounded-2xl select-none after:content-[''] after:absolute after:left-0 after:top-0 after:right-0 after:bottom-[57%] after:border-3 after:border-b-0 after:rounded-t-[10px] after:transition-all after:duration-500 transition-all duration-500 ${
          isSelectorOpen
            ? "text-lime-500 after:border-lime-500"
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
