import { Router } from "express";
import { addCourse, getAllCourses } from "../controllers/course.controller.js";

const router = Router();

router.route("/addCourse").post(addCourse);
router.route("/getallCourses").get(getAllCourses);

export default router;
