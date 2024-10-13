"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const auth_1 = require("../../middlewares/auth");
const user_constant_1 = require("./user.constant");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_validation_1 = require("./user.validation");
const router = express_1.default.Router();
router.post("/create-user", user_controller_1.UserController.createUser);
router.get("/", (0, auth_1.auth)(user_constant_1.USER_ROLE.admin), user_controller_1.UserController.getAllUsers);
router.patch("/change-password", (0, auth_1.auth)(user_constant_1.USER_ROLE.user, user_constant_1.USER_ROLE.admin), user_controller_1.UserController.changePassword);
router.patch("/:userId/role", (0, auth_1.auth)(user_constant_1.USER_ROLE.admin), user_controller_1.UserController.updateUserRole);
router.patch("/:userId", (0, auth_1.auth)(user_constant_1.USER_ROLE.user), (0, validateRequest_1.default)(user_validation_1.UserValidations.UpdateUser), user_controller_1.UserController.updateUser);
exports.UserRoutes = router;
