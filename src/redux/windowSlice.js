import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
  window: "main-menu",
  isModalOpen: false,
  modalText: "",
  modalTitle: "",
  modalAction: "",
};

export const questionSlice = createSlice({
  name: "window",
  initialState,
  reducers: {
    windowSelector: (state, action) => {
      state.window = action.payload;
    },
    openModal: (state, action) => {
      state.isModalOpen = true;
      if (action.payload) {
        state.modalText = action.payload.text;
        state.modalTitle = action.payload.title;
        state.modalAction = action.payload.aciton;
      }
    },
    closeModal: (state) => {
      state.isModalOpen = false;
    },
    resetModal: (state) => {
      state.isModalOpen = false;
      state.modalText = "";
      state.modalTitle = "";
      state.modalAction = "";
    },
  },
});

export const { windowSelector, openModal, closeModal, resetModal } =
  questionSlice.actions;
export default questionSlice.reducer;
