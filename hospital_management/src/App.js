import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  hashHistory,
  BrowserRouter,
} from "react-router-dom";
import "./App.css";

import Navigation from "./component/Navigation";
import HomePage from "./component/HomePage";
import PatientList from "./component/PatientList";
import ProfileInfo from "./component/ProfileInfo";
import PatientHistory from "./component/PatientHistory";
import Login from "./component/Login";
import Footer from "./component/Footer";

function App() {
  return (
    <Router>
      <div className="container">
        {sessionStorage.getItem("full_name") == undefined ? "" : <Navigation />}
        {/* <Navigation /> */}
        <div className="container" style={{ minHeight: 511 + "px" }}>
          <Route path="/" exact component={Login}></Route>
          <Route path="/home" exact component={HomePage}></Route>
          <Route path="/patientList" exact component={PatientList}></Route>
          <Route path="/ProfileInfo/:id" exact component={ProfileInfo}></Route>
          <Route
            path="/patientHistory/:id"
            exact
            component={PatientHistory}
          ></Route>
        </div>
        {sessionStorage.getItem("full_name") == undefined ? "" : <Footer />}
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
