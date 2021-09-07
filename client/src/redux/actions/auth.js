import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_PHOTO_SUCCESS,
  GET_PRETRANSACTIONS,
} from './actionTypes';
import axios from 'axios';
import { setAlert } from './alert';
import api from '../../utils/api';
import setAuthToken from '../../utils/setAuthToken';
import { loadHalisaha, deleteHalisahalar } from './halisaha';

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const url = '/api/auth/get-user';
    const res = await axios.get(url, config);
    if (res.data.data.role === 'manager') {
      dispatch(loadHalisaha());
    }
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};
//loadHalisaha yap

export const register = (formData, history) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify(formData);
  try {
    const url = '/api/auth/register';
    const res = await axios.post(url, body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    history.push('/auth/login');
    // dispatch(loadUser());
  } catch (error) {
    dispatch(setAlert(error.response.data.message, 'danger'));
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

export const login = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify(formData);
  try {
    const url = '/api/auth/login';
    const res = await api.post(url, body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (error) {
    dispatch(setAlert(error.response.data.message, 'danger'));

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};
export const editProfile = (formData) => async (dispatch) => {
  try {
    const res = await axios.post('/api/auth/edit-profile', formData);

    dispatch({
      type: EDIT_PROFILE_SUCCESS,
      payload: res.data,
    });
    // dispatch(loadUser())
  } catch (error) {
    dispatch(setAlert(error.response.data.message, 'danger'));
  }
};
export const editProfilePhoto =
  (profile_image, history) => async (dispatch) => {
    try {
      const res = await axios.post('/api/auth/edit-photo', profile_image);
      dispatch({
        type: EDIT_PROFILE_PHOTO_SUCCESS,
        payload: res.data,
      });
      // history.push("/auth/edit-profile")
    } catch (error) {
      dispatch(setAlert(error.response.data.message, 'danger'));
    }
  };
export const changePassword = (formData) => async (dispatch) => {
  try {
    const res = await axios.post('/api/auth/change-password', formData);

    if (res.data.success) {
      dispatch(setAlert(res.data.message, 'success'));
    }
  } catch (error) {
    dispatch(setAlert(error.response.data.message, 'danger'));
  }
};

export const logout = () => async (dispatch) => {
  try {
    await api.post('/api/auth/logout');
    dispatch(deleteHalisahalar());
    dispatch({
      type: LOGOUT,
    });
  } catch (error) {}
};

export const setPreTransaction =
  (halisahaId, date, time) => async (dispatch) => {
    try {
      const body = { halisahaId, date, time };
      await axios.post('/api/auth/pre-transactions', body);
    } catch (error) {}
  };
export const getPreTransaction = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/auth/pre-transactions');
    dispatch({
      type: GET_PRETRANSACTIONS,
      payload: res.data,
    });
  } catch {}
};
export const setCommentAndPoint =
  (comment, point, currentPreTrans) => async (dispatch) => {
    try {
      const body = { comment, point, currentPreTrans };
      await axios.post('/api/auth/comment-point', body);
    } catch (error) {}
  };
