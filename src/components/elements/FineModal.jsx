import { useState, useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";
// import { useDispatch, useSelector } from "react-redux";
// import { modalHandler } from "../../redux/windowSlice";

const FineModal = ({
  isModalOpen,
  title,
  text,
  onConfirm,
  confirmText,
  onCancel,
  children,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  // const { isModalOpen, modalText, modalTitle, } = useSelector(
  //   (state) => state.window
  // );
  // const dispatch = useDispatch();

  useEffect(() => {
    if (isModalOpen) {
      setIsVisible(true);
      setTimeout(() => setIsAnimating(true), 100);
      // document.body.style.overflow = "hidden";
    } else {
      setIsAnimating(false);
      setTimeout(() => setIsVisible(false), 300);
      // document.body.style.overflow = "unset";
    }
    return () => {
      // document.body.style.overflow = "hidden";
    };
  }, [isModalOpen]);

  if (!isVisible) return null;

  // const closeModalHandler = () => dispatch(modalHandler(false));

  return (
    <div
      className={`fixed inset-0 p-5 z-50 flex items-center justify-center text-white transition-all duration-300 ${
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
          onClick={onCancel}
        >
          <IoCloseOutline size={20} />
        </button>
        {/* PIN CONTENT */}
        <div className="p-6 space-y-6">
          <div>
            <h1 className="font-bold text-xl mb-2">{title}</h1>
            <p>{text}</p>
          </div>
          {children && <div className="mb-4">{children}</div>}
          <div className="flex justify-between items-center">
            <button
              className="px-3 py-1 font-semibold bg-red-700 cursor-pointer rounded-lg"
              onClick={onCancel}
            >
              Vazgeç
            </button>
            <button
              className="px-3 py-1 font-semibold bg-teal-700 cursor-pointer rounded-lg"
              onClick={() => {
                onConfirm();
                onCancel();
              }}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
          isAnimating
            ? "bg-neutral-900 opacity-50 "
            : "bg-neutral-900 opacity-0 "
        }`}
        onClick={onCancel}
      ></div>
    </div>
  );
};

export default FineModal;
