import mongoose, { Schema } from "mongoose";

const addressSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: String,
      required: true,
    },
    pinCode: {
      type: String,
      required: true,
    },
    houseNumber: {
      type: String,
      required: true,
    },
    area: {
      type: String,
      required: true,
    },
    landMark: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    defaultAddress: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const AddressCollection = mongoose.model(
  "AddressCollection",
  addressSchema
);
