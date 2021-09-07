import { combineReducers } from 'redux';
import auth from './auth';
import alert from "./alert"
import home from "./home"
import halisaha from "./halisaha"
const rootReducer = combineReducers({
  auth,
  alert,
  home,
  halisaha
});

export default rootReducer;
