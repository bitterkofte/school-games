export default function HamburgerMenu({ isOpen }) {
  return (
    <div className="w-[20px] h-[15px] relative cursor-pointer transform transition-transform duration-500 ease-in-out">
      {/* First span */}
      <span
        className={`
            block absolute w-full bg-white rounded-full opacity-100 left-0
            transform transition-all duration-[400ms] ease-in-out
            ${isOpen ? "h-[2px] top-[6px] rotate-45" : "h-[2px] top-0 rotate-0"}
          `}
      />

      {/* Second span */}
      <span
        className={`
            block absolute h-[2.5px] w-full bg-white rounded-full left-0 top-[6px]
            transform transition-all duration-[400ms] ease-in-out
            ${
              isOpen ? "opacity-0 -translate-x-16" : "opacity-100 translate-x-0"
            }
          `}
      />

      {/* Third span */}
      <span
        className={`
            block absolute w-full bg-white rounded-full opacity-100 left-0
            transform transition-all duration-[400ms] ease-in-out
            ${
              isOpen
                ? "h-[2px] top-[6px] -rotate-45"
                : "h-[2px] top-[12px] rotate-0"
            }
          `}
      />
    </div>
  );
}
