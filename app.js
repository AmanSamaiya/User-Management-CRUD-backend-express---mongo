const cors = require("cors");
require("dotenv").config();
const userRoutes = require("./Routes/userRoutes.js");
const connectToDb = require("./config/db.js");
const express = require("express");

const app = express();

connectToDb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/", userRoutes);

module.exports = app;
