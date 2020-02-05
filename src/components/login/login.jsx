import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Axios from "axios";
import { baseUrl } from "../utils/util";
import { Route, BrowserRouter } from "react-router-dom";
import Main from "../main/main";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      userPassword: "",
      auth: false,
      sessionMsg: "",
      errorMesg: "",
      user: null,
      client: null
    };
  }
  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = async e => {
    e.preventDefault();
    await Axios.post(baseUrl + "api/getUser", this.state)
      .then(response => {
        this.setState({ client: response.data });
      })
      .then(() => new Promise(resolve => setTimeout(resolve, 1000)))
      .catch(error => {
        this.setState({
          errorMesg: "Either Username or password is not correct!!",
          sessionMsg: ""
        });
        console.log(error);
      });
    this.setState({ auth: true });
  };

  isAuthenticated = () => {
    var { client } = this.state;
    if (client === "undefined" || client === null) {
      return false;
    } else {
      localStorage.setItem("username", client.user_name);
      return true;
    }
  };

  render() {
    var { userId, userPassword, sessionMsg, errorMesg } = this.state;
    var isAlreadyAuthenticated = this.isAuthenticated();
    return (
      <BrowserRouter >
        {isAlreadyAuthenticated ? (
          <Route exact path="/" render={props => <Main />} />
        ) : (
          <div className="card-body"
            style={{
              height: "100vh",
              width: "70vh",
              margin: "0 auto",

            }}
          >
            <form
              className="form"
              noValidate
              autoComplete="off"
              style={{
                backgroundColor: "white"
              }}
              onSubmit={this.submitHandler}
            >
              <span>{sessionMsg}</span>
              <br />
              <span style={{ fontSize: 32 }}>JDL Stores Login</span>
              <div style={{ color: "red" }}>{errorMesg}</div>
              <div>
                <TextField
                  id="txtusername"
                  label="Username"
                  name="userId"
                  margin="normal"
                  value={userId}
                  onChange={this.changeHandler}
                />
              </div>
              <div>
                <TextField
                  id="txtpassword"
                  type="password"
                  label="Password"
                  name="userPassword"
                  margin="normal"
                  value={userPassword}
                  onChange={this.changeHandler}
                />
              </div>

              <br />
              <div>
                <Button variant="outlined" color="primary" type="submit">
                  Signin
                </Button>
              </div>
              <br />
            </form>
          </div>
        )}
      </BrowserRouter>
    );
  }
}

export default Login;
