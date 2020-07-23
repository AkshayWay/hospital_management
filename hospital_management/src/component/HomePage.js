import React, { component, Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  hashHistory,
} from "react-router-dom";
import covid_banner from "../assets/images/covid_banner.jpg";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: sessionStorage.getItem("full_name"),
    };
  }

  render() {
    return (
      <div>
        <div>
          <h1>{this.state.userName}</h1>
          <img
            src={covid_banner}
            className="img-fluid rounded rounded shadow p-3 mb-5 bg-white rounded"
            alt="Responsive image"
          />
        </div>
      </div>
    );
  }
}
