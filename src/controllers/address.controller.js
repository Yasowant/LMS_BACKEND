import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AddressCollection } from "../models/address.model.js";

const addAddress = asyncHandler(async (req, res) => {
  const {
    fullName,
    mobileNumber,
    pinCode,
    houseNumber,
    area,
    landMark,
    city,
    state,
    defaultAddress,
  } = req.body;
  if (
    [
      fullName,
      mobileNumber,
      pinCode,
      houseNumber,
      area,
      landMark,
      city,
      state,
    ].some((field) => typeof field !== "string" || field.trim() === "") ||
    (defaultAddress !== undefined && typeof defaultAddress !== "boolean")
  ) {
    throw new ApiError(
      400,
      "All fields are required and defaultAddress must be a boolean"
    );
  }

  const address = new AddressCollection({
    fullName,
    mobileNumber,
    pinCode,
    houseNumber,
    area,
    landMark,
    city,
    state,
    defaultAddress,
  });

  await address.save();
  return res
    .status(201)
    .json(new ApiResponse(200, address, "Address added successfully"));
});

const deleteAddress = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const address = await AddressCollection.findById(id);
  if (!address) {
    throw new ApiError(404, "Address not found");
  }
  await AddressCollection.deleteOne({ _id: id });

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Address deleted successfully"));
});

export { addAddress, deleteAddress };