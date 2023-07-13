import axios from "axios";
import { server } from "../../store/store";
import axiosConfig from "../axiosConfig";

// load topic
export const getAllTopic = () => async (dispatch) => {
  try {
    dispatch({
      type: "getTopicRequest",
    });

    const { data } = await axiosConfig({
      method: "GET",
      url: "/topic/getalltopic",
    });

    dispatch({
      type: "getTopicSuccess",
      payloadTopic: data.topics,
    });
  } catch (error) {
    dispatch({
      type: "getTopicFail",
      payload: error.response.data.message,
    });
  }
};