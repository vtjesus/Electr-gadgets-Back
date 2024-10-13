import express from "express";
import { UserController } from "./user.controller";
import { auth } from "../../middlewares/auth";
import { USER_ROLE } from "./user.constant";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidations } from "./user.validation";

const router = express.Router();

router.post("/create-user", UserController.createUser);
router.get("/", auth(USER_ROLE.admin), UserController.getAllUsers);

router.patch(
  "/change-password",
  auth(USER_ROLE.user, USER_ROLE.admin),
  UserController.changePassword
);

router.patch(
  "/:userId/role",
  auth(USER_ROLE.admin),
  UserController.updateUserRole
);
router.patch(
  "/:userId",
  auth(USER_ROLE.user),
  validateRequest(UserValidations.UpdateUser),
  UserController.updateUser
);

export const UserRoutes = router;
