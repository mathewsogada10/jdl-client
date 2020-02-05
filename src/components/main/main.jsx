import React, { Component } from "react";
import RecordStockForm from "../forms/recordStockForm";
import GeneralReport from "../reports/generalReport";
import AddItem from "../forms/addItem";
import AddProject from "../forms/addProject";
import "./dashboardcss.css";
import ItemsReport from "../reports/itemsReport";
import IssuedReport from "../reports/issuedReport";
import ItemsIssuable from "../reports/itemsIssuable";

class Main extends Component {
  state = {
    clickType: null
  };

  onSideBarMenuChange = value => {
    this.setState({ clickType: value });
  };

  render() {
    var { clickType } = this.state;
    return (
      <div className="wrapper">
        <nav id="sidebar">
          <div className="sidebar-header"><h3>JDL Stores</h3></div>
          <ul className="list-unstyled components">
            <li>
              <a href="#"><h5>Dashboard</h5></a>
            </li>
            <li className="active">
              <a
                href="#homeSubmenu"
                data-toggle="collapse"
                aria-expanded="false"
                className="npm -toggle"
              >
                Material Management
              </a>
              <ul className="collapse list-unstyled" id="homeSubmenu">
                <li onClickCapture={() => this.onSideBarMenuChange("input")}>
                  <a href="#"> Receive Material</a>
                </li>
                <li onClickCapture={() => this.onSideBarMenuChange("issue")}>
                  <a href="#"> Issue Material </a>
                </li>
              </ul>
              <a
                href="#configSubmenu"
                data-toggle="collapse"
                aria-expanded="false"
                className="npm -toggle"
              >
                Material Configuration
              </a>
              <ul className="collapse list-unstyled" id="configSubmenu">
                <li onClickCapture={() => this.onSideBarMenuChange("item")}>
                  <a href="#">Add Material Type</a>
                </li>
                <li onClickCapture={() => this.onSideBarMenuChange("project")}>
                  <a href="#">Add New Project</a>
                </li>
              </ul>
            </li>
            <li className="active">
              <a
                href="#reportSubmenu"
                data-toggle="collapse"
                aria-expanded="false"
                className="npm -toggle"
              >
                Reports Module
              </a>
              <ul className="collapse list-unstyled" id="reportSubmenu">
                <li
                  onClickCapture={() => this.onSideBarMenuChange("rpurchases")}
                >
                  <a href="#">Materials Received</a>
                </li>
                <li onClickCapture={() => this.onSideBarMenuChange("rissued")}>
                  <a href="#">Materials Issued</a>
                </li>
                <li onClickCapture={() => this.onSideBarMenuChange("ritem")}>
                  <a href="#">Item summary</a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
        <div id="content">
          <nav
            className="navbar navbar-light bg-dark text-light"
            style={{ width: "100%" }}
          >
            <div className="container-fluid">
              <img
                src="logo.bmp"
                alt=""
                style={{ padding: "0px 0px", maxWidth: "100%", height: "64px" }}
              />
              <span
                className="navbar-text"
                style={{ color: "gold", float: "right" }}
              >
                {"Logged in as "} {localStorage.getItem("username")}
              </span>
            </div>
          </nav>
          <div>
            {clickType === "input" ? (
              <div>
                <RecordStockForm />
              </div>
            ) : clickType === "item" ? (
              <div>
                <AddItem />
              </div>
            ) : clickType === "project" ? (
              <div>
                <AddProject />
              </div>
            ) : clickType === "rpurchases" ? (
              <div>
                <GeneralReport />
              </div>
            ) : clickType === "rissued" ? (
              <div>
                <IssuedReport />
              </div>
            ) : clickType === "ritem" ? (
              <div>
                <ItemsReport />
              </div>
            ) : clickType === "issue" ? (
              <div>
                <ItemsIssuable />
              </div>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
