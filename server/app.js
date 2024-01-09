const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const { connectDatabase } = require("./config/db");

//dotenv configuration
require("dotenv").config();

//Database Connection
connectDatabase();

//middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

//route
app.get("/", (req, res) => {
  return res.status(200).send("Welcome to Food server");
});

app.use("/api/v1/auth", require("./routes/authRoutes"));

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
