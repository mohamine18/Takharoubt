const mongoose = require("mongoose");
require("dotenv").config();

const app = require("./app");

const port = process.env.PORT || 3000;

mongoose.connect(
  process.env.DB_URI,
  () => {
    console.log("database connected");
  },
  (err) => {
    console.log(`database connect error ${err}`);
  }
);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
