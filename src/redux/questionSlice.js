import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
  // theQuestion: {},
  questions: [
    {
      type: "turkiye-province",
      text: "Çanakkale ilimiz hangisidir?",
      correctAnswers: "Çanakkale",
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
      correctAnswers: ["a", "c"],
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
      correctOrder: ["2", "4", "1", "3"], // IDs in correct sequence
    },
    {
      type: "single-choice",
      text: "Türkiye'nin başkenti neresidir?",
      options: [
        { id: "a", text: "İstanbul" },
        { id: "b", text: "Ankara" },
        { id: "c", text: "İzmir" },
        { id: "d", text: "Bursa" },
      ],
      correctAnswer: "b",
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
      correctAnswer: "c",
    },
    {
      type: "true-false",
      text: "Dünya yuvarlaktır.",
      correctAnswer: "True", // Correct answer for the True/False question
    },
  ],
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
    },
    isCorrectHandler: (state, action) => {
      state.correctness = action.payload;
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
} = questionSlice.actions;

export default questionSlice.reducer;
