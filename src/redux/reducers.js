import { createReducer } from "@reduxjs/toolkit";

export const cartReducer = createReducer(
  {
    login: false,
  },
  {
    makelogin: (state) => {
      state.login = true;
    },
    makesignout: (state) => {
      state.login = false;
    },
  }
);
