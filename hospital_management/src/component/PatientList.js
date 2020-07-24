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
    <td>{props.PatienList.tbl_user_fullName}</td>
    <td>{props.PatienList.tbl_user_email}</td>
    <td>{props.PatienList.tbl_user_phoneNumber}</td>
    <td>{props.PatienList.tbl_user_state}</td>
    <td>{props.PatienList.tbl_user_pincode}</td>
    <td>
      <Link
        className="btn btn-outline-primary"
        to={"/ProfileInfo/" + props.PatienList.tbl_user_id}
      >
        Profile
      </Link>
    </td>
    <td>
      <Link
        className="btn btn-outline-primary"
        to={"/patientHistory/" + props.PatienList.tbl_user_id}
      >
        History
      </Link>
    </td>
    <td>
      <DeletePatienList variant={props.PatienList} />
    </td>
  </tr>
);
function DeletePatienList(props) {
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const deleteAndClose = () => {
    console.log("delete id: " + props.variant.tbl_user_id);
    axios
      .post(
        "http://localhost:5000/medicare/patient_info/delete/" +
          props.variant.tbl_user_id
      )
      .then((res) => console.log(res.data), window.location.reload(true));
    setShow(false);
  };

  return (
    <>
      <Button
        variant="primary"
        className="btn btn-outline-danger"
        style={{ backgroundColor: "transparent", color: "Red" }}
        onClick={handleShow}
      >
        Delete
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Delete record</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete{" "}
          <b>'{props.variant.tbl_user_fullName}'</b> ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            className="btn btn-outline-danger"
            onClick={deleteAndClose}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default class PatientList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patientListArray: [],
      errorMsg: false,
    };
  }

  componentDidMount() {
    if (parseInt(sessionStorage.getItem("userType")) == 2) {
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
    } else {
      this.setState({
        errorMsg: true,
      });
    }
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
    const errorMessage = this.state.errorMsg;
    if (errorMessage) {
      return <div>Error: 404 Page not found</div>;
    } else {
      return (
        <div>
          <div>
            <h1>Patient list</h1>
            <div>
              <Link
                type="button"
                className="btn btn-outline-primary"
                to={"/ProfileInfo/0"}
              >
                New Patient
              </Link>
            </div>
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
                    <th colSpan="3">Action</th>
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
}
