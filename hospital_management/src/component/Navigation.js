import React, { component, Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  hashHistory,
} from "react-router-dom";
import ReactBootstrap, {
  Navbar,
  Button,
  Nav,
  Col,
  Form,
  FormControl,
  Grid,
  Panel,
  FormGroup,
} from "react-bootstrap";
import "../App.css";
import LoginPage from "../component/Login";
class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: sessionStorage.getItem("user_id"),
      userFullName: sessionStorage.getItem("full_name"),
    };
  }
  logOut() {
    sessionStorage.clear();
    window.location = "http://localhost:3000/login";
  }
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primarys">
        <a className="navbar-brand" href="#">
          Medicare
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              {/* <Link to="/profile/:id" className="nav-link">
                Profile
              </Link> */}
              <Link
                className="nav-link"
                to={"/ProfileInfo/" + this.state.userId}
              >
                Profile
              </Link>
            </li>
            <li className="nav-item">
              {sessionStorage.getItem("userType") == 1 ? (
                ""
              ) : (
                <Link to="/patientList" className="nav-link">
                  Patient List
                </Link>
              )}
            </li>
            <li className="nav-item">
              {sessionStorage.getItem("userType") == 1 ? (
                <Link
                  to={"/patientHistory/" + this.state.userId}
                  className="nav-link"
                >
                  Medical history
                </Link>
              ) : (
                ""
              )}
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {sessionStorage.getItem("full_name")}
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item" href="#" onClick={this.logOut}>
                    Log out
                  </a>
                </div>
              </li>
            </ul>
          </form>
        </div>
      </nav>
    );
  }
}
export default Navigation;
