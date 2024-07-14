const mongoose = require("mongoose");

require("dotenv").config();

exports.dbConnect = async () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("dbconnected Successfully");
    })
    .catch((e) => {
      console.error(e);
      process.exit(1);
    });
};
