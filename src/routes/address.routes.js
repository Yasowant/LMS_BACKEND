import { Router } from "express";
import {
  addAddress,
  deleteAddress,
} from "../controllers/address.controller.js";

const router = Router();

router.route("/addaddress").post(addAddress);
router.route("/deleteaddress/:id").delete(deleteAddress);

export default router;
