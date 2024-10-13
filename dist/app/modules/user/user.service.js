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
exports.UserServices = void 0;
const user_model_1 = require("./user.model");
const http_status_1 = __importDefault(require("http-status"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const config_1 = __importDefault(require("../../config"));
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.create(payload);
    return result;
});
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.User.find().select("-password");
    return users;
});
// const getUserBookings = async (userId: string) => {
//   const bookings = await Booking.find({ user: userId }).populate("service");
//   return bookings;
// };
const userUpdate = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(userId).select("+password");
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User Not Found");
    }
    // Prevent role from being updated by the user
    const { role } = payload, allowedUpdates = __rest(payload, ["role"]);
    // console.log(role);
    const updatedUser = yield user_model_1.User.findByIdAndUpdate(userId, allowedUpdates, {
        new: true,
        runValidators: true,
    }).select("-password");
    return updatedUser;
});
const updateUserRole = (userId, role) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findByIdAndUpdate(userId, { role }, { new: true, runValidators: true });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    return user;
});
const changePassword = (userData, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(userData.userId);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User Not Found");
    }
    // Check if the old password is correct
    const isPasswordMatched = yield bcrypt_1.default.compare(payload.oldPassword, user.password);
    if (!isPasswordMatched) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "Old password is incorrect");
    }
    // Hash the new password
    const hashedPassword = yield bcrypt_1.default.hash(payload.newPassword, config_1.default.salt_round);
    // Update the user's password
    user.password = hashedPassword;
    yield user.save();
    return { message: "Password updated successfully" };
});
exports.UserServices = {
    createUser,
    getAllUsers,
    // getUserBookings,
    updateUserRole,
    userUpdate,
    changePassword,
};
