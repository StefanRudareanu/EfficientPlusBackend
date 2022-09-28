class ConnectMongo {
  constructor() {
    this.mongoose = require("../node_modules/mongoose");
    this.mongoose.connect("mongodb://localhost:27017/UserTest");
  }
}
module.exports = ConnectMongo;
