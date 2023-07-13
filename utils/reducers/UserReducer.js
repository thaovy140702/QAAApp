import { createReducer } from "@reduxjs/toolkit";

export const UserReducer = createReducer(
  {
    user: {},
  },
  (builder) => {
    // get a user
    builder
      .addCase("getUserRequest", (state) => {
        state.loading = true;
      })
      .addCase("getUserSuccess", (state, action) => {
        state.loading = false;
        state.userinfo = action.payloadUser;
      })
      .addCase("getUserFail", (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

  }
);
