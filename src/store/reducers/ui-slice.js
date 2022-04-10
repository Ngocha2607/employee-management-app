import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartIsVisiable: false,
  loginIsShow: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggle: (state) => {
      state.cartIsVisiable = !state.cartIsVisiable;
    },
    isShowLogin: (state) => {
      state.loginIsShow = !state.loginIsShow;
    },
  },
});

export const { toggle, isShowLogin } = uiSlice.actions;

export default uiSlice.reducer;
