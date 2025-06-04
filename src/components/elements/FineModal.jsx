import { useState, useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";

const FineModal = ({ isOpen, onClose, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setTimeout(() => setIsAnimating(true), 10);
      // const scrollbarWidth =
      //   window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      // document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      setIsAnimating(false);
      setTimeout(() => setIsVisible(false), 300);
      document.body.style.overflow = "unset";
      // document.body.style.paddingRight = "0px";
    }
    return () => {
      document.body.style.overflow = "hidden";
      // document.body.style.paddingRight = "0px";
    };
  }, [isOpen]);

  if (!isVisible) return null;

  const handleBackdropClick = (e) => {
    onClose();
    // }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center text-white transition-all duration-300 ${
        isAnimating ? "backdrop-blur-xl" : "backdrop-blur-none"
      }`}
    >
      <div
        className={`max-w-md w-full max-h-[90vh] z-[51] bg-slate-700/70 rounded-lg shadow-2xl overflow-auto transform transition-all duration-300 ${
          isAnimating
            ? "scale-100 opacity-100 translate-y-0"
            : "scale-90 opacity-0 translate-y-4"
        }`}
      >
        <button
          className="p-1 top-6 right-6 bg-slate-600 hover:bg-red-800/50 absolute cursor-pointer rounded-md transition-all duration-300"
          onClick={onClose}
        >
          <IoCloseOutline size={20} />
        </button>
        {/* PIN CONTENT */}
        <div className="p-6 space-y-8">{children}</div>
      </div>
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
          isAnimating
            ? "bg-neutral-900 opacity-50 "
            : "bg-neutral-900 opacity-0 "
        }`}
        onClick={handleBackdropClick}
      ></div>
    </div>
  );
};

export default FineModal;
