const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");

app.use(bodyParser.json());
app.use("/user", userRouter);
app.use("/admin", adminRouter);  

app.listen(3000, () => {
  console.log("server started");
});
