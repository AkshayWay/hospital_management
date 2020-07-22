import React, { component, Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  hashHistory,
} from "react-router-dom";
import axios from "axios";
import { Modal, Button, Form, Col } from "react-bootstrap";

const DisplayList = (props) => (
  <tr>
    <td>{props.PatienList.tbl_news_id}</td>
    <td>{props.PatienList.tbl_news_title}</td>
    <td>{props.PatienList.tbl_news_desciption}</td>

    <td>
      <input
        type="checkbox"
        value={props.PatienList.tbl_news_is_active}
        name="active_news"
        readOnly
        checked={props.PatienList.tbl_news_is_active == 1 ? true : false}
      />
    </td>

    <td>{props.PatienList.tbl_news_is_deleted}</td>

    <td>
      <Link
        className="btn btn-primary"
        to={"/editNews/" + props.PatienList.tbl_news_id}
      >
        Edit
      </Link>
    </td>
    <td>{/* <DeletePatienList variant={props.PatienList} /> */}</td>
  </tr>
);

export default class PatientList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patientListArray: [],
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:5000/medicare/patient_list")
      .then((response) => {
        this.setState({
          patientListArray: response.data,
        });
        console.log("Patient List", this.state.patientListArray);
      })
      .catch(function (err) {
        console.log("Error: " + err);
      });
  }
  fetchPatientList() {
    if (this.state.patientListArray.length > 0) {
      return this.state.patientListArray.map(function (getList, i) {
        return <DisplayList PatienList={getList} key={i}></DisplayList>;
      });
    } else {
      return (
        <tr>
          <td colSpan="5">No data found</td>
        </tr>
      );
    }
  }
  render() {
    return (
      <div>
        <div>
          <h1>Patient list</h1>
          <div className="table-responsive">
            <table
              className="table table-striped"
              style={{ marginTop: 20 }}
              id="SelectListExcel"
            >
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>State</th>
                  <th>Pin Code</th>
                </tr>
              </thead>
              <tbody>{this.fetchPatientList()}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
