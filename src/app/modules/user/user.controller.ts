import { Request, Response } from "express";
import httpStatus from "http-status";
import { UserServices } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.createUser(req.body);

  res.status(httpStatus.OK).json({
    success: true,
    message: "User is created successfully",
    data: result,
  });
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const users = await UserServices.getAllUsers();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users retrieved successfully",
    data: users,
  });
});

// const getUserBookings = catchAsync(async (req: Request, res: Response) => {
//   const { userId } = req.params;
//   const bookings = await UserServices.getUserBookings(userId);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "User bookings retrieved successfully",
//     data: bookings,
//   });
// });

const updateUserRole = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { role } = req.body;

  const user = await UserServices.updateUserRole(userId, role);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User role updated successfully",
    data: user,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const user = await UserServices.userUpdate(userId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User updated successfully",
    data: user,
  });
});

const changePassword = catchAsync(async (req: Request, res: Response) => {
  const userData = req.user;
  console.log(req.user);
  const { oldPassword, newPassword } = req.body;
  const { ...passwordData } = req.body;

  // Call the service function to change the password
  // const result = await UserServices.changePassword(userData, {
  //   oldPassword,
  //   newPassword,
  // });

  const result = await UserServices.changePassword(req.user, passwordData);


  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Password changed successfully",
    data: result,
  });
});

export const UserController = {
  createUser,
  getAllUsers,
  // getUserBookings,
  updateUserRole,
  updateUser,
  changePassword,
};
