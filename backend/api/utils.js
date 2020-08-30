const authSettings = require("./auth");
const jwt = require("jsonwebtoken");

function getUser(req, adminOnly) {
  let token =
    req.body.token ||
    req.query.token ||
    req.headers["x-access-token"] ||
    req.headers["authorization"];

  if (token) {
    try {
      const user = jwt.verify(token, authSettings.secret);
      if (adminOnly) {
        if (user.role === "admin") {
          return user;
        } else {
          return null;
        }
      } else {
        return user;
      }
    } catch (err) {
      return null;
    }
  } else {
    return null;
  }
}

function send403Response(res) {
  res.status(403).send({
    message: "Authentisering misslyckades.",
  });
}

function send500Response(res, error) {
  console.log(error);
  res.status(500).send({
    message: "Ett server fel uppstod.",
  });
}

module.exports = {
  getUser,
  send403Response,
  send500Response,
};
