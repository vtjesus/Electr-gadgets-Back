import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from "bcrypt";

export const isPasswordMatched = async (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
  return isMatch;
};



export const createToken = (
  jwtPayload: { userId: string; role: string },
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};