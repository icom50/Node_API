import { Application, Request, Response } from "express";
import Pokemon from "../models/pokemon";

export const findAllPokemons = (app: Application) => {
    app.get('/api/pokemons', async (req: Request, res: Response) => {
        try {
            const pokemons: Pokemon[] = await Pokemon.findAll();
            if (pokemons.length > 0) {
                const message = `La liste des ${pokemons.length} pokémons a bien été recupérée`;
                return res.json({ message, data: pokemons });
            } else if (pokemons.length === 0) {
                const message = `Il n'y a aucun pokemon dans le pokédex`;
                return res.json({ message, data: pokemons });
            };
        } catch (error) {
            const message = `La liste n'a pas pu être récupérée`;
            return res.status(500).json({ message, error });
        };
    });
};