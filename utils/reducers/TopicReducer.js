import { createReducer } from "@reduxjs/toolkit";

export const TopicReducer = createReducer(
  {
    topic: [],
  },
  (builder) => {
    // slide
    builder
      .addCase("getTopicRequest", (state) => {
        state.loading = true;
      })
      .addCase("getTopicSuccess", (state, action) => {
        state.loading = false;
        state.topic = action.payloadTopic;
      })
      .addCase("getTopicFail", (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

  }
);
