import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AddressCollection } from "../models/address.model.js";

const addAddress = asyncHandler(async (req, res) => {
  const {
    userId,
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
    userId,
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

const getAddressesForUser = asyncHandler(async (req, res) => {
  //find user through params
  //then find address by user id

  const { userId } = req.params;
  const addresses = await AddressCollection.find({ userId });
  if (!addresses.length) {
    throw new ApiError(404, "No addresses found for this user");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, addresses, "Addresses retrieved successfully"));
});

const updateAddress = asyncHandler(async (req, res) => {
  //take the id from params
  //and add all the fild is update
  //only validation for default address
  //and after the save the updated addres / set the value
  const { id } = req.params;
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

  if (defaultAddress !== undefined && typeof defaultAddress !== "boolean") {
    throw new ApiError(400, "defaultAddress must be a boolean");
  }
  const address = await AddressCollection.findById(id);
  if (!address) {
    throw new ApiError(404, "Address not found");
  }

  const fieldsToUpdate = {
    fullName,
    mobileNumber,
    pinCode,
    houseNumber,
    area,
    landMark,
    city,
    state,
    defaultAddress,
  };

  // Update address fields only if they are provided
  Object.keys(fieldsToUpdate).forEach((field) => {
    if (fieldsToUpdate[field] !== undefined) {
      address[field] = fieldsToUpdate[field];
    }
  });

  await address.save();

  return res
    .status(200)
    .json(new ApiResponse(200, address, "Address updated successfully"));
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

export { addAddress, getAddressesForUser, updateAddress, deleteAddress };
