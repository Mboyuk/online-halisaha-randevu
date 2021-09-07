import {applyMiddleware, createStore} from "redux"
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from "./index"
import thunk from "redux-thunk"
import setAuthToken from "../../utils/setAuthToken";


// const configureStore = () => {
//     return createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
// }
const middleware = [thunk];
const initialState = {};
const configureStore = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

let currentState = configureStore.getState();

configureStore.subscribe(() => {
  // keep track of the previous and current state to compare changes
  let previousState = currentState;
  currentState = configureStore.getState();
  // if the token changes set the value in localStorage and axios headers
  if (previousState.auth.token !== currentState.auth.token) {
    const token = currentState.auth.token;
    setAuthToken(token);
  }
});

export default configureStore