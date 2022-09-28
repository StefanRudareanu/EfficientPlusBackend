const { Router } = require("express");
const user = require("../dboperation/users");
const Users = new user();
const express = require("../node_modules/express");
const router = express.Router();
const bcrypt = require("../node_modules/bcrypt");
const protector = require("../dboperation/routeprotector");
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
    await Users.AddUser(req.body);
    res.status(200).send("User Added");
  } catch (error) {
    res.status(400).send({ err: error.message, password: req.body.password });
  }
});
router.post("/login", async (req, res) => {
  try {
    let use = await Users.GetUser(req.body.email);
    console.log(use);
    if (!use) {
      res.status(400).send("Invalid Email or Password");
    }
    let decrypted = await bcrypt.compare(req.body.password, use[0].password);
    if (!decrypted) {
      res.status(400).send("Invalid Email or Password");
    }
    let token = use[0].generateAuthToken();
    res.status(200).send({ token: token });
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
});
router.get("/me", protector, async (req, res) => {
  res.status(200).send({ username: req.user.username });
});
module.exports = router;
