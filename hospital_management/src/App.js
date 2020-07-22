import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  hashHistory,
} from "react-router-dom";
import "./App.css";

import Navigation from "./component/Navigation";
import HomePage from "./component/HomePage";
import PatientList from "./component/PatientList";
import Footer from "./component/Footer";

function App() {
  return (
    <Router>
      <div className="container">
        <Navigation />
        <div className="container" style={{ minHeight: 511 + "px" }}>
          <Route path="/" exact component={HomePage}></Route>
          <Route path="/patientList" exact component={PatientList}></Route>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
