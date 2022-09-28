const express = require("../node_modules/express");
const router = express.Router();
const GetData = require("../dboperation/tasks");
const protect = require("../dboperation/routeprotector");
const Tasks = new GetData();
router.post("/", protect, async (req, res) => {
  try {
    await Tasks.CreateTask(req.body);
    res.status(200).send("Data Added");
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
});
router.get("/:username", protect, async (req, res) => {
  try {
    let data = await Tasks.GetTaskUser(req.params.username);
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send(error.message);
  }
});
router.delete("/:username/:taskid", protect, async (req, res) => {
  try {
    let delet = await Tasks.DeleteTask(req.params.username, req.params.taskid);
    console.log(delet);
    res.status(200).send();
  } catch (error) {
    res.status(400).send(error.message);
  }
});
router.patch("/:taskid", protect, async (req, res) => {
  try {
    await Tasks.AddAuthor(req.body.username, req.params.taskid);
    res.status(200).send("author added");
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
});
router.put("/:taskid", protect, async (req, res) => {
  try {
    await Tasks.AddSubtask(req.params.taskid, req.body);
    res.status(200).send("Subtask added");
  } catch (error) {
    res.status(500).send({ err: error.message });
  }
});
router.get("/subtasks/:taskid", protect, async (req, res) => {
  try {
    let data = await Tasks.GetSubtasks(req.params.taskid);
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
});
router.patch("/subtasks/:taskid/:subtaskid", protect, async (req, res) => {
  try {
    await Tasks.ChangeSubtasksState(
      req.params.taskid,
      req.params.subtaskid,
      req.body.state
    );
    res.status(200).send("Data Changed");
  } catch (error) {
    console.log(error.message);
    res.status(400).send(error.message);
  }
});
module.exports = router;
