/* eslint-disable @typescript-eslint/no-unused-vars */
import jwt, { JwtPayload } from "jsonwebtoken";
import httpStatus from "http-status";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import { TUser } from "../user/user.interface";
import { createToken, isPasswordMatched } from "./auth.util";
import AppError from "../../errors/AppError";
import config from "../../config";

const signUp = async (payload: TUser) => {
  const userExist = await User.findOne({ email: payload.email }).select(
    "+password"
  );
  if (userExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User already exists");
  }
  payload.role = "user";
  const result = await User.create(payload);

  // console.log("New User:", result);

  const { password, ...userWithoutPassword } = result.toObject();

  return userWithoutPassword;
};

// const login = async (payload: TLoginUser) => {
//   const user = await User.findOne({ email: payload.email }).select("+password");
//   if (!user) {
//     throw new AppError(httpStatus.NOT_FOUND, "User Not Found");
//   }

//   const passwordMatch = await isPasswordMatched(
//     payload.password,
//     user.password
//   );

//   if (!passwordMatch) {
//     throw new AppError(httpStatus.NOT_FOUND, "Password Not Matched");
//   }

//   const jwtPayload = {
//     userId: user._id,
//     name: user.name,
//     email: user.email,
//     role: user.role,
//   };

//   console.log(jwtPayload)

//   const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
//     expiresIn: config.jwt_access_expires_in,
//   });

//   const refreshToken = jwt.sign(
//     jwtPayload,
//     config.jwt_refresh_secret as string,
//     {
//       expiresIn: config.jwt_refresh_expires_in,
//     }
//   );

//   const { password, ...userWithoutPassword } = user.toObject();

//   return {
//     accessToken,
//     refreshToken,
//     user: userWithoutPassword,
//   };
// };

const login = async (payload: TLoginUser) => {
  const user = await User.findOne({ email: payload.email }).select("+password");
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User Not Found");
  }

  // console.log("User retrieved from DB:", user); // Check the user object

  const passwordMatch = await isPasswordMatched(
    payload.password,
    user.password
  );

  if (!passwordMatch) {
    throw new AppError(httpStatus.NOT_FOUND, "Password Not Matched");
  }

  const jwtPayload = {
    userId: user._id,
    name: user.name, // This should be set correctly
    email: user.email,
    role: user.role,
  };

  // console.log("JWT Payload:", jwtPayload); // Ensure this includes the name

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: config.jwt_access_expires_in,
  });

  // console.log("Generated Access Token:", accessToken); // Inspect the generated token

  const refreshToken = jwt.sign(
    jwtPayload,
    config.jwt_refresh_secret as string,
    {
      expiresIn: config.jwt_refresh_expires_in,
    }
  );

  const { password, ...userWithoutPassword } = user.toObject();

  return {
    accessToken,
    refreshToken,
    user: userWithoutPassword,
  };
};

// const changePassword = async (
//   userId: JwtPayload,
//   payload: { oldPassword: string; newPassword: string }
// ) => {
//   const user = await User.findById(userId);
//   console.log(user);
//   if (!user) {
//     throw new AppError(httpStatus.NOT_FOUND, "User Not Found");
//   }

//   // Check if the old password is correct
//   const isPasswordMatched = await bcrypt.compare(
//     payload.oldPassword,
//     user.password
//   );
//   if (!isPasswordMatched) {
//     throw new AppError(httpStatus.UNAUTHORIZED, "Old password is incorrect");
//   }

//   // Hash the new password
//   const hashedPassword = await bcrypt.hash(
//     payload.newPassword,
//     Number(config.salt_round)
//   );

//   // Update the user's password
//   user.password = hashedPassword;
//   await user.save();

//   console.log(user.password);

//   await User.findOneAndUpdate(
//     {
//       userId,
//     },
//     {
//       password: hashedPassword,
//     }
//   );

//   return { message: "Password updated successfully" };
// };

// const changePassword = async (
//   userId: JwtPayload,
//   payload: { oldPassword: string; newPassword: string }
// ) => {
//   const user = await User.findById(userId);
//   console.log(user);
//   if (!user) {
//     throw new AppError(httpStatus.NOT_FOUND, "User Not Found");
//   }

//   // Check if the old password is correct
//   // const isPasswordMatched = await bcrypt.compare(
//   //   payload.oldPassword,
//   //   user.password
//   // );
//   const passwordMatched = await isPasswordMatched(
//     payload.oldPassword,
//     user.password
//   );

//   console.log(passwordMatched);

//   if (!passwordMatched) {
//     throw new AppError(httpStatus.UNAUTHORIZED, "Old password is incorrect");
//   }

//   // Hash the new password
//   const hashedPassword = await bcrypt.hash(
//     payload.newPassword,
//     Number(config.salt_round)
//   );

//   console.log(hashedPassword, user.password);

//   // Update the user's password and save
//   await User.findOneAndUpdate(
//     {
//       userId,
//     },
//     {
//       password: hashedPassword,
//     }
//   );

//   return { message: "Password updated successfully" };
// };

// const forgetPassword = async (userId: string) => {
//   // checking if the user is exist
//   const user = await User.findById(userId);

//   if (!user) {
//     throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
//   }

//   const jwtPayload = {
//     userId: user.id,
//     role: user.role,
//   };

//   const resetToken = createToken(
//     jwtPayload,
//     config.jwt_access_secret as string,
//     '10m',
//   );

//   const resetUILink = `${config.reset_pass_ui_link}?id=${user.id}&token=${resetToken} `;

//   sendEmail(user.email, resetUILink);

//   console.log(resetUILink);
// };

// const resetPassword = async (
//   payload: { id: string; newPassword: string },
//   token: string,
// ) => {
//   // checking if the user is exist
//   const user = await User.findById(payload?.id);

//   if (!user) {
//     throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
//   }

//   const decoded = jwt.verify(
//     token,
//     config.jwt_access_secret as string,
//   ) as JwtPayload;

//   //localhost:3000?id=A-0001&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJBLTAwMDEiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDI4NTA2MTcsImV4cCI6MTcwMjg1MTIxN30.-T90nRaz8-KouKki1DkCSMAbsHyb9yDi0djZU3D6QO4

//   if (payload.id !== decoded.userId) {
//     console.log(payload.id, decoded.userId);
//     throw new AppError(httpStatus.FORBIDDEN, 'You are forbidden!');
//   }

//   //hash new password
//   const newHashedPassword = await bcrypt.hash(
//     payload.newPassword,
//     Number(config.salt_round),
//   );

//   await User.findOneAndUpdate(
//     {
//       id: decoded.userId,
//     },
//     {
//       password: newHashedPassword,
//     },
//   );
// };

export const authServices = {
  signUp,
  login,
  // changePassword,
};
