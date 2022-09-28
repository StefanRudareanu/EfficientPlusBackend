const ConnectMongo = require("./connection");
const Users = require("./users");

class Invitation extends ConnectMongo {
  constructor() {
    super();
    this.Invitation = this.mongoose.Schema({
      reciver: { type: String, required: true },
      taskname: { type: String, required: true },
      sender: { type: String, required: true },
      taskid: { type: String, required: true },
    });
    this.SchemInvitation = this.mongoose.model("invitaions", this.Invitation);
  }

  async GetInvitations(username) {
    return await this.SchemInvitation.find({ reciver: username });
  }
  async CreateInvitations(data) {
    return await new this.SchemInvitation(data).save();
  }
  async DeleteInvitaion(id) {
    return await this.SchemInvitation.findOneAndDelete({ _id: id });
  }
}
module.exports = Invitation;
