import express, { Router } from "express";
import asyncErrorHandler from "../../middlewares/asyncErrorHandling";
import teacherLogin from "../../controllers/teacher/teacherController";
import TeacherController from "../../controllers/teacher/teacherController";

const router: Router = express.Router();

router
  .route("/teacher-login")
  .post(asyncErrorHandler(TeacherController.teacherLogin));

export default router;
