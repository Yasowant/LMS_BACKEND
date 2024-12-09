import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { addCourse, getAllCourses } from "../controllers/course.controller.js";

const router = Router();

router.route("/addCourse").post(
  upload.fields([
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  addCourse
);
router.route("/getallCourses").get(getAllCourses);

export default router;
