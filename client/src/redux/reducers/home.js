import {
    GET_CTIES_SUCCESS
} from "../actions/actionTypes"

const initialState = { 
    cities: []
}

function homeReducer (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_CTIES_SUCCESS:
            return {
                cities: payload.cities
            }
    
        default:
            return state
    }


}
export default homeReducer