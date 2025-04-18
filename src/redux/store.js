import { configureStore } from "@reduxjs/toolkit";
import questionReducer from "./questionSlice";
import windowReducer from "./windowSlice";

export const store = configureStore({
  reducer: { question: questionReducer, window: windowReducer },
});
