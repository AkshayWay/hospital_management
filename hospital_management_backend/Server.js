const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const port = process.env.port || 5000;
const mySqlConnection = require("./db_connection");
const hospital_management_route = require("./routes/hm_routing");
var cors = require("cors");

var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/medicare", hospital_management_route);

app.listen(port, function () {
  console.log("Application running on port number " + port);
});
