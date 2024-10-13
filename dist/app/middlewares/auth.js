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
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../modules/user/user.model");
const catchAsync_1 = require("../utils/catchAsync");
const AppError_1 = __importDefault(require("../errors/AppError"));
const config_1 = __importDefault(require("../config"));
// export const auth = (...requiredRoles: (keyof typeof USER_ROLE)[]) => {
//   return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//     const accessToken = req.headers.authorization;
//     if (!accessToken || !accessToken.startsWith("Bearer ")) {
//       throw new AppError(401, "You are not authorized to access this route");
//     }
//     const token = accessToken.split(" ")[1];
//     const verifiedToken = jwt.verify(
//       token as string,
//       config.jwt_access_secret as string
//     );
//     console.log(verifiedToken);
//     const { role, userId, email, name } = verifiedToken as JwtPayload;
//     const user = await User.findById(userId);
//     if (!user || !email) {
//       throw new AppError(401, "User not found");
//     }
//     if (!requiredRoles.includes(role)) {
//       throw new AppError(401, "You are not authorized to access this route");
//     }
//     req.userId = userId;
//     req.name = name;
//     next();
//   });
// };
const auth = (...requiredRoles) => {
    return (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const accessToken = req.headers.authorization;
        if (!accessToken || !accessToken.startsWith("Bearer ")) {
            throw new AppError_1.default(401, "You are not authorized to access this route");
        }
        const token = accessToken.split(" ")[1];
        const verifiedToken = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_secret);
        // console.log('Verified Token Payload:', verifiedToken); // Log the token payload
        const { role, userId, email, name } = verifiedToken;
        // console.log('Extracted Name:', name); // Log the name to ensure it is extracted
        const user = yield user_model_1.User.findById(userId);
        if (!user || !email) {
            throw new AppError_1.default(401, "User not found");
        }
        if (!requiredRoles.includes(role)) {
            throw new AppError_1.default(401, "You are not authorized to access this route");
        }
        req.userId = userId;
        req.name = name;
        req.user = user;
        next();
    }));
};
exports.auth = auth;
