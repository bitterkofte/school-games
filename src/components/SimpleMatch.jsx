import React, { useState } from "react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { mQuestions } from "../data/wholeQuestions";

export default function MatchingQuestion() {
  const question = mQuestions[0];
  const [matches, setMatches] = useState(
    Array(question.answer.length).fill(null)
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const draggedItem = active.id;
    const dropZoneIndex = parseInt(over.id.replace("drop-", ""), 10);

    setMatches((prev) => {
      const updated = [...prev];
      const existingIndex = updated.findIndex((val) => val === draggedItem);
      if (existingIndex !== -1) updated[existingIndex] = null;
      updated[dropZoneIndex] = draggedItem;
      return updated;
    });
  };

  const checkAnswers = () => {
    return matches.every((pair, i) => pair === question.answer[i].pair);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">{question.text}</h2>
      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex gap-8">
          <div className="space-y-4">
            {question.answer.map((item, index) => (
              <div
                key={index}
                className="p-2 border rounded bg-purple-600 w-32 text-center"
              >
                {item.main}
              </div>
            ))}
          </div>

          <div className="space-y-4">
            {question.answer.map((item, index) => (
              <DropSlot
                key={index}
                id={`drop-${index}`}
                children={
                  matches[index] && <DraggableItem id={matches[index]} />
                }
              />
            ))}
          </div>

          <div className="space-y-4">
            {question.answer.map((item, index) =>
              !matches.includes(item.pair) ? (
                <DraggableItem key={item.pair} id={item.pair} />
              ) : null
            )}
          </div>
        </div>
      </DndContext>

      <button
        onClick={() => alert(checkAnswers() ? "Doğru!" : "Yanlış")}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
      >
        Cevapları Kontrol Et
      </button>
    </div>
  );
}

function DraggableItem({ id }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="p-2 bg-black border rounded shadow cursor-grab w-32 text-center"
      style={style}
    >
      {id}
    </div>
  );
}

function DropSlot({ id, children }) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`w-32 h-10 border-2 rounded flex items-center justify-center ${
        isOver ? "border-green-500 bg-green-700" : "border-gray-700 bg-gray-700"
      }`}
    >
      {children}
    </div>
  );
}
