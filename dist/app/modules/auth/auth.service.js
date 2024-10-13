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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authServices = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_status_1 = __importDefault(require("http-status"));
const user_model_1 = require("../user/user.model");
const auth_util_1 = require("./auth.util");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const config_1 = __importDefault(require("../../config"));
const signUp = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userExist = yield user_model_1.User.findOne({ email: payload.email }).select("+password");
    if (userExist) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "User already exists");
    }
    payload.role = "user";
    const result = yield user_model_1.User.create(payload);
    // console.log("New User:", result);
    const _a = result.toObject(), { password } = _a, userWithoutPassword = __rest(_a, ["password"]);
    return userWithoutPassword;
});
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
const login = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ email: payload.email }).select("+password");
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User Not Found");
    }
    // console.log("User retrieved from DB:", user); // Check the user object
    const passwordMatch = yield (0, auth_util_1.isPasswordMatched)(payload.password, user.password);
    if (!passwordMatch) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Password Not Matched");
    }
    const jwtPayload = {
        userId: user._id,
        name: user.name, // This should be set correctly
        email: user.email,
        role: user.role,
    };
    // console.log("JWT Payload:", jwtPayload); // Ensure this includes the name
    const accessToken = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.jwt_access_secret, {
        expiresIn: config_1.default.jwt_access_expires_in,
    });
    // console.log("Generated Access Token:", accessToken); // Inspect the generated token
    const refreshToken = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.jwt_refresh_secret, {
        expiresIn: config_1.default.jwt_refresh_expires_in,
    });
    const _a = user.toObject(), { password } = _a, userWithoutPassword = __rest(_a, ["password"]);
    return {
        accessToken,
        refreshToken,
        user: userWithoutPassword,
    };
});
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
exports.authServices = {
    signUp,
    login,
    // changePassword,
};
