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
    GET_HALISAHA_REZERVATION_INFO_USER_SUCCESS
} from "../actions/actionTypes"

const initialState = {
    halisahalar: [],
    currentHalisaha: {},
    currentUserHalisaha: {},
    userRezervationTable : [],
    rezervationTable: [],
    currentComment: [],
    loadingMiniTable: true,
    loadingBigTable: true
}
function halisahaReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case HALISAHA_LOADED:
            return {
                ...state,
                currentUserHalisaha: payload
            }
        case GET_HALISAHA_SUCCESS:
            return {
                ...state,
                halisahalar: payload.data,
                loadingMiniTable: false
            }
        case CHANGE_HALISAHA:
            return {
                ...state,
                currentHalisaha: payload
            }
        case EDIT_HALISAHA_PROPERTIES_SUCCESSFULL:    
        case DELETE_HALISAHA_IMAGE_SUCCESSFULL:    
        case SET_HALISAHA_IMAGE_UPLOAD_SUCCESSFULL:    
        case REGISTER_HALISAHA_SUCCESS:
            return {
                ...state,
                currentUserHalisaha: payload
            } 
        case GET_HALISAHA_REZERVATION_INFO_USER_SUCCESS: 
            return {
                ...state,
                rezervationTable: payload.data,
                currentHalisaha: payload.data2,
                currentComment: payload.halisahaComInfo,
                loadingBigTable: false
            }      
        case GET_HALISAHA_REZERVATION_INFO_SUCCESS:
            return {
                ...state,
                userRezervationTable: payload.rezervationArray
            }     
        case REMOVE_CURRENT_HALISAHA:
            return {
                ...state,
                currentHalisaha:{}
            } 
        case DELETE_HALISAHA:
            return {
                halisahalar: [],
                currentHalisaha: {},
                currentUserHalisaha: {}
            }       
        case REMOVE_HALISAHALAR:
            return {
                ...state,
                halisahalar: []
            }
        default:
            return state;
    }
}

export default halisahaReducer