import React from "react";
//import SignIn from "./components/SignIn/SignIn";
import BSSignin from './BS Signin/BSSignin'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import RegisterAccount from "./components/RegisterAccount/RegisterAccount";
import BSSignup from './BSSIgnup/BSSignup'

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            <BSSignin />
          </Route>
          <Route path="/registeraccount">
            <BSSignup />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;