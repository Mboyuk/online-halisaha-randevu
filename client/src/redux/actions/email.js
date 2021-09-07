import axios from 'axios';
import { setAlert } from './alert';

export const verifyEmail = (verifyEmailToken) => async (dispatch) => {
  try {
    await axios.get(
      '/api/auth/verifyEmail?verifyEmailToken=' + verifyEmailToken
    );
  } catch (error) {}
};

export const forgotPassword = (email) => async (dispatch) => {
  try {
    const res = await axios.post('/api/auth/forgot-password', { email });
    dispatch(setAlert(res.data.message, 'success'));
  } catch (error) {}
};

export const resetPassword = (formData, token, history) => async (dispatch) => {
  try {
    await axios.post(
      `/api/auth/reset-password?resetPasswordToken=${token}`,
      formData
    );
    history.push('/auth/login');
  } catch (error) {}
};
