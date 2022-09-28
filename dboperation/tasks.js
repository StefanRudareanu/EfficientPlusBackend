const ConnectMongo = require("./connection");
class Tasks extends ConnectMongo {
  constructor() {
    super();
    this.Tasks = this.mongoose.Schema({
      name: { type: String, required: true },
      descprition: { type: String, required: true },
      authors: { type: Array, required: true },
      delright: { type: String, required: true },
      subtask: [
        {
          name: String,
          state: String,
        },
      ],
    });
    this.TaskSchema = this.mongoose.model("Tasks", this.Tasks);
  }

  async CreateTask(data) {
    return await new this.TaskSchema(data).save();
  }
  async AddAuthor(username, taskid) {
    return await this.TaskSchema.findOneAndUpdate(
      { _id: taskid },
      {
        $push: { authors: username },
      }
    );
  }
  async DeleteTask(username, taskid) {
    return await this.TaskSchema.findOneAndDelete({
      _id: taskid,
      delright: { $in: [username] },
    });
  }
  async GetTaskUser(username) {
    return await this.TaskSchema.find({ authors: { $in: [username] } });
  }
  async GetSubtasks(id) {
    return await this.TaskSchema.find({ _id: id });
  }
  async AddSubtask(id, data) {
    return await this.TaskSchema.findOneAndUpdate(
      { _id: id },
      { $push: { subtask: data } }
    );
  }
  async ChangeSubtasksState(taskid, subtaskid, data) {
    return await this.TaskSchema.findOneAndUpdate(
      { _id: taskid, "subtask._id": subtaskid },
      {
        $set: { "subtask.$.state": data },
      }
    );
  }
}
module.exports = Tasks;
