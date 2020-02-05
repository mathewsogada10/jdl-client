import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Select from "react-select";
import { baseUrl } from "../utils/util";
import Axios from "axios";

class IssueItem extends Component {
  state = { projects: [], project: "", quantity: "", price: "", issuedTo: "" };

  loadProjects = async () => {
    try {
      let response = await Axios.get(baseUrl + "api/getProjects");
      console.log(JSON.stringify(response.data));
      this.setState({ projects: response.data });
    } catch (e) {
      console.log("iko shida: " + e);
    }
  };

  renderProjects = () => {
    if (this.state.projects.length === 0) {
      return null;
    }
    return this.state.projects.map(data => ({
      label: data.project_desc,
      value: data.project_id
    }));
  };

  componentDidMount() {
    this.loadProjects();
  }

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = async event => {
    event.preventDefault();
    var { selectedItem } = this.props;
    if (
      this.state.quantity !== "undefined" &&
      new Number(this.state.quantity) > new Number(selectedItem.quantity)
    ) {
      alert(
        "Sorry, Only " +
          selectedItem.quantity +
          " of " +
          selectedItem.description +
          " available!"
      );
    } else {
      try {
        let json = {
          type_id: selectedItem.type_id,
          quantity: new Number(this.state.quantity),
          project_code: this.state.project.value,
          stock_price: new Number(this.state.price),
          stock_issued_to: this.state.issuedTo,
          stock_issued_by: localStorage.getItem("username")
        };
        console.log("data sent" + JSON.stringify(json));
        let response = await Axios.post(baseUrl + "api/saveIssues", json);
        let object = response.data;

        if (object.msg === "Updated!") {
          alert("Item Issued.");
        } else {
          alert(JSON.stringify(object));
        }
      } catch (e) {
        alert(
          "Whoops!! Save request failed!! Could be you lost connection" + e
        );
      }
    }
  };

  handleProjectChange = project => {
    this.setState({ project });
  };

  render() {
    var { selectedItem } = this.props;
    var { project, quantity, price, issuedTo } = this.state;
    if (selectedItem === "undefined" || selectedItem === null) {
      return <div></div>;
    }
    return (
      <div>
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
              value={selectedItem.description}
            />
          </div>
          <div>
            <TextField
              id="txtquantity"
              label="quantity"
              name="quantity"
              type="number"
              fullWidth
              margin="normal"
              onChange={this.changeHandler}
              value={quantity}
              required
            />
          </div>
          <div>
            <TextField
              id="txtPrice"
              label="price"
              name="price"
              type="number"
              fullWidth
              margin="normal"
              onChange={this.changeHandler}
              value={price}
              required
            />
          </div>
          <div>
            <Select
              label="Project"
              name="project"
              value={project}
              onChange={this.handleProjectChange}
              placeholder="Select project"
              options={this.renderProjects()}
              required
            />
          </div>

          <div>
            <TextField
              id="txtIsuedTo"
              label="Issued to"
              name="issuedTo"
              fullWidth
              margin="normal"
              onChange={this.changeHandler}
              value={issuedTo}
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

export default IssueItem;
