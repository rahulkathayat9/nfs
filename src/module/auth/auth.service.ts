import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from '../../prisma/db';

const JWT_SECRET_TOKEN = process.env.JSON_WEB_TOKEN || '';

export class AuthService {
    static async register(email: string, password: string, name?: string) {
        const isUserExisting = await db.orm.public.User.where({ email }).first();
        if (isUserExisting) {
            throw new Error("User already exists")
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await db.orm.public.User.create({
            email,
            password: hashedPassword,
            name: name ?? null
        })

        const jwt_sign = jwt.sign({ userId: user.id }, JWT_SECRET_TOKEN, { expiresIn: '7d' })
        return {
            user: {
                userId: user.id, userName: user.name, userEmail: user.email,
            }, token: jwt_sign
        }
    }

    static async login(email: string, password: string) {
        const getUser = await db.orm.public.User.where({ email }).first();
        if (!getUser) {
            throw new Error("Invalid Email-address")
        }
        const getPassword = await bcrypt.compare(password, getUser.password)
        if (!getPassword) {
            throw new Error("Invalid Password")
        }
        const jwt_sign = jwt.sign({ userId: getUser.id }, JWT_SECRET_TOKEN, { expiresIn: '7d' })
        return {
            user: { userId: getUser.id, userEmail: getUser.email, userName: getUser.name },
            token: jwt_sign
        }
    }
}
