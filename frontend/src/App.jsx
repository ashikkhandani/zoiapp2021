import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Home from "./components/Home";
import About from "./components/About";
import LoginForm from "./components/LoginForm";
import RegsDoctorForm from "./components/DoctorRegForm";
import RegsPatientForm from "./components/PatientRegForm";
import {
  BrowserRouter as Router,
  Switch,
  Link,
  NavLink,
  Redirect,
  Route,
} from "react-router-dom";

const App = () => {
  // save token in localStorage for login
  const [token, setToken] = useState("false");
  useEffect(() => {
    const user = localStorage.getItem("currentToken");
    if (user) {
      setToken(true);
    }
  }, []);

  // logout and remove token
  const logout = () => {
    localStorage.removeItem("currentToken");
    window.location.href = "/user/login";
  };

  return (
    <Router>
      <div className="container">
        {/* *******for dinamic contain******** */}

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route exact path="/zoeteam" component={About}>
            <About />
          </Route>

          <Route path="/user/registration/doctor">
            <RegsDoctorForm />
          </Route>
          <Route path="/user/registration/patient">
            <RegsPatientForm />
          </Route>
          <Route path="/user/login">
            <LoginForm />
          </Route>

          {/*  <Route exact path = '/nosotros/:id'>

          </Route> 
          
          <Route exact path = '/patient'>
            <Patient />
          </Route>*/}
        </Switch>
      </div>
    </Router>
  );
};

export default App;
