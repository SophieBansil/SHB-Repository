const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://sophie-admin:mypasswordauth@my-cluster.f3uyp.mongodb.net/SHB-Database",
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  (err) => {
    if (!err) {
      console.log("MongoDB Connection Succeeded.");
    } else {
      console.log("Error in DB connection: " + err);
    }
  }
);

require("./registration.model");
