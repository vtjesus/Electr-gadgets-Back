"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_validation_1 = require("./auth.validation");
const user_validation_1 = require("../user/user.validation");
const router = express_1.default.Router();
router.post("/signup", (0, validateRequest_1.default)(user_validation_1.UserValidations.createUser), auth_controller_1.authController.signUp);
router.post("/login", (0, validateRequest_1.default)(auth_validation_1.authValidation.loginUser), auth_controller_1.authController.login);
// router.post(
//   "/change-password",
//   auth(USER_ROLE.user, USER_ROLE.admin),
//   authController.changePassword
// );
exports.AuthRoutes = router;
