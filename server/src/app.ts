// import express from "express";
// const express = require("express");
import express from "express";
import authroute from "./routes/globals/auth/auth.route";
import instituteroute from "./routes/institute/instituteRoute";
import courseroute from "./routes/institute/course/courseRoute";

const app = express();

app.use(express.json());

app.use("/", authroute);

app.use("/", instituteroute);

app.use("/course", courseroute);

export default app;
