const Email = require("../utils/mail");

exports.pageNotFound = (req, res, next) => {
  const err = new Error("404 Page Not Found");
  err.statusCode = 404;
  throw err;
};

exports.globalErrorhandler = (err, req, res, next) => {
  if (err.statusCode === 404) {
    return res.render("notFound", {
      link: process.env.WEBSITE_URL,
    });
  }
  // new Email().sendGlobalError(err.name, err);
  console.log("error from global error handler Name =>", err.name);
  console.log("error from global error handler =>", err);
  res.render("serverError", {
    link: process.env.WEBSITE_URL,
  });
};
