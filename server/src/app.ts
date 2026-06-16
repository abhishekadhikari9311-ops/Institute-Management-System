// import express from "express";
// const express = require("express");
import express from "express";
import authroute from "./routes/globals/auth/auth.route";

const app = express();

app.use(express.json());

app.use("/", authroute);

export default app;
