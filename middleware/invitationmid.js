const express = require("express");
const router = express.Router();
const invitaion = require("../dboperation/invitation");
const Invite = new invitaion();
const protector = require("../dboperation/routeprotector");
const morgan = require("morgan");

router.post("/", protector, async (req, res) => {
  try {
    await Invite.CreateInvitations(req.body);
    res.status(200).send({ msg: "Data added succesfully" });
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
});
router.get("/:username", async (req, res) => {
  try {
    let data = await Invite.GetInvitations(req.params.username);
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send({ err: error });
  }
});
router.delete("/:inviteid", async (req, res) => {
  try {
    await Invite.DeleteInvitaion(req.params.inviteid);
    res.status(200).send({ msg: "Date Deleted" });
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
});

module.exports = router;
