import React, { component, Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  hashHistory,
} from "react-router-dom";
import axios from "axios";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loggedIn: false,
      userName: "",
      userType: 0,
      errorMsg: "",
    };
  }
  onEmailChange = (e) => this.setState({ email: e.target.value });
  onPasswordChange = (e) => this.setState({ password: e.target.value });
  onSubmit = (e) => {
    e.preventDefault();
    const obj = {
      tbl_user_email: this.state.email,
      tbl_user_password: this.state.password,
    };
    axios
      .get(
        "http://localhost:5000/medicare/login/" +
          this.state.email +
          "/" +
          this.state.password
      )
      .then((response) => {
        console.log("response:", response.data[0]);
        if (response.data.length > 0) {
          /*localStorage.setItem("fullName", response.data[0].tbl_user_fullName);
          localStorage.setItem("loggedIn", "true");
          localStorage.setItem("user_id", response.data[0].tbl_user_id);
          localStorage.setItem("userType", response.data[0].tbl_user_type);
*/

          sessionStorage.setItem(
            "full_name",
            response.data[0].tbl_user_fullName
          );
          sessionStorage.setItem("loggedIn", true);
          sessionStorage.setItem("user_id", response.data[0].tbl_user_id);
          sessionStorage.setItem("userType", response.data[0].tbl_user_type);
          this.props.history.push("/");
          window.location.reload(true);
        } else {
          this.setState({
            errorMsg: "User email or password is incorrect.",
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  render() {
    return (
      <div>
        <div>
          <h1>Login page</h1>
          <label>{this.state.errorMsg}</label>
          <form onSubmit={this.onSubmit}>
            <label>email</label>
            <input
              type="email"
              value={this.state.email}
              onChange={this.onEmailChange}
            ></input>
            <label>Password</label>
            <input
              type="password"
              value={this.state.password}
              onChange={this.onPasswordChange}
            ></input>
            <div>
              <button type="submit" className="btn btn-outline-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
