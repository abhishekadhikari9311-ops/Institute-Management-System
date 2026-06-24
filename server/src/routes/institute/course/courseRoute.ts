import express, { Router } from "express";
import Middleware from "../../../middlewares/middleware";
import CourseController from "../../../controllers/institute/course/courseController";
import asyncErrorHandler from "../../../middlewares/asyncErrorHandling";
import upload from "../../../services/cloudinaryConfig";

const router: Router = express.Router();

router
  .route("/")
  .post(
    Middleware.isLoggedIn,
    upload.single("courseThumbnail"),
    asyncErrorHandler(CourseController.createCourse),
  );

export default router;
