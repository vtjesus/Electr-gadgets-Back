import { TUser } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status";
import { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";
import AppError from "../../errors/AppError";
import config from "../../config";

const createUser = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

const getAllUsers = async () => {
  const users = await User.find().select("-password");
  return users;
};

// const getUserBookings = async (userId: string) => {
//   const bookings = await Booking.find({ user: userId }).populate("service");
//   return bookings;
// };

const userUpdate = async (userId: string, payload: Partial<TUser>) => {
  const user = await User.findById(userId).select("+password");
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User Not Found");
  }
  // Prevent role from being updated by the user
  const { role, ...allowedUpdates } = payload;
  // console.log(role);
  const updatedUser = await User.findByIdAndUpdate(userId, allowedUpdates, {
    new: true,
    runValidators: true,
  }).select("-password");

  return updatedUser;
};

const updateUserRole = async (userId: string, role: string) => {
  const user = await User.findByIdAndUpdate(
    userId,
    { role },
    { new: true, runValidators: true }
  );

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  return user;
};

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string }
) => {
  const user = await User.findById(userData.userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User Not Found");
  }

  // Check if the old password is correct
  const isPasswordMatched = await bcrypt.compare(
    payload.oldPassword,
    user.password
  );
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Old password is incorrect");
  }

  // Hash the new password
  const hashedPassword = await bcrypt.hash(
    payload.newPassword,
    config.salt_round as string
  );

  // Update the user's password
  user.password = hashedPassword;
  await user.save();

  return { message: "Password updated successfully" };
};

export const UserServices = {
  createUser,
  getAllUsers,
  // getUserBookings,
  updateUserRole,
  userUpdate,
  changePassword,
};
