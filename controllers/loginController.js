const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");

router.get("/", (req, res) => {
  res.render("registration/login", {
    viewTitle: "StudentHousingBuddy Login",
  });
});

router.post("/", (req, res) => {
  var Username = req.body.Username;
  var Password = req.body.Password;
  if (Username == "staff" && Password == "staff2021") {
    res.render("registration/staff");
  } else if (Username == "admin" && Password == "admin2021") {
    res.render("registration/admin");
  } else {
    res.render("registration/homepage", {
      viewTitle: Username,
    });
  }
});

module.exports = router;
