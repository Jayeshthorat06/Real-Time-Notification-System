import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { CustomRequest } from "../middlewares/auth.middleware";

interface CreateUserPayload {
    name: string;
    email: string;
    password: string;
}

interface LoginUserPayload {
    email: string;
    password: string;
}

export const hashPassword = async (
    plainPassword: string
): Promise<string> => {
    return await bcrypt.hash(plainPassword, 10);
};

const checkPassword = async (
    plainPassword: string,
    hashedPassword: string
): Promise<boolean> => {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    return isMatch; // true if correct, false otherwise
};

export async function createUser(data: CreateUserPayload) {

    const existingUser = await User.findOne({
        where: {
            email: data.email,
        },
    });

    if (existingUser) {
        throw new Error("Email already exists");
    }

    const hashedPassword = await hashPassword(data.password);

    const result = await User.create({
        name: data.name,
        email: data.email,
        password: hashedPassword,
    });

    return result;
}

export async function loginwithtokenUser(
    data: LoginUserPayload
) {

    const existingUser: any = await User.findOne({
        where: {
            email: data.email,
        },
    });

    if (!existingUser) {
        throw new Error("User not found");
    }

    const check = await checkPassword(
        data.password,
        existingUser.password
    );

    if (!check) {
        throw new Error("Incorrect Password");
    }

    /**
     * Generate JWT Token
     */
    const token = jwt.sign(
        {
            id: existingUser.id,
            email: existingUser.email,
            role: existingUser.role,
        },
        process.env.JWT_SECRET!,
        {
            expiresIn: "1h",
        }
    );

    return {
        token,
        user: {
            id: existingUser.id,
            name: existingUser.name,
            email: existingUser.email,
            role: existingUser.role,
        },
    };
}

export async function fetchUser(id: number) {

    const existingUser = await User.findOne({
        where: {
            id: id,
        },

        attributes: {
            exclude: ["password"],
        },
    });

    if (!existingUser) {
        throw new Error("User does not exist");
    }

    return existingUser;
}

export async function fetchAllUser() {

    const existingUser = await User.findAll({
        attributes: {
            exclude: ["password"],
        },
    });

    return existingUser;
}
