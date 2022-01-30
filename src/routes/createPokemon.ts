import { Request, Response } from "express";
import { ValidationError } from "sequelize";
import Pokemon from "../models/pokemon";

export const createPokemon = async (req: Request, res: Response) => {
    try {
        const pokemonCreated = await Pokemon.create(req.body.pokemon);
        const message = `Le pokemon ${pokemonCreated?.name} a bien été créé`;
        return res.json({ message, data: pokemonCreated });
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(400).json({ message: error.message, data: error });
        }
        else {
            const message = `Le pokemon n'a pas pu être créé`;
            return res.status(500).json({ message, data: error });
        };
    };
};