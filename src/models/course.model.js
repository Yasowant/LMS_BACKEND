import mongoose, { Schema } from "mongoose";

const courseSchema = new Schema(
  {
    courses: [
      {
        title: {
          type: String,
          required: true,
          unique: true,
          lowercase: true,
          trim: true,
        },
        description: {
          type: String,
          required: true,
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
      },
    ],
  },
  { timestamps: true }
);

export const CourseCollection = mongoose.model(
  "CourseCollection",
  courseSchema
);
