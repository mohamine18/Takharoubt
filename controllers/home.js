exports.home = (req, res) => {
  res.render("home");
};

exports.createRoom = (req, res) => {
  res.render("createRoom");
};

exports.getFormData = (req, res) => {
  console.log(req.body);
  res.redirect("/create-a-room");
};
