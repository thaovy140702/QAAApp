import { createReducer } from "@reduxjs/toolkit";

export const AuthReducer = createReducer({
  user: {}
}, (builder) => {
  // sign in
  builder.addCase("loginRequest", (state) => {
    state.loading = true;
  });
  builder.addCase("loginSuccess", (state, action) => {
    state.loading = false;
    state.isAuthenticated = true;
    state.message = action.payload;
    state.accessToken = action.payloadToken;
    state.user = action.payloadUser;
    state.id = action.payloadId
    state.username = action.payloadUsername
    state.profilePicture = action.profilePicture
  });
  builder.addCase("loginFail", (state, action) => {
    state.loading = false;
    state.isAuthenticated = false;
    state.error = action.payload;
  });

  // sign up
  builder.addCase("registerSuccess", (state, action) => {
    state.loading = false;
    state.isAuthenticated = true;
    state.message = action.payload;
    state.accessToken = action.payloadToken;
  });
  builder.addCase("registerRequest", (state) => {
    state.loading = true;
  });
  builder.addCase("registerFail", (state, action) => {
    state.loading = false;
    state.isAuthenticated = false;
    state.error = action.payload;
  });

  // clear toast message

  builder.addCase("clearError", (state) => {
    state.error = null;
  });
  builder.addCase("clearMessage", (state) => {
    state.message = null;
  });

  builder
    .addCase("getResetPasswordRequest", (state) => {
      state.loading = true;
    })
    .addCase("getResetPasswordSuccess", (state, action) => {
      state.loading = false;
      state.messageResetPass = action.payloadMessage;
      state.accessToken = action.accessOtpToken;
    })
    .addCase("getResetPasswordFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
});
