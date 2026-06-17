import express, { Router } from "express";
import InstituteController from "../../controllers/institute/instituteController";

const router: Router = express.Router();

router.route("/add").post(InstituteController.createInstitute);

export default router;
