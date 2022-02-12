import express from "express";
import busController from "../controllers/bus.controller";
import { protectAdmin, protectUser } from "../middlewares/auth";

const router = express.Router();

router.route("/create").post(protectAdmin, busController.createBus);
router.route("/delete/:id").delete(protectAdmin, busController.deleteBus);

router.route("/get-all").get(busController.getAll);
router.route("/get/:id").get(busController.get);
router.route("/post-passenger/:id").post(busController.postPassenger);

router.route("/post-location/:id").post(protectUser, busController.postLocation);

export default router;