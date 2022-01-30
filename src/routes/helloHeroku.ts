import { Request, Response } from "express";

export const helloHeroku = async (req: Request, res: Response) => {
    try {
        const message = `Hello Heroku`;
        return res.json({ message });
    } catch (error) {
        const message = `La liste n'a pas pu être récupérée`;
        return res.status(500).json({ message, error });
    };
};