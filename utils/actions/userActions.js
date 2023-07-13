import axios from "axios";
import { server } from "../../store/store";
import axiosConfig from '../axiosConfig'


export const getUser = (id) => async (dispatch) => {
    
    try {
        dispatch({
            type: "getUserRequest",
        });
    
        const {data} = await axiosConfig({
            method: 'GET',
            url: `/users/getuser/${id}`,
        }) 

        dispatch({
            type: "getUserSuccess",
            payloadUser: data,
        });
    
    } catch (error) {
        dispatch({
            type: "getUserFail",
            payload: error.response.data.message
        });

    }
};
