import React, { useEffect, useState } from "react";
import {
  DndContext,
  PointerSensor,
  TouchSensor,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useDispatch, useSelector } from "react-redux";
import { optionStyles } from "../../styles/optionStyles";
import { randomizer } from "../../functions/randomizer";
import { selectedHandler } from "../../redux/questionSlice";

export default function MatchingQuestion() {
  const { questions, currentQuestionNo } = useSelector(
    (state) => state.question
  );
  const dispatch = useDispatch();
  const question = questions[currentQuestionNo];
  // const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor)); // Track which option is in which dropzone
  const [droppedItems, setDroppedItems] = useState({});

  // Track which options have been placed in dropzones
  const [placedOptions, setPlacedOptions] = useState([]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;
    const draggedId = active.id;

    // If dragging from options to a dropzone
    if (over.id.startsWith("drop-")) {
      // Check if this dropzone already has an item
      const existingItem = droppedItems[over.id];
      // If dropzone has an item and it's different from what we're dragging,
      // return that item to options
      if (existingItem && existingItem !== draggedId) {
        setPlacedOptions((prev) => prev.filter((id) => id !== existingItem));
      }

      // Check if this item was already in another dropzone
      const previousDropzone = Object.keys(droppedItems).find(
        (key) => droppedItems[key] === draggedId
      );
      // If item was in another dropzone, remove it from there
      if (previousDropzone) {
        setDroppedItems((prev) => {
          const newItems = { ...prev };
          delete newItems[previousDropzone];
          return newItems;
        });
      }
      // If item wasn't placed yet, add it to placedOptions
      else if (!placedOptions.includes(draggedId)) {
        setPlacedOptions((prev) => [...prev, draggedId]);
      }
      // Place item in new dropzone
      setDroppedItems((prev) => ({
        ...prev,
        [over.id]: draggedId,
      }));
    }

    // If dragging to the options container (removing from dropzone)
    if (over.id === "options-container") {
      // Find which dropzone had this item
      const dropzoneWithItem = Object.keys(droppedItems).find(
        (key) => droppedItems[key] === draggedId
      );

      if (dropzoneWithItem) {
        // Remove from dropzone
        setDroppedItems((prev) => {
          const newItems = { ...prev };
          delete newItems[dropzoneWithItem];
          return newItems;
        });

        // Remove from placed options
        setPlacedOptions((prev) => prev.filter((id) => id !== draggedId));
      }
    }
  };

  // Get all options that haven't been placed in dropzones
  const availableOptions = randomizer([...question.answer]).filter(
    (pair) => !placedOptions.includes(pair.pair)
  );

  useEffect(() => {
    if (availableOptions.length === 0) {
      dispatch(
        selectedHandler(
          Object.values(
            Object.keys(droppedItems)
              .sort() // Sorts keys alphabetically
              .reduce((acc, key) => {
                acc[key] = droppedItems[key];
                return acc;
              }, {})
          )
        )
      );
    }
    // console.log("placedOptions: ", placedOptions);
    // console.log("droppedItems: ", droppedItems);
  }, [placedOptions]);

  useEffect(() => {
    setDroppedItems({}); // Reset dropped items when question changes
    setPlacedOptions([]); // Reset placed options when question changes
  }, [currentQuestionNo]);

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {/* Options container - marked as a drop target to allow returning items */}
      <div
        className="mt-6 flex flex-wrap gap-2 min-h-16? p-2 rounded bg-neutral-900/30 select-none"
        id="options-container"
      >
        <OptionsContainer>
          {availableOptions.map((pair, i) => (
            <DraggableItem key={i} id={pair.pair} isPlaced={false} />
          ))}

          {/* Add already placed items that are currently in dropzones */}
          {Object.values(droppedItems).map((id, i) => (
            <div key={`placeholder-${i}`} className="h-10 w-0"></div>
          ))}
        </OptionsContainer>
      </div>
      <div className="p-2 flex flex-col gap-4 select-none">
        {/* Dropzones */}
        {question.answer.map((pair, index) => (
          <div key={index} className="flex items-center gap-6">
            <span className="w-24 font-semibold">{pair.main}</span>
            <DropZone id={`drop-${index}`}>
              {droppedItems[`drop-${index}`] && (
                <DraggableItem
                  id={droppedItems[`drop-${index}`]}
                  isPlaced={true}
                  // main={pair.main}
                  correct={pair.pair}
                />
              )}
            </DropZone>
          </div>
        ))}
      </div>
    </DndContext>
  );
}

// Options container that serves as a dropzone for returning items
function OptionsContainer({ children }) {
  const { setNodeRef } = useDroppable({
    id: "options-container",
  });

  return (
    <div ref={setNodeRef} className="w-full flex flex-wrap gap-2">
      {children}
    </div>
  );
}

function DraggableItem({ id, isPlaced, correct }) {
  const { showAnswer, questions, currentQuestionNo } = useSelector(
    (state) => state.question
  );
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
      // This allows items to be dragged from dropzones
      data: { isPlaced },
    });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    zIndex: isDragging ? 999 : 1,
  };

  const isCorrect = correct === id;

  const bgStyle = showAnswer
    ? isCorrect
      ? "bg-green-600 cursor-not-allowed"
      : "bg-red-600 cursor-not-allowed"
    : "bg-neutral-300/10 cursor-move";

  const dragStyle = isDragging ? "opacity-50" : "opacity-100";

  return (
    <div
      ref={setNodeRef}
      // {...listeners}
      // {...attributes}
      {...(!showAnswer ? attributes : {})} // Disable attributes when showAnswer is true
      {...(!showAnswer ? listeners : {})} // Disable listeners when showAnswer is true
      style={style}
      className={`px-4 py-2 backdrop-blur-xl? bg-neutral-300/10? rounded shadow w-max touch-none ${dragStyle} ${bgStyle}`}
    >
      {id}
    </div>
  );
}

function DropZone({ id, children }) {
  const { isOver, setNodeRef } = useDroppable({ id });
  const hasItem = React.Children.count(children) > 0;
  return (
    <div
      ref={setNodeRef}
      className={`w-40 h-10 py-6 border-2 border-dashed rounded flex items-center justify-center
        ${
          isOver
            ? "border-purple-600 bg-purple-100/30"
            : hasItem
            ? "border-gray-400/30"
            : "border-gray-400"
        }
      `}
    >
      {children || <i className="opacity-30">Buraya bırakın</i>}
    </div>
  );
}
