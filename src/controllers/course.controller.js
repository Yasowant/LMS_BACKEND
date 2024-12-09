import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { CourseCollection } from "../models/course.model.js";

const addCourse = asyncHandler(async (req, res) => {
  const courses = req.body.courses;

  if (!Array.isArray(courses) || courses.length === 0) {
    throw new ApiError(400, "Please provide an array of courses.");
  }

  courses.forEach((course, index) => {
    if (
      !course.title ||
      !course.description ||
      !course.category ||
      !course.author ||
      !course.price ||
      !course.publishedDate
    ) {
      throw new ApiError(
        400,
        `All fields are required for course at index ${index}.`
      );
    }
    if (
      !course.title.trim() ||
      !course.description.trim() ||
      !course.category.trim() ||
      !course.author.trim() ||
      !course.price ||
      !course.publishedDate
    ) {
      throw new ApiError(
        400,
        `All fields must be non-empty for course at index ${index}.`
      );
    }
  });

  let courseCollection = await CourseCollection.findOne();

  if (!courseCollection) {
    courseCollection = await CourseCollection.create({ courses });
  } else {
    courseCollection.courses.push(...courses);
    await courseCollection.save();
  }

  return res
    .status(201)
    .json(new ApiResponse(200, courseCollection, "Courses added successfully"));
});

const getAllCourses = asyncHandler(async (req, res) => {
  const courseCollection = await CourseCollection.findOne();

  if (!courseCollection || !courseCollection.courses.length) {
    return res.status(404).json(new ApiResponse(404, [], "No courses found."));
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        courseCollection.courses,
        "Courses fetched successfully"
      )
    );
});

export { addCourse, getAllCourses };
