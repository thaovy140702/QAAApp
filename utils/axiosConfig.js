import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const instance = axios.create({
  baseURL: "http://192.168.43.227:3000/api",
});

instance.interceptors.request.use(async function (config) {
    // Do something before request is sent

    let values = await AsyncStorage.getItem("persist:root");
    const object = JSON.parse(values);
    const user = JSON.parse(object.auth);
    const accessToken = user["accessToken"];

    config.headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // refresh token
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
