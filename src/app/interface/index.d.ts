import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      userId: JwtPayload;
      user: JwtPayload;
      name: JwtPayload;
    }
  }
}