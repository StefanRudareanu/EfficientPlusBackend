const ConnectMongo = require("./connection");
const webtoken = require("../node_modules/jsonwebtoken");
const config = require("../node_modules/config");

class Users extends ConnectMongo {
  constructor() {
    super();
    this.User = this.mongoose.Schema({
      username: { type: String, required: true, unique: true, minlenght: 5 },
      password: { type: String, required: true, minlenght: 5 },
      email: { type: String, required: true, unique: true },
    });

    this.User.methods.generateAuthToken = function () {
      const token = webtoken.sign(
        { username: this.username, id: this._id },
        config.get("jwtPrivateKey")
      );
      return token;
    };
    this.UserSchema = this.mongoose.model("Users", this.User);
  }
  async AddUser(data) {
    return await new this.UserSchema(data).save();
  }
  async GetUser(email) {
    return await this.UserSchema.find({ email: email });
  }
  async GetUsername(username) {
    return await this.UserSchema.find({ username: username }).select(
      "username"
    );
  }
}
module.exports = Users;
