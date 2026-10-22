import type { NextFunction, Request, Response } from "express";
import { AuthService } from "./auth.service";


export class AuthController {
    static async register(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body
            if (!email || !password) {
                res.status(400).json({ success: false, message: "email or Password required " })
                return
            }
            const registerResult = await AuthService.register(email, password)
            res.status(201).json({ success: true, message: "user registered successfully", data: registerResult })

        } catch (error) {
            res.status(400).json({ success: false, message: "Something while wrong while registering" })
        }
    }

    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body
            if (!email || !password) {
                res.status(400).json({ success: false, message: "email or password required" })
                return
            }
            const loginrResult = await AuthService.login(email, password)
            res.status(200).json({ success: true, message: "User loggedIn Successfully", data: loginrResult })
        } catch (error) {
            res.status(400).json({ success: false, message: "someting went wrong while logging-in" })
        }
    }
}