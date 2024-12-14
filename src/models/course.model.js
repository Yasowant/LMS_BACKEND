import mongoose, { Schema } from "mongoose";

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
    },
    longDescription: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    publishedDate: {
      type: Date,
      required: true,
    },
    coverImage: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      min: 0, // Minimum value is 0
      max: 5, // Maximum value is 5 (assumes a 5-star rating system)
      default: 0, // Default rating is 0 if not provided
    },
  },

  { timestamps: true }
);

export const CourseCollection = mongoose.model(
  "CourseCollection",
  courseSchema
);
