import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isCorrectHandler, selectedHandler } from "../../redux/questionSlice";

import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const SortableItem = ({ id, text, correctId, index, showAnswer }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      {...(!showAnswer ? attributes : {})} // Disable attributes when showAnswer is true
      {...(!showAnswer ? listeners : {})} // Disable listeners when showAnswer is true
      style={style}
      className={`p-3 z-50 rounded-xl mb-2 text-white shadow select-none hover:cursor-grab active:cursor-grabbing ${
        !showAnswer
          ? "backdrop-blur-xl bg-neutral-300/10"
          : id === correctId
          ? "border-green-600 bg-green-700/70"
          : "border-red-500 bg-red-700/60"
      }`}
    >
      {text}
    </div>
  );
};

const SortingQuestion = () => {
  const quiz = useSelector((state) => state.question);
  const dispatch = useDispatch();
  const question = quiz.questions[quiz.currentQuestionNo];

  const [order, setOrder] = useState(question.options.map((opt) => opt.id));
  const sensors = useSensors(
    useSensor(PointerSensor) // Disable dragging when quiz.showAnswer is true
  );

  const handleDragEnd = (event) => {
    if (quiz.showAnswer) return;
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = order.indexOf(active.id);
      const newIndex = order.indexOf(over.id);
      setOrder((prev) => arrayMove(prev, oldIndex, newIndex));
    }
  };

  // const isCorrect = () =>
  //   order.every((id, i) => id === question.answer[i]);

  useEffect(() => {
    // dispatch(isCorrectHandler(isCorrect()));
    dispatch(selectedHandler(order)); // Update selected options in the store
  }, [order]);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={order} strategy={verticalListSortingStrategy}>
        {order.map((id, index) => {
          const option = question.options.find((o) => o.id === id);
          const correctId = question.answer[index];

          return (
            <SortableItem
              key={id}
              id={id}
              text={option.text}
              index={index}
              correctId={correctId}
              showAnswer={quiz.showAnswer}
            />
          );
        })}
      </SortableContext>
    </DndContext>
  );
};

export default SortingQuestion;
