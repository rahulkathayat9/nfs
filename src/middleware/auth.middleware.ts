import type { Request, Response, NextFunction } from "express";
import Jwt from "jsonwebtoken";

const JWT_SECRET_TOKEN = process.env.JWT_SECRET_TOKEN || '';

export interface AuthMiddlewareProps extends Request {
    user?: { userId: number }
}

const authMiddleware = (req: AuthMiddlewareProps, res: Response, next: NextFunction) => {
    const bearerToken = req.headers.authorization;

    if (!bearerToken?.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: "Authorization token is required" })
    }

    const token = bearerToken?.split(' ')[1]
    try {
        const decodeBearerToken = Jwt.verify(token!, JWT_SECRET_TOKEN) as { userId: number }
        req.user = decodeBearerToken;
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: "Invalid or expired token" })
    }
}

export default authMiddleware