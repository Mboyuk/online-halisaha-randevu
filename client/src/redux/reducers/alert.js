import { SET_ALERT, REMOVE_ALERT } from "../actions/actionTypes";

const initialState = {
    msg: null,
    alertType: null,
    id: null
}


function alertReducer (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_ALERT:
            return {
                msg:payload.msg,
                alertType: payload.alertType,
                id: payload.id
            }

        case REMOVE_ALERT:
            return {
                msg: null,
                alertType: null,
                id: null
            }    
    
        default:
            return state
    }
}

export default alertReducer