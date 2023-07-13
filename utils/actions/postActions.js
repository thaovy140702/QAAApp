import axios from "axios";
import { server } from "../../store/store";
import axiosConfig from '../axiosConfig'

// get all posts
export const getAllPosts = () => async (dispatch) => {
    
    try {
        dispatch({
            type: "getAllPostRequest",
        });
    
        const {data} = await axiosConfig({
            method: 'GET',
            url: '/posts/getallposts',
        }) 

        dispatch({
            type: "getAllPostSuccess",
            payloadPost: data.blogs,
        });
    
    } catch (error) {
        dispatch({
            type: "getAllPostFail",
            payload: error.response.data.message
        });

    }
};

// like post
export const likePost = (id, userId) => async (dispatch) => {
    try {
    
      const { data } = await axiosConfig({
        method: "PUT",
        url: `/posts/like/${id}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          userId: userId
        },
      });

      dispatch({
        type: "likePostSuccess",
        payloadLike: data.message,
      });
    } catch (error) {
      dispatch({
        type: "likePostFail",
        payload: error.response.data.message,
      });
    }
  };

// add Post
export const addPost = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: "addPostRequest",
    });
    const { data } = await axiosConfig({
      method: "POST",
      url: '/posts/addpost',
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: {
        formData
      }
    });

    dispatch({
      type: "addPostSuccess",
      payloadMessAddPost: data.message,
    });
  } catch (error) {
    dispatch({
      type: "addPostFail",
      payloadError: error.response.data.message,
    });
  }
};

// save value
export const saveFormValue = (form) => async (dispatch) => {
  try {
    dispatch({
      type: "saveFormDataValue",
      formDataValueAction: form,
    });
  } catch (error) {
    
  }
};

// get following post
export const getAllFollowingPosts = (userId) => async (dispatch) => {
    
  try {
      dispatch({
          type: "getAllFollowingPostRequest",
      });
  
      const {data} = await axiosConfig({
          method: 'GET',
          url: 'posts/getpostbyfollow',
          headers: {
            "Content-Type": "multipart/form-data",
          },
          data: {
            userId: userId
          }
      }) 

      dispatch({
          type: "getAllFollowingPostSuccess",
          payloadFollowingPost: data,
      });
  
  } catch (error) {
      dispatch({
          type: "getAllFollowingPostFail",
          payload: error.response.data.message
      });

  }
};


// get all posts
export const getAllPostByUserId = (id) => async (dispatch) => {
    
  try {
      dispatch({
          type: "getAllPostByUserRequest",
      });
  
      const {data} = await axiosConfig({
          method: 'GET',
          url: `/posts/getbyuserid/${id}`,
      }) 

      dispatch({
          type: "getAllPostByUserSuccess",
          payloadUserPost: data.blogs,
      });
  
  } catch (error) {
      dispatch({
          type: "getAllPostByUserFail",
          payload: error.response.data.message
      });

  }
};

