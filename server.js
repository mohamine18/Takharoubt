const mongoose = require("mongoose");
const { Server } = require("socket.io");

const selectedDivisionHandler = require("./connection/selectDivision");

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

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const io = new Server(server);

io.on("connection", (socket) => {
  selectedDivisionHandler(io, socket);
});
