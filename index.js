const config = require("./node_modules/config");
const cors = require("./node_modules/cors");
const morgan = require("./node_modules/morgan");
const usermid = require("./middleware/usermid");
const taskmid = require("./middleware/taskmid");
const ivitationmid = require("./middleware/invitationmid");

express = require("./node_modules/express");
app = express();
config.get("jwtPrivateKey");
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use("/api/users", usermid);
app.use("/api/tasks", taskmid);
app.use("/api/invitation", ivitationmid);
app.listen("4000", () => {
  console.log("Listening on 4000");
});
