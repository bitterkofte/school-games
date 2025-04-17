import { createSlice, current } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { answerChecker } from "../functions/answerChecker";

const initialState = {
  value: 0,
  // theQuestion: {},
  questions: [
    {
      type: "single-choice",
      text: "Türkiye'nin başkenti neresidir?",
      options: [
        { id: "a", text: "İstanbul" },
        { id: "b", text: "Ankara" },
        { id: "c", text: "İzmir" },
        { id: "d", text: "Bursa" },
      ],
      answer: "b",
    },
    {
      type: "turkiye-province",
      text: "Çanakkale ilimiz hangisidir?",
      answer: "Çanakkale",
    },
    {
      type: "multiple-choice",
      text: "Aşağıdaki ülkelerden hangileri Avrupa kıtasında yer alır?",
      options: [
        { id: "a", text: "Fransa" },
        { id: "b", text: "Brezilya" },
        { id: "c", text: "Almanya" },
        { id: "d", text: "Japonya" },
      ],
      answer: ["a", "c"],
    },
    {
      type: "sorting",
      text: "Aşağıda verilen sayıları küçükten büyüğe sıralayın.",
      options: [
        { id: "1", text: "Üç" },
        { id: "2", text: "Bir" },
        { id: "3", text: "Dört" },
        { id: "4", text: "İki" },
      ],
      answer: ["2", "4", "1", "3"], // IDs in correct sequence
    },
    {
      type: "single-choice",
      text: "Hangi gezegen Güneş Sistemi'nde en büyük gezegendir?",
      options: [
        { id: "a", text: "Mars" },
        { id: "b", text: "Venüs" },
        { id: "c", text: "Jüpiter" },
        { id: "d", text: "Satürn" },
      ],
      answer: "c",
    },
    {
      type: "true-false",
      text: "Dünya yuvarlaktır.",
      answer: "True", // Correct answer for the True/False question
    },
  ],
  points: 0,
  currentQuestionNo: 0,
  selectedOptions: [],
  correctness: null,
  showAnswer: false,
};

export const questionSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    selectedHandler: (state, action) => {
      state.selectedOptions = action.payload;
      state.correctness = answerChecker(
        state.questions[state.currentQuestionNo].type,
        action.payload,
        state.questions[state.currentQuestionNo].answer
      );
      // if (
      //   state.selectedOptions[0] ===
      //   state.questions[state.currentQuestionNo].correctAnswers
      // )
      //   state.correctness = true;
    },
    isCorrectHandler: (state, action) => {
      // state.correctness = action.payload;
      // if (action.payload) toast.success("Doğru cevap!");
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
    },
    pointHandler: (state, action) => {
      state.points += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  increment,
  decrement,
  incrementByAmount,
  nextQuestionHandler,
  isCorrectHandler,
  showAnswerHandler,
  resetHandler,
  selectedHandler,
  pointHandler,
} = questionSlice.actions;

export default questionSlice.reducer;
