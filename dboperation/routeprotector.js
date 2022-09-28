let webtoken = require("../node_modules/jsonwebtoken");
let config = require("../node_modules/config");
function protector(req, res, next) {
  let token = req.header("auth-token");
  console.log(token);
  if (!token) {
    res.status(400).send("User dint provide a token");
  }
  try {
    let decoded = webtoken.verify(token, config.get("jwtPrivateKey"));
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error.message);
    res.status(400).send(error.message);
  }
}
module.exports = protector;
