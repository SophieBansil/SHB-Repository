const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Registration = mongoose.model("Registration");

router.get("/", (req, res) => {
  res.render("registration/addoredit", {
    viewTitle: "StudentHousingBuddy Registration",
  });
});

router.post("/", (req, res) => {
  if (req.body._id == "") insertRecord(req, res);
  else updateRecord(req, res);
});

function insertRecord(req, res) {
  var registration = new Registration();
  registration.StudentID = req.body.StudentID;
  registration.FirstName = req.body.FirstName;
  registration.MiddleName = req.body.MiddleName;
  registration.LastName = req.body.LastName;
  registration.Age = req.body.Age;
  registration.Address = req.body.Address;
  registration.PhoneNumber = req.body.PhoneNumber;
  registration.Email = req.body.Email;
  registration.SchoolYear = req.body.SchoolYear;
  registration.StartDate = req.body.StartDate;
  registration.EndDate = req.body.EndDate;
  registration.Notes = req.body.Notes;
  registration.save((err, doc) => {
    if (!err) res.redirect("registration/list");
    else {
      if (err.name == "ValidationError") {
        handleValidationError(err, req.body);
        res.render("registration/addoredit", {
          viewTitle: "Student Housing Buddy",
          registration: req.body,
        });
      } else console.log("Error in registration: " + err);
    }
  });
}

function updateRecord(req, res) {
  Registration.findOneAndUpdate(
    { _id: req.body._id },
    req.body,
    { new: true },
    (err, doc) => {
      if (!err) {
        res.redirect("registration/list");
      } else {
        if (err.name == "ValidationError") {
          handleValidationError(err, req.body);
          res.render("registration/addoredit", {
            viewTitle: "Update Registration",
            registration: req.body,
          });
        } else console.log("Error updating the registration: " + err);
      }
    }
  );
}

router.get("/list", (req, res) => {
  Registration.find((err, docs) => {
    if (!err) {
      res.render("registration/list", {
        list: docs,
      });
    } else {
      console.log("Error in retrieving registration list:" + err);
    }
  });
});

function handleValidationError(err, body) {
  for (field in err.errors) {
    switch (err.errors[field].path) {
      case "StudentID":
        body["StudentIDError"] = err.errors[field].message;
        break;
      case "FirstName":
        body["FirstNameError"] = err.errors[field].message;
        break;
      case "MiddleName":
        body["MiddleNameError"] = err.errors[field].message;
        break;
      case "LastName":
        body["LastNameError"] = err.errors[field].message;
        break;
      case "Age":
        body["AgeError"] = err.errors[field].message;
        break;
      case "Address":
        body["AddressError"] = err.errors[field].message;
        break;
      case "PhoneNumber":
        body["PhoneNumberError"] = err.errors[field].message;
        break;
      case "Email":
        body["EmailError"] = err.errors[field].message;
        break;
      case "SchoolYear":
        body["SchoolYearError"] = err.errors[field].message;
        break;
      case "StartDate":
        body["StartDateError"] = err.errors[field].message;
        break;
      case "EndDate":
        body["EndDateError"] = err.errors[field].message;
        break;
      case "Notes":
        body["NotesError"] = err.errors[field].message;
        break;
      default:
        break;
    }
  }
}

router.get("/:id", (req, res) => {
  Registration.findById(req.params.id, (err, doc) => {
    if (!err) {
      res.render("registration/addoredit", {
        viewTitle: "Update Registration",
        registration: doc,
      });
    }
  });
});

router.get("/delete/:id", (req, res) => {
  Registration.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      res.redirect("/registration/list");
    } else {
      console.log("Error in deleting registration:" + err);
    }
  });
});

module.exports = router;
