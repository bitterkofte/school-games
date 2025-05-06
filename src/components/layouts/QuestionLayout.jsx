import { useDispatch, useSelector } from "react-redux";
import Question from "../Question";
import AnimatedNumbers from "../AnimatedNumbers";
import { ImExit } from "react-icons/im";
import { windowSelector } from "../../redux/windowSlice";
import { toast } from "sonner";

const QuestionLayout = () => {
  const { points } = useSelector((state) => state.question);
  const dispatch = useDispatch();
  return (
    <>
      <div className="fixed top-5 right-5 text-6xl font-extrabold select-none">
        <AnimatedNumbers points={points} />
      </div>
      <div className="p-5 fixed top-0 left-0 w-full h-full z-10 flex flex-col items-center justify-center">
        <Question />
      </div>
      <div
        onClick={() => {
          toast.dismiss();
          dispatch(windowSelector("results"));
        }}
        className="fixed bottom-5 left-5 p-2 py-3 pl-3 text-3xl bg-red-500 rounded-xl opacity-70 hover:opacity-100 cursor-pointer z-50 transition-all duration-200"
      >
        <ImExit />
      </div>
    </>
  );
};
export default QuestionLayout;
