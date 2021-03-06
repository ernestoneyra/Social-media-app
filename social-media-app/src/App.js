import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Sign-up";
import Profile from './pages/Profile'
import NotFound from "./pages/NotFound";
import ResetPassword from "./pages/ResetPassword";
//import Dashboard from "./pages/Dashboard";
import UpdateProfile from "./pages/UpdateProfile";
import PrivateRoute from "./constants/PrivateRoute";
import * as ROUTES from "./constants/routes";
import { AuthProvider } from "./context/AuthContext";
import "./styles/global.css";
import Dashboard2 from "./pages/Dasboard2";
import useAuthListener from "./hooks/use-auth-listener";
import UserContext from './context/User';
import CreatePost from "./components/Post/CreatePost";

if (module.hot) {
  module.hot.accept();
}

function App() {

  const {user} = useAuthListener();

  return (
    <>
    <UserContext.Provider value={{user}}>
      <AuthProvider>
        
          <Router>
            <AuthProvider>
              <Switch>
                <PrivateRoute
                  exact
                  path={ROUTES.DASHBOARD}
                  component={Dashboard2}
                />
                
                  <Route path={ROUTES.LOGIN} component={Login} />
                  <Route path={ROUTES.SIGN_UP} component={Signup} />
                  <Route path={ROUTES.NOT_FOUND} component={NotFound} />
                  <Route
                    path={ROUTES.RESET_PASSWORD}
                    component={ResetPassword}
                  />
                  <Route path={ROUTES.CREATE_POST} component={CreatePost} />
                 
                  <Route path={ROUTES.PROFILE} component={Profile} />
                  <Route
                    path={ROUTES.UPDATE_PROFILE}
                    component={UpdateProfile}
                  />
             
              </Switch>
            </AuthProvider>

            {/*        </FirebaseContext.Provider> */}
          </Router>
       
      </AuthProvider>
      </UserContext.Provider>
    </>
  );
}

export default App;
/* className="d-flex align-items-center justify-content-center"
style={{ minHeight: "100vh" }}
<div className="w-100" style={{ maxWidth: "400px" }}></div> */
