import express from "express";
import userController from "../controllers/user.controller";
import { protectAdmin, protectUser } from "../middlewares/auth";

const router = express.Router();

router.route("/id/:id").get(protectAdmin, userController.getUser);
router.route("/all").get(protectAdmin, userController.getAllUsers);
router.route("/register").post(protectAdmin, userController.register);

router.route("/me").get(protectUser, userController.me);

router.route("/login").post(userController.login);

export default router;