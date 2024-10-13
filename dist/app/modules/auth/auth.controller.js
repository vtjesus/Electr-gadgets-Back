"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const auth_service_1 = require("./auth.service");
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = require("../../utils/catchAsync");
const config_1 = __importDefault(require("../../config"));
const signUp = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.authServices.signUp(req.body);
    res.status(http_status_1.default.OK).json({
        success: true,
        statusCode: http_status_1.default.OK,
        message: "User registered successfully",
        data: result,
    });
}));
const login = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken, accessToken, user } = yield auth_service_1.authServices.login(req.body);
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: config_1.default.NODE_ENV === "production",
    });
    res.status(http_status_1.default.OK).json({
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User Login Successfully",
        token: accessToken,
        data: user,
    });
}));
// const changePassword = catchAsync(async (req: Request, res: Response) => {
//   // const userData = req.user;
//   // const { oldPassword, newPassword } = req.body;
//   // console.log(req.userId);
//   const { ...passwordData } = req.body;
//   // Call the service function to change the password
//   // const result = await UserServices.changePassword(userData, {
//   //   oldPassword,
//   //   newPassword,
//   // });
//   const result = await authServices.changePassword(req.userId, passwordData);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "Password changed successfully",
//     data: result,
//   });
// });
exports.authController = {
    signUp,
    login,
    // changePassword
};
