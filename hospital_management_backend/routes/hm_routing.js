const express = require("express");
const Router = express.Router();
const mySqlConnection = require("../db_connection");

//Get patient list
Router.get("/patient_list", (req, res) => {
  mySqlConnection.query("SELECT * FROM tbl_user_info;", (err, rows) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log("Error :" + err);
    }
  });
});
//Get patient history
Router.get("/patient_history/:id", (req, res) => {
  mySqlConnection.query(
    "select * from tbl_patient_history where tbl_patient_id=?",
    [req.params.id],
    (err, rows) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log("Error :" + err);
      }
    }
  );
});

module.exports = Router;
