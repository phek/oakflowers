const authSettings = require("./auth");
const jwt = require("jsonwebtoken");

function isAuthenticated(req, adminOnly) {
  let token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (token) {
    try {
      const decoded = jwt.verify(token, authSettings.secret);
      if (adminOnly) {
        if (decoded.role === "admin") {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    } catch (err) {
      return false;
    }
  } else {
    return false;
  }
}

function send403Response(res) {
  res.status(403).send({
    message: "Authentisering misslyckades."
  });
}

function send500Response(res, error) {
  console.log(error);
  res.status(500).send({
    message: "Ett server fel uppstod."
  });
}

module.exports = {
  isAuthenticated,
  send403Response,
  send500Response
};
