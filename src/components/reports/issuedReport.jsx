import React, { Component } from "react";
import { MDBDataTable } from "mdbreact";
import "./readingView.css";
import { baseUrl } from "../utils/util";
import Axios from "axios";
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { Button } from 'react-bootstrap';

class IssuedReport extends Component {
  state = { listOfIssued: [] };

  findIssued = async () => {
    try {
      let response = await Axios.get(baseUrl + "api/getIssues");
      this.setState({
        listOfIssued: response.data
      });
    } catch (e) {
      console.log("Iko shida:" + e);
    }
  };

  componentWillMount() {
    this.findIssued();
  }

  exportToCSV = (csvData, fileName) => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    console.log("table data:"+JSON.stringify(csvData))
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], {type: fileType});
    FileSaver.saveAs(data, fileName + fileExtension);
}

  render() {
    let { listOfIssued } = this.state;
    var dateFormat = require("dateformat");
    let dataLoaded = {
      columns: [
        {
          label: "ID",
          field: "stock_id",
          sort: "asc"
        },
        {
          label: "Quantity",
          field: "stock_quantity",
          sort: "asc"
        },
        {
          label: "Price",
          field: "stock_price",
          sort: "asc"
        },
        {
          label: "Description",
          field: "stock_desc",
          sort: "asc"
        },
        {
          label: "Supplier",
          field: "stock_supplier",
          sort: "asc"
        },
        {
          label: "Receive By",
          field: "received_id",
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
        {
          label: "Type",
          field: "stock_type"
        },
        {
          label: "Issued By",
          field: "stock_issued_by"
        },
        {
          label: "Issued to",
          field: "stock_issued_to"
        },
        {
          label: "Project Code",
          field: "project_code"
        }
      ],
      rows: listOfIssued.map(activity => {
        return {
          id: activity.stock_id,
          stock_quantity: activity.stock_quantity,
          stock_price: activity.stock_price,
          stock_desc: activity.stock_desc,
          stock_supplier: activity.stock_supplier,
          received_id: activity.received_id,
          createdat:
            dateFormat(activity.createdat, "dd-mm-yyyy hh:mm:ss") || " ",
          updatedat:
            dateFormat(activity.updatedat, "dd-mm-yyyy hh:mm:ss") || " ",
          stock_type: activity.stock_type,
          stock_issued_by: activity.stock_issued_by,
          stock_issued_to: activity.stock_issued_to,
          project_code: activity.project_code
        };
      })
    };

    return (
      <div style={{ background: "white" }}>
        <span
          className="navbar navbar-light bg-dark text-light"
          style={{ color: "gold", float: "right" }}
        >
          Issued Items
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
        <div>
        <Button variant="secondary" onClick={(e) => this.exportToCSV(listOfIssued,"issued_items")}>Export XLS</Button>
        </div>
      </div>
    );
  }
}

export default IssuedReport;
