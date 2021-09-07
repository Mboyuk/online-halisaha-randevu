import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  AUTH_ERROR,
  USER_LOADED,
  LOGOUT,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_PHOTO_SUCCESS,
  GET_PRETRANSACTIONS
} from '../actions/actionTypes';

const initialState = {    
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  success: null,
  data: null,
  user: null,
  loading: true,
  message: null,
  isUser: null,
  isManager: null,
  preTransactionsRdcr: []

};

function authReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
        return {
            ...state,
            isAuthenticated: true,
            loading: false,
            user: payload.data,
            isUser: payload.data.role === "user" ? true : false,
            isManager: payload.data.role === "manager" ? true : false
        }  
    case LOGIN_SUCCESS:
      localStorage.setItem("token",payload.access_token)
      return {
        ...state,
        token: payload.access_token,
        isAuthenticated: true,
        loading: false
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated: false,
        loading: false
      };
    case EDIT_PROFILE_PHOTO_SUCCESS:  
    case EDIT_PROFILE_SUCCESS:
      return {
        ...state,
        user: payload.data
            
      }
    case GET_PRETRANSACTIONS:
      return {
        ...state,
        preTransactionsRdcr: payload.data
      }
    case LOGIN_FAIL:
      localStorage.removeItem("token")
      return {
        isAuthenticated: false,
        success: false,
        data: null,
        user: null,
      };
    case AUTH_ERROR:
    case LOGOUT:  
        localStorage.removeItem("token")
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    default:
      return state;
  }
}

export default authReducer;
