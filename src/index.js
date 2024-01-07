const express = require("express");
const cors = require("cors");
const dbConnection = require("./config/dbConfig");
const userRouter = require("./routes/userRoute");
const reviewRouter = require("./routes/reviewRouter");
const PORT = 8000;

const app = express();

app.use(express.json());
app.use(cors());

// routes
app.use("/user", userRouter);
app.use("/review", reviewRouter);

app.get("/", (req, res) => {
  res.json({ msg: "Welcome explorer!", status: 200 });
});

app.listen(PORT, async () => {
  await dbConnection();
  console.log(`server started at port ${PORT}`);
});
