const mongoose = require("mongoose");
module.exports = (app) => {
  // connect with mongodb and make app listenable from browser
  mongoose
    .connect(
      "mongodb://localhost:27017/RestoreRadiance"
        ? "mongodb://localhost:27017/RestoreRadiance"
        : ""
    )
    .then((data) => {
      app.listen(process.env.PORT || 3000);
      console.log("server started");
    })
    .catch((err) => {
      console.log(err);
    });
};
