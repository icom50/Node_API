import { Request, Response } from "express";
import { ValidationError } from "sequelize";
import Pokemon from "../models/pokemon";

export const updatePokemon = async (req: Request, res: Response) => {
    try {
        const id = req.body.pokemon.id;
        await Pokemon.update(req.body.pokemon, {
            where: { id: id }
        });
        const pokemonUpdated: Pokemon | null = await Pokemon.findByPk(id)
        if (pokemonUpdated) {
            const message = `Le pokemon ${pokemonUpdated?.name} a bien été modifié`;
            return res.json({ message, data: pokemonUpdated });
        } else if (pokemonUpdated === null) {
            const message = `Le pokemon n'a pas été trouvé avec cet identifiant`;
            return res.status(404).json({ message, data: pokemonUpdated });
        };
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(400).json({ message: error.message, data: error });
        }
        else {
            const message = `Le pokemon n'a pas pu être modifié`;
            return res.status(500).json({ message, error });
        };
    };
};