import express, { Router } from "express";
import Middleware from "../../../middlewares/middleware";
import CourseController from "../../../controllers/institute/course/courseController";
import asyncErrorHandler from "../../../middlewares/asyncErrorHandling";
import upload from "../../../services/cloudinaryConfig";

const router: Router = express.Router();

router
  .route("/:categoryId/:teacherId")
  .post(
    Middleware.isLoggedIn,
    upload.single("courseThumbnail"),
    asyncErrorHandler(CourseController.createCourse),
  );

router
  .route("/")
  .get(Middleware.isLoggedIn, asyncErrorHandler(CourseController.getAllCourse));

router
  .route("/single")
  .get(
    Middleware.isLoggedIn,
    asyncErrorHandler(CourseController.getSingleCourse),
  );

router
  .route("/delete/:id")
  .delete(
    Middleware.isLoggedIn,
    asyncErrorHandler(CourseController.deleteCourse),
  );

export default router;
