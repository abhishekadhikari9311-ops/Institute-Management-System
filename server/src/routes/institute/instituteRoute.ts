import express, { Router } from "express";
import Middleware from "../../middlewares/middleware";
import asyncErrorHandler from "../../middlewares/asyncErrorHandling";
import InstituteController from "../../controllers/institute/instituteController";

const router: Router = express.Router();

router
  .route("/add")
  .post(
    Middleware.isLoggedIn,
    asyncErrorHandler(InstituteController.createInstitute),
    asyncErrorHandler(InstituteController.createTeacher),
    asyncErrorHandler(InstituteController.createStudent),
    asyncErrorHandler(InstituteController.createCategory),
    asyncErrorHandler(InstituteController.createCourse),
  );

export default router;
