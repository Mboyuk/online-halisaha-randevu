import axios from "axios"
import {
    GET_HALISAHA_SUCCESS,
    CHANGE_HALISAHA,
    REMOVE_CURRENT_HALISAHA,
    REMOVE_HALISAHALAR,
    REGISTER_HALISAHA_SUCCESS,
    HALISAHA_LOADED,
    DELETE_HALISAHA,
    GET_HALISAHA_REZERVATION_INFO_SUCCESS,
    SET_HALISAHA_IMAGE_UPLOAD_SUCCESSFULL,
    DELETE_HALISAHA_IMAGE_SUCCESSFULL,
    EDIT_HALISAHA_PROPERTIES_SUCCESSFULL,
    GET_HALISAHA_REZERVATION_INFO_USER_SUCCESS,
    HALISAHA_REZERVATION_SUCCESS
} from "./actionTypes"

export const loadHalisaha = () => async dispatch => {
    try {
        const res = await axios.get("/api/halisaha/get-halisaha/control");
        dispatch({
            type: HALISAHA_LOADED,
            payload: res.data.data
        })
    } catch (error) {
        
    }
}
export const deleteHalisahalar = () => async dispatch => {
    try {
        dispatch({
            type: DELETE_HALISAHA
        })
        
    } catch (error) {
        
    }
}

export const registerHalisahaRequest = (content, history) => async dispatch => {
    try {
        const res = await axios.post("/api/halisaha/register/request", {content})
        console.log(res.data)
        history.push("/home")
    } catch (error) {
        
    }
}
export const getHalisaha = (city) => async dispatch =>{
    try {
        const res = await axios.get(`/api/halisaha/${city}`)
        dispatch({
            type: GET_HALISAHA_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        console.log("get halisaha hata çıktı")        
    }
}

export const changeHalisaha = (currentHalisaha) => async dispatch => {
    try {
        dispatch({
            type: CHANGE_HALISAHA,
            payload: currentHalisaha
            
        })
    } catch (error) {
        
    }
}
export const removeHalisahalar = () => async dispatch => {
    try {
        dispatch({
            type: REMOVE_HALISAHALAR,
        })
    } catch (error) {
        
    }
}

export const removeCurrentHalisaha = () => async dispatch => {
    try {
        dispatch({
            type: REMOVE_CURRENT_HALISAHA,
        })
    } catch (error) {
        
    }
}
export const registerHalisaha = (formData, history) => async dispatch => {
    try {
        const res = await axios.post("/api/halisaha/register/control", formData)
        console.log(res.data)
        dispatch({
            type: REGISTER_HALISAHA_SUCCESS,
            payload: res.data.data
        })
        const id = res.data.data.userId;
        history.push(`/halisaha/${id}/edit-halisaha`);
    } catch (error) {
        
    }
}
export const getHalisahaRezervationInfoForManager = (userId) => async dispatch => {
    try {
        const res = await axios.get(`/api/halisaha/${userId}/edit-halisaha`);
        dispatch({
            type: GET_HALISAHA_REZERVATION_INFO_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        
    }
}
export const setHalisahaImageUpload = (images) => async dispatch => {
    try {
        const res = await axios.post("/api/halisaha/upload/image-upload", images);
        dispatch({
            type: SET_HALISAHA_IMAGE_UPLOAD_SUCCESSFULL,
            payload: res.data.data
        })
    } catch (error) {
        
    }
}
export const deleteHalisahaImageAction = (imageName) => async dispatch => {
    try {
        const obj = {
            imageName: imageName
        }
        const res = await axios.post("/api/halisaha/delete/image-delete", obj)
        console.log(res.data.data)
        dispatch({
            type: DELETE_HALISAHA_IMAGE_SUCCESSFULL,
            payload: res.data.data
        })
    } catch (error) {
        
    }
}

export const editHalisahaProperties = (id, price, halisahaMessage, halisahaProperties) => async dispatch => {
    try {

        const body = { price, halisahaMessage, halisahaProperties}
        const res = await axios.post(`/api/halisaha/${id}/edit-halisaha`, body);
        dispatch({
            type: EDIT_HALISAHA_PROPERTIES_SUCCESSFULL,
            payload: res.data.data
        })
        dispatch(getHalisahaRezervationInfoForManager(id))
    } catch (error) {
        
    }
}
export const getHalisahaRezervationInfoForUser = (city, id, slug) => async dispatch => {
    try {
        const res = await axios.get(`/api/halisaha/${city}/${id}/${slug}`)
        dispatch({
            type: GET_HALISAHA_REZERVATION_INFO_USER_SUCCESS,
            payload: res.data,
        })
    } catch (error) {
        
    }
}

export const makeRezervation = (city, id, slug, date, time, history) => async dispatch => {
    try {
        await axios.post(`/api/halisaha/${city}/${id}/${slug}/${date}/${time}/reservation`);
        dispatch({
            type: HALISAHA_REZERVATION_SUCCESS,       
        })
        history.push(`/halisaha/${city}/${id}/${slug}`)
    } catch (error) {
        
    }
}
export const setPrice = ( rezervationDate, rezervationTime, price ) => async dispatch => {
    try {
        const body = {  rezervationDate, rezervationTime, price }
        const res = await axios.post("/api/halisaha/add-price/control", body)
        console.log(res.data)
        dispatch(getHalisahaRezervationInfoForManager())
    } catch (error) {
        
    }
}