import { authServices } from "./auth.service";
import httpStatus from "http-status";
import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import config from "../../config";

const signUp = catchAsync(async (req, res) => {
  const result = await authServices.signUp(req.body);

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: "User registered successfully",
    data: result,
  });
});

const login = catchAsync(async (req, res) => {
  const { refreshToken, accessToken, user } = await authServices.login(
    req.body
  );

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: config.NODE_ENV === "production",
  });

  res.status(httpStatus.OK).json({
    statusCode: httpStatus.OK,
    success: true,
    message: "User Login Successfully",
    token: accessToken,
    data: user,
  });
});

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

export const authController = {
  signUp,
  login,
  // changePassword
};
