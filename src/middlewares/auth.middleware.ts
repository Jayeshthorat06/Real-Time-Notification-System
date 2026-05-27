import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

/**
 * JWT Payload Interface
 */
interface AuthUserPayload {
  id: number;
  email: string;
  role: string;
}

/**
 * Custom Request Interface
 */
export interface CustomRequest extends Request {
  user?: AuthUserPayload;
}

/**
 * Auth Middleware
 */
export const authMiddleware = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {

  const authHeader = req.headers.authorization;

  /**
   * Check Authorization Header
   */
  if (
    !authHeader ||
    !authHeader.startsWith("Bearer ")
  ) {
    res.status(401).json({
      success: false,
      message: "Authorization token missing",
    });

    return;
  }

  /**
   * Extract Token
   */
  const token = authHeader.split(" ")[1];

  try {

    /**
     * Verify JWT
     */
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as AuthUserPayload;

    /**
     * Attach User To Request
     */
    req.user = decoded;

    next();

  } catch (error) {

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });

  }
};