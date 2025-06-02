import { useState } from "react";

// Reusable Sliding Switch Component
export function FineSwitch({
  option1 = "Option 1",
  option2 = "Option 2",
  option1Color = "bg-blue-500",
  option2Color = "bg-red-500",
  defaultSelected = 1,
  onChange,
}) {
  const [selectedOption, setSelectedOption] = useState(defaultSelected);

  const handleOptionChange = (option) => {
    if (selectedOption === option) return; // Prevent re-selection
    setSelectedOption(option);
    if (onChange) {
      onChange(option, option === 1 ? option1 : option2);
    }
  };

  return (
    <div className="relative w-full inline-flex bg-gray-300 rounded-full p-1 shadow-inner">
      {/* Sliding Background */}
      <div
        className={`absolute top-1 bottom-1 rounded-full transition-all duration-300 ease-in-out ${
          selectedOption === 1
            ? `left-1 right-1/2 ${option1Color}`
            : `left-1/2 right-1 ${option2Color}`
        }`}
      />
      {/* Option 1 */}
      <button
        onClick={() => handleOptionChange(1)}
        className={`relative w-full z-[2] px-6 py-2 rounded-full font-semibold transition-colors duration-300 ${
          selectedOption === 1
            ? "text-white"
            : "text-gray-600 hover:text-gray-800 cursor-pointer"
        }`}
      >
        {option1}
      </button>
      {/* Option 2 */}
      <button
        onClick={() => handleOptionChange(2)}
        className={`relative w-full z-[2] px-6 py-2 rounded-full font-semibold transition-colors duration-300 ${
          selectedOption === 2
            ? "text-white"
            : "text-gray-600 hover:text-gray-800 cursor-pointer"
        }`}
      >
        {option2}
      </button>
    </div>
  );
}

// Demo Component showing different examples
export default function FineSwitchDemo() {
  const [truefalseValue, setTrueFalseValue] = useState(null);
  const [yesnoValue, setYesNoValue] = useState(null);
  const [onoffValue, setOnOffValue] = useState(null);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 space-y-8">
      {/* True/False Switch (Original) */}
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-4">True/False Switch</h3>
        <FineSwitch
          option1="True"
          option2="False"
          option1Color="bg-green-500"
          option2Color="bg-red-500"
          defaultSelected={1}
          onChange={(optionNumber, optionText) => setTrueFalseValue(optionText)}
        />
        {truefalseValue && (
          <p className="mt-2 text-sm">
            Selected: <span className="font-semibold">{truefalseValue}</span>
          </p>
        )}
      </div>

      {/* Yes/No Switch */}
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-4">Yes/No Switch</h3>
        <FineSwitch
          option1="Yes"
          option2="No"
          option1Color="bg-emerald-500"
          option2Color="bg-rose-500"
          defaultSelected={2}
          onChange={(optionNumber, optionText) => setYesNoValue(optionText)}
        />
        {yesnoValue && (
          <p className="mt-2 text-sm">
            Selected: <span className="font-semibold">{yesnoValue}</span>
          </p>
        )}
      </div>

      {/* On/Off Switch */}
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-4">On/Off Switch</h3>
        <FineSwitch
          option1="On"
          option2="Off"
          option1Color="bg-blue-500"
          option2Color="bg-gray-500"
          defaultSelected={1}
          onChange={(optionNumber, optionText) => setOnOffValue(optionText)}
        />
        {onoffValue && (
          <p className="mt-2 text-sm">
            Selected: <span className="font-semibold">{onoffValue}</span>
          </p>
        )}
      </div>

      {/* Custom Example */}
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-4">Custom Colors & Text</h3>
        <FineSwitch
          option1="Light"
          option2="Dark"
          option1Color="bg-yellow-400"
          option2Color="bg-purple-600"
          defaultSelected={1}
        />
      </div>
    </div>
  );
}
