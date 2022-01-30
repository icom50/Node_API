import { Request, Response } from "express";
import User from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { custom_private_key } from "./../auth/private_key";

export const login = async (req: Request, res: Response) => {
    try {
        const user: User | null = await User.findOne({ where: { userName: req.body.userName } });
        if (user) {
            const auth: boolean = await bcrypt.compare(req.body.password, user.password);
            if (auth) {
                const token: string = jwt.sign(
                    { userId: user.id },
                    custom_private_key,
                    { expiresIn: '24h' }
                );
                const message = `The user ${user?.userName} has been retrieved`;
                return res.json({ message, data: user, token });
            }
            else {
                const message = `The password is not correct`;
                return res.status(404).json({ message, data: {} });
            };
        } else if (user === null) {
            const message = `The userName doesn't exist`;
            return res.status(404).json({ message, data: {} });
        };
    } catch (error) {
        const message = `The user cannot be connected: ${error}`;
        return res.status(500).json({ message, error });
    };
};