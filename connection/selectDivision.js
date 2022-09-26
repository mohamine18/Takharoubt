const Division = require("../models/division");

module.exports = (io, socket) => {
  const selectedDivision = async (index, room) => {
    if (!room) return;
    await Division.findOneAndUpdate(
      { code: room },
      { $push: { selectedIndexes: index } }
    );
    socket.to(room).emit("selectedDivision", index);
  };

  socket.on("selectedDivision", selectedDivision);
  socket.on("joinRoom", (room) => {
    socket.join(room);
  });
};
