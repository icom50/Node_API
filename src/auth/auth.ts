import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { custom_private_key } from "./private_key"

const auth = (req: Request, res: Response, next: NextFunction) => {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
        const message: string = "No authentification jeton, you have to login to the app";
        return res.status(404).send({ message: message, data: {} });
    }
    else if (authorizationHeader) {
        const token = authorizationHeader.split(' ')[1];
        jwt.verify(token, custom_private_key, (error: jwt.VerifyErrors | null, data: string | jwt.JwtPayload | undefined) => {
            if (!error) {
                if (data) {
                    const decodedToken = jwt.decode(token) as { userId: string };
                    if (req.body.userId && req.body.userId !== decodedToken.userId) {
                        const message: string = "The user authetification is not valid";
                        return res.status(404).send({ message: message });
                    } else {
                        next();
                    };
                };
            }
            else if (error) {
                const message: string = "No authentification jeton, you have to login to the app";
                return res.status(404).send({ message: message, data: {} });
            };
        })
    };
};
export default auth;