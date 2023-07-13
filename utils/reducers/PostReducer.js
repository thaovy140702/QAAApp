import { createReducer } from "@reduxjs/toolkit";

export const PostReducer = createReducer(
  {
    posts: [],
    followingPost: [],
    userPost: []
  },
  (builder) => {
    // get all post
    builder
      .addCase("getAllPostRequest", (state) => {
        state.loading = true;
      })
      .addCase("getAllPostSuccess", (state, action) => {
        state.loading = false;
        state.posts = action.payloadPost;
      })
      .addCase("getAllPostFail", (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // like post
    builder
      .addCase("likePostSuccess", (state, action) => {
        state.messageLike = action.payloadLike;
      })
      .addCase("likePostFail", (state, action) => {
        state.error = action.payload;
      });

// add post
    builder
      .addCase("addPostRequest", (state) => {
        state.loading = true;
      })
      .addCase("addPostSuccess", (state, action) => {
        state.loading = false;
        state.messAddPost = action.payloadMessAddPost;
      })
      .addCase("addPostFail", (state, action) => {
        state.loading = false;
        state.error = action.payloadError;
      });

     // Save formData value
     builder
     .addCase("saveFormDataValue", (state, action) => {
       state.formDataValue = action.formDataValueAction
     });

     // get all following post
    builder
    .addCase("getAllFollowingPostRequest", (state) => {
      state.loading = true;
    })
    .addCase("getAllFollowingPostSuccess", (state, action) => {
      state.loading = false;
      state.followingPost = action.payloadFollowingPost;
    })
    .addCase("getAllFollowingPostFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // get all post by userid
    builder
      .addCase("getAllPostByUserRequest", (state) => {
        state.loading = true;
      })
      .addCase("getAllPostByUserSuccess", (state, action) => {
        state.loading = false;
        state.userPost = action.payloadUserPost;
      })
      .addCase("getAllPostByUserFail", (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

  }
);
