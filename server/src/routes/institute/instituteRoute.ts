import express, { Router } from "express";
import InstituteController from "../../controllers/institute/instituteController";
import Middleware from "../../middlewares/middleware";
import asyncErrorHandler from "../../middlewares/asyncErrorHandling";

const router: Router = express.Router();

router
  .route("/add")
  .post(
    Middleware.isLoggedIn,
    InstituteController.createInstitute,
    InstituteController.createTeacher,
    InstituteController.createStudent,
    asyncErrorHandler(InstituteController.createCourse),
  );

export default router;
