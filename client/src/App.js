import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navi from './components/navi/Navi';
import Home from './components/home/Home';
import Routes from './components/routing/Routes';
import React, { useEffect } from 'react';
import setAuthToken from './utils/setAuthToken';
import configureStore from './redux/reducers/configureStore';
import { loadUser } from './redux/actions/auth';
import { LOGOUT } from './redux/actions/actionTypes';

if (localStorage.token) {
  setAuthToken(localStorage.token);

}
const App = () => {
  console.log("%cStop! Whats going on!!", "color: red; font-family: sans-serif; font-size: 4.5em; font-weight: bolder; text-shadow: #000 1px 1px;");

  useEffect(() => {
    configureStore.dispatch(loadUser());
    window.addEventListener('storage', () => {
      if (!localStorage.token) configureStore.dispatch({ type: LOGOUT });
    });
  }, []);
 
  return (
    <div className="App">
      <Router>
        <Navi />
        <Switch>
          <Route exact path={["/","/home"]} component={Home} />
          <Route component={Routes} />
        </Switch>
      </Router>

    </div>
  );
}

export default App;
