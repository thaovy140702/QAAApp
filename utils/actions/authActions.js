import axios from "axios";
import { server } from "../../store/store";

export const register = (email, usename, password) => async (dispatch) => {
    try {
        dispatch({
            type: "registerRequest",
        });

        const { data } = await axios.post(
            `${server}/auth/resgister`, 
                {email, usename, password},
             {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });

        dispatch({
            type: "registerSuccess",
            payload: data.mess, data
        });
    
    } catch (error) {
        dispatch({
            type: "registerFail",
            payload: error.response.data.mess
        });

    }
};

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: "loginRequest",
        });

        const { data } = await axios.post(
            `${server}/auth/login`, 
            {
                email,
                password
            }, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            })
        dispatch({
            type: "loginSuccess",
            payload: data.message,
            payloadToken: data.accessToken,
            payloadUser: data.user,
            payloadId: data.id,
            payloadUsername: data.username,
            profilePicture: data.profilePicture
        });
    
    } catch (error) {
        dispatch({
            type: "loginFail",
            payload: error.response.data.mess
        });

    }
};

export const logout = (username, password) => async (dispatch) => {
    try {
        dispatch({
            type: "logoutRequest",
        });

        const { data } = await axios.get(
            `${server}/auth/login`, 
            {
                username,
                password
            }, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });

        dispatch({
            type: "loginSuccess",
            payload: data.message,
            payloadToken: data.accessToken,
        });
    
    } catch (error) {
        dispatch({
            type: "loginFail",
            payload: error.response.data.message
        });

    }
};


