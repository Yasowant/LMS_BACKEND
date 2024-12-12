import { Router } from "express";
import {
  addAddress,
  deleteAddress,
  getAddressesForUser,
} from "../controllers/address.controller.js";

const router = Router();

router.route("/addaddress").post(addAddress);
router.route("/deleteaddress/:id").delete(deleteAddress);
router.route("/user/:userId/addresses").get(getAddressesForUser);

export default router;
