import express, { Router } from "express";
import Middleware from "../../../middlewares/middleware";
import asyncErrorHandler from "../../../middlewares/asyncErrorHandling";
import CategoryController from "../../../controllers/institute/category/categoryController";

const router: Router = express.Router();

router
  .route("/")
  .post(
    Middleware.isLoggedIn,
    asyncErrorHandler(CategoryController.createCategory),
  )
  .get(
    Middleware.isLoggedIn,
    asyncErrorHandler(CategoryController.getCategories),
  );

router
  .route("/delete/:id")
  .delete(
    Middleware.isLoggedIn,
    asyncErrorHandler(CategoryController.deleteCategory),
  );

export default router;
