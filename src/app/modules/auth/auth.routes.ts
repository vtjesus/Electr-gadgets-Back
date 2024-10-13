import express from "express";
import { authController } from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import { authValidation } from "./auth.validation";
import { UserValidations } from "../user/user.validation";
import { auth } from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.post(
  "/signup",
  validateRequest(UserValidations.createUser),
  authController.signUp
);

router.post(
  "/login",
  validateRequest(authValidation.loginUser),
  authController.login
);

// router.post(
//   "/change-password",
//   auth(USER_ROLE.user, USER_ROLE.admin),
//   authController.changePassword
// );


export const AuthRoutes = router;
