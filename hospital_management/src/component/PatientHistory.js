import React, { component, Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  hashHistory,
} from "react-router-dom";
import axios from "axios";
const MedicalHistory = (props) => (
  <tr>
    <td>{props.PatientHistory.tbl_patient_diagnosis}</td>
    <td>{props.PatientHistory.tbl_patient_medicine}</td>
  </tr>
);

export default class PatientHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patientHistoryArr: [],
      diagnosis: "",
      medicine: "",
      userFullName: "",
      userId: 0,
      errorMsg: false,
      disableAddform: "inline",
    };
  }
  componentDidMount() {
    if (sessionStorage.getItem("userType") == 1) {
      this.setState({
        disableAddform: "none",
      });
    }
    if (
      (sessionStorage.getItem("user_id") == this.props.match.params.id &&
        sessionStorage.getItem("userType") == 1) ||
      sessionStorage.getItem("userType") == 2
    ) {
      axios
        .get(
          "http://localhost:5000/medicare/patient_history/" +
            this.props.match.params.id
        )
        .then((response) => {
          this.setState({
            patientHistoryArr: response.data,
            userId: this.props.match.params.id,
          });
        })
        .catch(function (err) {
          console.log("Error: " + err);
        });

      axios
        .get(
          "http://localhost:5000/medicare/patient_list/" +
            this.props.match.params.id
        )
        .then((response) => {
          console.log("data", response);
          this.setState({
            userFullName: response.data[0].tbl_user_fullName,
          });
          console.log("full name", this.state.userFullName);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      this.setState({ errorMsg: true });
    }
  }
  fetchPatientHistory() {
    if (this.state.patientHistoryArr.length > 0) {
      return this.state.patientHistoryArr.map(function (getList, i) {
        return (
          <MedicalHistory PatientHistory={getList} key={i}></MedicalHistory>
        );
      });
    } else {
      return (
        <tr>
          <td colSpan="2">No medical history found</td>
        </tr>
      );
    }
  }
  onDiagnosisChange = (e) => this.setState({ diagnosis: e.target.value });
  onMedicineChange = (e) => this.setState({ medicine: e.target.value });
  onSubmit = (e) => {
    e.preventDefault();
    const obj = {
      tbl_patient_id: this.state.userId,
      tbl_patient_diagnosis: this.state.diagnosis,
      tbl_patient_medicine: this.state.medicine,
    };
    axios
      .post("http://localhost:5000/medicare/new_patient_history", obj)
      .then((res) => {
        this.setState({
          diagnosis: "",
          medicine: "",
        });
        window.location.reload();
      })
      .catch(function (error) {
        console.log("Error : " + error);
      });
  };
  render() {
    const errorMessage = this.state.errorMsg;
    if (errorMessage) {
      return <div>Error: 404</div>;
    } else {
      return (
        <div>
          <h4>Patient History</h4>
          <h3>{this.state.userFullName}</h3>
          <form
            onSubmit={this.onSubmit}
            style={{ display: this.state.disableAddform }}
          >
            <div className="form-row">
              <div className="form-group col-md-5">
                <input
                  type="text"
                  className="form-control"
                  value={this.state.diagnosis}
                  onChange={this.onDiagnosisChange}
                  placeholder="Diagnosis"
                />
              </div>
              <div className="form-group col-md-5">
                <input
                  type="text"
                  className="form-control"
                  value={this.state.medicine}
                  onChange={this.onMedicineChange}
                  placeholder="Medicine"
                />
              </div>
              <div className="form-group col-md-2">
                <div>
                  <button type="submit" className="btn btn-outline-primary">
                    Add
                  </button>
                </div>
              </div>
            </div>
          </form>
          <div className="table-responsive">
            <table
              className="table table-striped"
              style={{ marginTop: 20 }}
              id="SelectListExcel"
            >
              <thead>
                <tr>
                  <th>Diagnosis</th>
                  <th>Prescribed Medication</th>
                </tr>
              </thead>
              <tbody>{this.fetchPatientHistory()}</tbody>
            </table>
          </div>
        </div>
      );
    }
  }
}
