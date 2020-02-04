import React from "react";
import "./App.css";
import { Route, Switch, withRouter } from "react-router-dom";
import Login from "./components/login/login";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  return (
    <div className="App">
      <div
        className="p-3 mb-2"
        style={{ height: "100vh", background: "#123456" }}
      >
        <div>

          <Switch>
            <Route exact path="/" component={withRouter(Login)} />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;
