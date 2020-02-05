import React, { Component } from "react";
import { MDBDataTable } from "mdbreact";
import "./readingView.css";
import IsueItem from "../forms/issueItem";
import { Link } from "react-router-dom";
import { baseUrl } from "../utils/util";
import Axios from "axios";

class ItemsIssuable extends Component {
  state = { listOfItems: [], selectedItem: null };

  InitializeIssueItem = item => {
    if (item.quantity > 0) {
      return (
        <Link
          to=""
          className="myLinkColor"
          data-toggle="modal"
          data-target="#issueItem"
          onClick={() => this.renderModal(item)}
        >
          {" "}
          Issue
        </Link>
      );
    } else {
      return "No Item to issue";
    }
  };

  loadItems = async () => {
    try {
      let response = await Axios.get(baseUrl + "api/getItemsSummary");
      console.log(JSON.stringify(response.data));
      this.setState({ listOfItems: response.data });
    } catch (e) {
      console.log("iko shida: " + e);
    }
  };

  componentWillMount() {
    this.loadItems();
  }

  renderModal = item => {
    this.setState({ selectedItem: item });
  };

  render() {
    let { listOfItems, selectedItem } = this.state;
    var dateFormat = require("dateformat");
    let dataLoaded = {
      columns: [
        {
          label: "ID",
          field: "type_id",
          sort: "asc"
        },
        {
          label: "Quantity",
          field: "quantity",
          sort: "asc"
        },
        {
          label: "Price",
          field: "price",
          sort: "asc"
        },
        {
          label: "Description",
          field: "description",
          sort: "asc"
        },
        {
          label: "Unit",
          field: "unit_of_measure",
          sort: "asc"
        },
        {
          label: "Registered By",
          field: "registeredby",
          sort: "asc"
        },
        {
          label: "Date Created",
          field: "createdat"
        },
        {
          label: "Last Update",
          field: "updatedat"
        },
        { label: "Action", field: "action" }
      ],
      rows: listOfItems.map(item => {
        return {
          type_id: item.type_id,
          quantity: item.quantity,
          price: item.price,
          description: item.description,
          unit_of_measure: item.unit_of_measure,
          registeredby: item.registeredby,
          createdat: dateFormat(item.createdat, "dd-mm-yyyy hh:mm:ss") || " ",
          updatedat: dateFormat(item.updatedat, "dd-mm-yyyy hh:mm:ss") || " ",
          action: this.InitializeIssueItem(item)
        };
      })
    };
    return (
      <div style={{ background: "white" }}>
        <span
          className="navbar navbar-light bg-dark text-light"
          style={{ color: "gold", float: "right" }}
        >
          Issue Material
        </span>
        <div>
          <MDBDataTable
            striped
            bordered
            hover
            small
            data={dataLoaded}
            entriesOptions={[5, 10, 15, 20, 25]}
            entries={5}
            className="table-custom-styles table-custom-headers"
          />
        </div>
        <div className="modal" id="issueItem">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title primary">Issue Item</h4>
                <button className="close" data-dismiss="modal">
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <IsueItem selectedItem={selectedItem}></IsueItem>
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" data-dismiss="modal">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ItemsIssuable;
