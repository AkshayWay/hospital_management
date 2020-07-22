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
class Navigation extends Component {
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
              <Link to="/profile/:id" className="nav-link">
                Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/patientList" className="nav-link">
                Patient List
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
export default Navigation;
