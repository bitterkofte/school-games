const FineInput = ({
  maxLength,
  isFocused,
  setFocused,
  onChange,
  value,
  index,
  label,
}) => {
  return (
    <div
      // className="flex justify-between items-center border-2 border-gray-400 px-2 py-1 rounded"
      className={`flex justify-between items-center box-border relative px-2 pt-3 pb-2 rounded-lg border-3 outline-none bg-gray-600 font-semibold text-xl transition-all duration-500 ${
        isFocused === index ? "border-lime-500" : "border-gray-500"
      }`}
      key={index}
    >
      <input
        type="text"
        value={value}
        maxLength={maxLength}
        className="w-full pl-2 bg-transparent border-0 outline-0 placeholder:opacity-50"
        onChange={(e) => onChange(e.target.value, index)}
        placeholder={`${label} ${index + 1}`}
        onFocus={() => setFocused(index)}
        onBlur={() => setFocused(false)}
      />
      <label
        className={`absolute px-2 py-1 -top-2.5 left-2 text-xs font-semibold bg-gray-600 rounded-2xl select-none after:content-[''] after:absolute after:left-0 after:top-0 after:right-0 after:bottom-[57%] after:border-3 after:border-b-0 after:rounded-t-[10px] after:transition-all after:duration-500 transition-all duration-500 ${
          isFocused === index
            ? "text-lime-500 after:border-lime-500"
            : "text-gray-300 after:border-gray-500"
        }`}
      >
        {label} {index + 1}
      </label>
    </div>
  );
};
export default FineInput;
