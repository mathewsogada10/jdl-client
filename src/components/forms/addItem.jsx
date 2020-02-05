import React, { Component } from "react";
import { baseUrl } from "../utils/util";
import Axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class AddItem extends Component {
  state = { unit_of_measure: "", description: "" };
  submitHandler = async event => {
    event.preventDefault();
    try {
      let json = {
        unit_of_measure: this.state.unit_of_measure,
        description: this.state.description,
        registeredby: localStorage.getItem("username")
      };
      console.log("data sent" + JSON.stringify(json));
      let response = await Axios.post(baseUrl + "api/saveTypes", json);
      let object = response.data;

      if (object.msg === "Saved!") {
        alert("Record saved.");
        this.setState({
          unit_of_measure: "",
          description: ""
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
    var { unit_of_measure, description } = this.state;
    return (
      <div style={{width:"70vh"}}>
        <span
          className="navbar navbar-light bg-dark text-light"
          style={{ color: "gold", float: "right" }}
        >
          Add New Material Type
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
              name="description"
              margin="normal"
              fullWidth
              value={description}
              onChange={this.changeHandler}
              required
            />
          </div>
          <div>
            <TextField
              id="txtUnit"
              label="Unit Of Measurement"
              name="unit_of_measure"
              fullWidth
              margin="normal"
              value={unit_of_measure}
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

export default AddItem;
