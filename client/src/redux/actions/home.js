import axios from "axios"
import {
    GET_CTIES_SUCCESS
}  from "./actionTypes"

export const getCities = () => async dispatch =>{
    try {
        const config = {
            headers: {
              "Content-Type": "application/json",
            }
        }
        const res = await axios.get("/api/home", config);

        dispatch({
            type: GET_CTIES_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        
    }

    

}