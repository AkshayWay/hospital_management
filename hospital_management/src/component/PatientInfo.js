import React, { component, Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  hashHistory,
} from "react-router-dom";
import covid_banner from "../assets/images/covid_banner.jpg";
import axios from "axios";

export default class PatientInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: 0,
      userFullName: "",
      userEmail: "",
      userPassword: "Healthcare",
      userPhoneNumber: "",
      userAddress: "",
      userCity: "",
      userState: "",
      userPincode: "",
      userType: 1,
      actionToPerform: "Add",
    };
  }
  onFullNameChange = (e) => this.setState({ userFullName: e.target.value });
  onEmailChange = (e) => this.setState({ userEmail: e.target.value });
  onPasswordChange = (e) => this.setState({ userPassword: e.target.value });
  onPhoneNumberChange = (e) =>
    this.setState({ userPhoneNumber: e.target.value });
  onAddressChange = (e) => this.setState({ userAddress: e.target.value });
  onCityChange = (e) => this.setState({ userCity: e.target.value });
  onStateChange = (e) => this.setState({ userState: e.target.value });
  onPincodeChange = (e) => this.setState({ userPincode: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();
    const obj = {
      tbl_user_id: this.state.userId,
      tbl_user_fullName: this.state.userFullName,
      tbl_user_email: this.state.userEmail,
      tbl_user_password: this.state.userPassword,
      tbl_user_phoneNumber: this.state.userPhoneNumber,
      tbl_user_address: this.state.userAddress,
      tbl_user_city: this.state.userCity,
      tbl_user_state: this.state.userState,
      tbl_user_pincode: this.state.userPincode,
      tbl_user_type: this.state.userType,
    };
    axios
      .post(
        "http://localhost:5000/medicare/patient_info/" +
          this.props.match.params.id,
        obj
      )
      .then((res) => {
        console.log("Patient information was successfully Inserted/Updated");
        this.props.history.push("/patientList");
      })
      .catch(function (error) {
        console.log("Error : " + error);
      });
  };
  componentDidMount() {
    if (this.props.match.params.id != 0) {
      axios
        .get(
          "http://localhost:5000/medicare/patient_list/" +
            this.props.match.params.id
        )
        .then((response) => {
          console.log("response:", response.data[0]);
          this.setState({
            userId: response.data[0].tbl_user_id,
            userFullName: response.data[0].tbl_user_fullName,
            userEmail: response.data[0].tbl_user_email,
            userPassword: response.data[0].tbl_user_password,
            userPhoneNumber: response.data[0].tbl_user_phoneNumber,
            userAddress: response.data[0].tbl_user_address,
            userCity: response.data[0].tbl_user_city,
            userState: response.data[0].tbl_user_state,
            userPincode: response.data[0].tbl_user_pincode,
            userType: response.data[0].tbl_user_type,
            actionToPerform: "Edit",
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    // else {
    //   this.setState({
    //     datesDisplay: "none",
    //   });
    // }
  }
  render() {
    const buttonCenter = {
      margin: "auto",
    };
    return (
      <div>
        <div>
          <h1>Form to fill</h1>

          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Full name</label>
              <input
                type="text"
                className="form-control"
                value={this.state.userFullName}
                id="fullName"
                onChange={this.onFullNameChange}
                placeholder="firstname middlename lastname"
              />
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={this.state.userEmail}
                  id="inputEmail4"
                  onChange={this.onEmailChange}
                  placeholder="abc@gmail.com"
                />
              </div>
              <div className="form-group col-md-4">
                <label>Password</label>
                <input
                  type="password"
                  minLength="8"
                  className="form-control"
                  value={this.state.userPassword}
                  onChange={this.onPasswordChange}
                  id="inputPassword4"
                />
              </div>
              <div className="form-group col-md-2">
                <label>Phone Number</label>
                <input
                  type="text"
                  maxLength="10"
                  className="form-control"
                  value={this.state.userPhoneNumber}
                  onChange={this.onPhoneNumberChange}
                  id="phoneNumber"
                />
              </div>
            </div>
            <div className="form-group">
              <label>Address</label>
              <textarea
                type="text"
                rows="3"
                value={this.state.userAddress}
                onChange={this.onAddressChange}
                className="form-control"
                id="inputAddress"
                placeholder="1234 Main St"
              />
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>City</label>
                <input
                  type="text"
                  value={this.state.userCity}
                  onChange={this.onCityChange}
                  className="form-control"
                  id="inputCity"
                  placeholder="Mumbai"
                />
              </div>
              <div className="form-group col-md-4">
                <label>State</label>
                <input
                  type="text"
                  value={this.state.userState}
                  onChange={this.onStateChange}
                  className="form-control"
                  id="inputState"
                  placeholder="Maharashtra"
                />
              </div>
              <div className="form-group col-md-2">
                <label>Pincode</label>
                <input
                  type="text"
                  maxLength="6"
                  className="form-control"
                  value={this.state.userPincode}
                  onChange={this.onPincodeChange}
                  id="inputZip"
                />
              </div>
            </div>
            <div className="form-row">
              <div style={buttonCenter}>
                <button type="submit" className="btn btn-outline-primary">
                  {this.state.actionToPerform}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
