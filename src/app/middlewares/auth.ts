import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../modules/user/user.model";
import { USER_ROLE } from "../modules/user/user.constant";
import { catchAsync } from "../utils/catchAsync";
import AppError from "../errors/AppError";
import config from "../config";


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

export const auth = (...requiredRoles: (keyof typeof USER_ROLE)[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.headers.authorization;

    if (!accessToken || !accessToken.startsWith("Bearer ")) {
      throw new AppError(401, "You are not authorized to access this route");
    }

    const token = accessToken.split(" ")[1];

    const verifiedToken = jwt.verify(
      token as string,
      config.jwt_access_secret as string
    );

    // console.log('Verified Token Payload:', verifiedToken); // Log the token payload

    const { role, userId, email, name } = verifiedToken as JwtPayload;

    // console.log('Extracted Name:', name); // Log the name to ensure it is extracted

    const user = await User.findById(userId);

    if (!user || !email) {
      throw new AppError(401, "User not found");
    }

    if (!requiredRoles.includes(role)) {
      throw new AppError(401, "You are not authorized to access this route");
    }

    req.userId = userId;
    req.name = name;
    req.user = user;

    next();
  });
};
