import { Router } from "express";
import {
  addAddress,
  deleteAddress,
  getAddressesForUser,
  updateAddress,
} from "../controllers/address.controller.js";

const router = Router();

router.route("/addaddress").post(addAddress);
router.route("/user/:userId/addresses").get(getAddressesForUser);
router.route("/deleteaddress/:id").delete(deleteAddress);
router.route("/updateaddress/:id").put(updateAddress);

export default router;
