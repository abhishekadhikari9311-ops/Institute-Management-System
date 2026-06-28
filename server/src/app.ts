import express from "express";
import authroute from "./routes/globals/auth/auth.route";
import instituteroute from "./routes/institute/instituteRoute";
import courseroute from "./routes/institute/course/courseRoute";
import categoryRoute from "./routes/institute/category/categoryRoute";
import instituteRoute from "./routes/institute/teacher/teacherRoute";
import teacherRoute from "./routes/teacher/teacherRoute";

const app = express();

app.use(express.json());

app.use("/", authroute);

app.use("/", instituteroute);

app.use("/institute", instituteRoute);

app.use("/teacher", teacherRoute);

app.use("/course", courseroute);

app.use("/category", categoryRoute);

export default app;