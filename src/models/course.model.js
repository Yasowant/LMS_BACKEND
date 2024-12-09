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
    longDesescription: {
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
  },

  { timestamps: true }
);

export const CourseCollection = mongoose.model(
  "CourseCollection",
  courseSchema
);
