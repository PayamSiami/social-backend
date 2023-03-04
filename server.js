require("dotenv").config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const fileUpload = require("express-fileupload");

const { readdirSync } = require("fs");
const morgan = require("morgan");

const app = express();

//database
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log("database connected successfully"))
  .catch((err) => console.log("error connecting to mongodb", err));

const PORT = process.env.PORT || 8000;

// middlewares
app.use(express.json({ limit: "4mb" }));
app.use(cors());
app.use(morgan("dev"));
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

//routes
readdirSync("./routes").map((r) => app.use("/", require("./routes/" + r)));

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}..`);
});