import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Select from "react-select";
import { baseUrl } from "../utils/util";
import Axios from "axios";

class RecordStockForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stock_quantity: "",
      stock_price: "",
      stock_type: "",
      stock_supplier: "",
      itemTypes: []
    };
  }

  loadItemType = async () => {
    try {
      let response = await Axios.get(baseUrl + "api/getItemsSummary");
      console.log(JSON.stringify(response.data));
      this.setState({ itemTypes: response.data });
    } catch (e) {
      console.log("iko shida: " + e);
    }
  };

  renderTypes = () => {
    if (this.state.itemTypes.length === 0) {
      return null;
    }
    return this.state.itemTypes.map(data => ({
      label: data.description + " (" + data.unit_of_measure + ")",
      value: data.type_id
    }));
  };

  componentDidMount() {
    this.loadItemType();
  }

  submitHandler = async event => {
    event.preventDefault();
    try {
      let json = {
        stock_quantity: this.state.stock_quantity,
        stock_price: this.state.stock_price,
        stock_type: this.state.stock_type.value,
        stock_supplier: this.state.stock_supplier,
        stock_received_by: localStorage.getItem("username")
      };
      let response = await Axios.post(baseUrl + "api/saveReceived", json);
      let object = response.data;
      console.log("data sent" + JSON.stringify(json));
      if (object.msg === "Saved!") {
        alert("Record saved.");
        this.setState({
          stock_desc: "",
          stock_price: "",
          stock_quantity: "",
          stock_supplier: "",
          stock_type: ""
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

  handleTypeChange = stock_type => {
    this.setState({ stock_type });
  };

  render() {
    var {
      stock_supplier,
      stock_price,
      stock_quantity,
      stock_type
    } = this.state;
    return (
      <div style={{width:"70vh"}}>
        <span
          className="navbar navbar-light bg-dark text-light"
          style={{ color: "gold", float: "right" }}
        >
          Add New Material Received
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
            <Select
              label="Type"
              name="stock_type"
              value={stock_type}
              onChange={this.handleTypeChange}
              placeholder="Select type"
              options={this.renderTypes()}
              required
            />
          </div>
          <div>
            <TextField
              id="txtSupplier"
              label="Supplier"
              name="stock_supplier"
              fullWidth
              margin="normal"
              value={stock_supplier}
              onChange={this.changeHandler}
              required
            />
          </div>
          <div>
            <TextField
              id="txtStockPrice"
              label="Price"
              name="stock_price"
              margin="normal"
              type="number"
              fullWidth
              value={stock_price}
              onChange={this.changeHandler}
              required
            />
          </div>
          <div>
            <TextField
              id="txtQuantity"
              label="Quantity"
              name="stock_quantity"
              margin="normal"
              type="number"
              fullWidth
              value={stock_quantity}
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

export default RecordStockForm;
