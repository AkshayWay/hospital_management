const express = require("express");
const Router = express.Router();
const mySqlConnection = require("../db_connection");

//Get patient list
Router.get("/patient_list", (req, res) => {
  mySqlConnection.query(
    "SELECT * FROM tbl_user_info where tbl_user_type<>2",
    (err, rows) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log("Error :" + err);
      }
    }
  );
});
//Specific Patient information
Router.get("/patient_list/:id", (req, res) => {
  mySqlConnection.query(
    "SELECT * FROM tbl_user_info where tbl_user_id=?;",
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
//Add or edit patient information
Router.post("/patient_info/:id", (req, res) => {
  let newObj = req.body;
  var sqlQuery =
    "SET @tbl_user_id=?; SET @tbl_user_fullName=?; SET @tbl_user_email=?; " +
    "SET @tbl_user_password=?;SET @tbl_user_phoneNumber=?;SET @tbl_user_address=?;" +
    "SET @tbl_user_city=?;SET @tbl_user_state=?;SET @tbl_user_pincode=?;SET @tbl_user_type=?;" +
    "CALL sp_patient_info(@tbl_user_id,@tbl_user_fullName,@tbl_user_email,@tbl_user_password," +
    "@tbl_user_phoneNumber, @tbl_user_address, @tbl_user_city,@tbl_user_state, @tbl_user_pincode,@tbl_user_type);";
  mySqlConnection.query(
    sqlQuery,
    [
      newObj.tbl_user_id,
      newObj.tbl_user_fullName,
      newObj.tbl_user_email,
      newObj.tbl_user_password,
      newObj.tbl_user_phoneNumber,
      newObj.tbl_user_address,
      newObj.tbl_user_city,
      newObj.tbl_user_state,
      newObj.tbl_user_pincode,
      newObj.tbl_user_type,
    ],
    (err, rows) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log("Error :" + err);
      }
    }
  );
});
//Delete user details
Router.post("/patient_info/delete/:id", (req, res) => {
  //let deleteId = req.body;
  var sqlQuery = "SET @tbl_user_id=?; CALL sp_delete_user_info(@tbl_user_id)";
  mySqlConnection.query(sqlQuery, [req.params.id], (err, rows) => {
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
//Patient medical history
Router.post("/new_patient_history", (req, res) => {
  let newObj = req.body;
  var sqlQuery =
    "SET @tbl_patient_diagnosis=?;SET @tbl_patient_medicine=?;" +
    "SET @tbl_patient_id=?; CALL sp_new_diagnosis(@tbl_patient_diagnosis,@tbl_patient_medicine,@tbl_patient_id)";
  mySqlConnection.query(
    sqlQuery,
    [
      newObj.tbl_patient_diagnosis,
      newObj.tbl_patient_medicine,
      newObj.tbl_patient_id,
    ],
    (err, rows) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log("Error :" + err);
      }
    }
  );
});
//User login
Router.get("/login/:tbl_user_email/:tbl_user_password", (req, res) => {
  let newObj = req.params;
  mySqlConnection.query(
    "select * from tbl_user_info where tbl_user_email='" +
      req.params.tbl_user_email +
      "' and tbl_user_password='" +
      req.params.tbl_user_password +
      "';",
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
