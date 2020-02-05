import Login from "./../login/login";
import { Component } from "react";
import decode from "jwt-decode";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refreshToken");
  if (!token || !refreshToken) {
    return false;
  }
  try {
    const { exp } = decode(refreshToken);
    //check token expiry
    if (exp < new Date().getTime / 1000) {
      return false;
    }
  } catch (e) {
    return false;
  }
  return true;
};

const authRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Redirect to={{ pathname: "/adminMain" }} />
      ) : (
        <Redirect to={{ pathname: "/login" }} />
      )
    }
  />
);

/*
export default () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" render={props => <Login {...props} />} />
    </Switch>
  </BrowserRouter>
);
*/
