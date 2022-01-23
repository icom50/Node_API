import { Application, Request, Response } from "express";
import Pokemon from "../models/pokemon";

export const findPokemonByPK = (app: Application) => {
    app.get('/api/pokemons/:id', async (req: Request, res: Response) => {
        try {
            const pokemon: Pokemon | null = await Pokemon.findByPk(req.params.id);
            if (pokemon) {
                const message = `Le pokemon ${pokemon?.name} a bien été trouvé`;
                return res.json({ message, data: pokemon });
            } else if (pokemon === null) {
                const message = `Le pokemon n'a été trouvé avec cet identifiant`;
                return res.status(404).json({ message, data: pokemon });
            };
        } catch (error) {
            const message = `Le pokemon n'a pas pu être récupérée`;
            return res.status(500).json({ message, error });
        };
    });
};