import express, { Router } from "express";
import Middleware from "../../middlewares/middleware";
import asyncErrorHandler from "../../middlewares/asyncErrorHandling";
import TeacherController from "../../controllers/teacher/teacherController";
import upload from "../../services/cloudinaryConfig";

const router: Router = express.Router();

router
  .route("/")
  .post(
    asyncErrorHandler(Middleware.isLoggedIn),
    upload.single("teacherPhoto"),
    asyncErrorHandler(TeacherController.createTeacher),
  )
  .get(
    asyncErrorHandler(Middleware.isLoggedIn),
    asyncErrorHandler(TeacherController.getTeacher),
  );

router
  .route("/:id")
  .delete(
    asyncErrorHandler(Middleware.isLoggedIn),
    asyncErrorHandler(TeacherController.deleteTeacher),
  );

export default router;
