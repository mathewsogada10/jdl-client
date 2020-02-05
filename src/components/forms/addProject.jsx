import React, { Component } from "react";
import { baseUrl } from "../utils/util";
import Axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class AddProject extends Component {
  state = { project_desc: "", project_location: "" };
  submitHandler = async event => {
    event.preventDefault();
    try {
      let json = {
        project_location: this.state.project_location,
        project_desc: this.state.project_desc,
        registeredby: localStorage.getItem("username")
      };
      console.log("data sent" + JSON.stringify(json));
      let response = await Axios.post(baseUrl + "api/saveProjects", json);
      let object = response.data;

      if (object.msg === "Saved!") {
        alert("Record saved.");
        this.setState({
          project_desc: "",
          project_location: ""
        });
      } else {
        alert(JSON.stringify(object));
      }
    } catch (e) {
      alert("Whoops!! Save request failed!! Could be you lost connection" + e);
    }
  };

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    var { project_desc, project_location } = this.state;
    return (
      <div style={{width:"70vh"}}>
        <span
          className="navbar navbar-light bg-dark text-light"
          style={{ color: "gold", float: "right" }}
        >
          Add New Project
        </span>
        <form
          className="form"
          noValidate
          autoComplete="on"
          style={{ backgroundColor: "white" }}
          onSubmit={e => {
            this.submitHandler(e);
          }}
        >
          <div>
            <TextField
              id="txtDesc"
              label="Description"
              name="project_desc"
              margin="normal"
              fullWidth
              value={project_desc}
              onChange={this.changeHandler}
              required
            />
          </div>
          <div>
            <TextField
              id="txtUnit"
              label="Location"
              name="project_location"
              fullWidth
              margin="normal"
              value={project_location}
              onChange={this.changeHandler}
              required
            />
          </div>
          <br />
          <div>
            <Button variant="outlined" color="primary" type="submit">
              Save
            </Button>
          </div>
          <br />
        </form>
      </div>
    );
  }
}

export default AddProject;
