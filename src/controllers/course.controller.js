import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { CourseCollection } from "../models/course.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const addCourse = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    longDesescription,
    category,
    author,
    price,
    publishedDate,
    rating, // Add rating to the destructuring
  } = req.body;

  // Check if all required fields are present
  if (
    [
      title,
      description,
      longDesescription,
      category,
      author,
      price,
      publishedDate,
    ].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  // Handle file upload for cover image
  const coverImageLocalPath = req.files?.coverImage[0]?.path;
  if (!coverImageLocalPath) {
    throw new ApiError(400, "CoverImage file is required");
  }

  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  // Set a default rating if not provided
  const courseRating = rating >= 0 && rating <= 5 ? rating : 0; // Validate rating within 0-5 range

  // Create a new course instance
  const course = new CourseCollection({
    title,
    description,
    longDesescription,
    category,
    author,
    price,
    publishedDate,
    coverImage: coverImage.url,
    rating: courseRating, // Add rating to the course object
  });

  // Save the course to the database
  await course.save();

  return res
    .status(201)
    .json(new ApiResponse(200, course, "Course added successfully"));
});

const getAllCourses = asyncHandler(async (req, res) => {
  const courses = await CourseCollection.find();
  if (!courses || courses.length === 0) {
    return res.status(404).json(new ApiResponse(404, [], "No courses found."));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, courses, "Courses fetched successfully"));
});

export { addCourse, getAllCourses };
