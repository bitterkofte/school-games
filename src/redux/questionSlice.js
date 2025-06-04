import { createSlice, current } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { answerChecker } from "../functions/answerChecker";
import { whoeleQuestions } from "../data/wholeQuestions";

const initialState = {
  value: 0,
  // theQuestion: {},
  questions: whoeleQuestions,
  points: 0,
  currentQuestionNo: 0,
  selectedOptions: [],
  correctness: null,
  showAnswer: false,
  myTests: JSON.parse(localStorage.getItem("MyTests")) || [],
};

export const questionSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    randomizeQuestions: (state) => {
      state.questions = state.questions.sort(() => Math.random() - 0.5);
    },
    questionsHandler: (state, action) => {
      state.questions = action.payload;
    },
    selectedHandler: (state, action) => {
      state.selectedOptions = action.payload;
      state.correctness = answerChecker(
        state.questions[state.currentQuestionNo].type,
        action.payload,
        state.questions[state.currentQuestionNo].answer
      );
    },
    showAnswerHandler: (state, action) => {
      state.showAnswer = action.payload;
    },
    nextQuestionHandler: (state) => {
      state.currentQuestionNo += 1;
      state.correctness = null;
      state.showAnswer = false;
      state.selectedOptions = [];
    },
    resetHandler: (state) => {
      state.correctness = null;
      state.showAnswer = false;
      state.currentQuestionNo = 0;
      state.selectedOptions = [];
      state.points = 0;
      state.questions = initialState.questions;
    },
    pointHandler: (state, action) => {
      state.points += action.payload;
    },
    myTestsHandler: (state, action) => {
      state.myTests = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  questionsHandler,
  nextQuestionHandler,
  showAnswerHandler,
  resetHandler,
  selectedHandler,
  pointHandler,
  randomizeQuestions,
  myTestsHandler,
} = questionSlice.actions;

export default questionSlice.reducer;
