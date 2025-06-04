import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
  window: "main-menu",
  isModalOpen: false,
};

export const questionSlice = createSlice({
  name: "window",
  initialState,
  reducers: {
    windowSelector: (state, action) => {
      state.window = action.payload;
    },
    modalHandler: (state, action) => {
      state.isModalOpen = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { windowSelector, modalHandler } = questionSlice.actions;

export default questionSlice.reducer;
