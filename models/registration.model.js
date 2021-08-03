const mongoose = require("mongoose");

var registrationSchema = new mongoose.Schema({
  StudentID: {
    type: String,
    required: "*Required.",
  },
  FirstName: {
    type: String,
    required: "*Required.",
  },
  MiddleName: {
    type: String,
    required: false,
  },
  LastName: {
    type: String,
    required: "*Required",
  },
  Age: {
    type: Number,
    required: "*Required",
  },
  Address: {
    type: String,
    required: "*Required",
  },
  PhoneNumber: {
    type: Number,
    required: "*Required",
  },
  Email: {
    type: String,
    required: "*Required",
  },
  SchoolYear: {
    type: String,
    required: "*Required",
  },
  StartDate: {
    type: String,
    required: "*Required",
  },
  EndDate: {
    type: String,
    required: "*Required",
  },
  Notes: {
    type: String,
    required: false,
  },
});

// Custom validation for email
registrationSchema.path("Email").validate((val) => {
  emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(val);
}, "Invalid e-mail.");

mongoose.model("Registration", registrationSchema);
