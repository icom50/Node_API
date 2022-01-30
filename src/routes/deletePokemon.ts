import { Request, Response } from "express";
import Pokemon from "../models/pokemon";

export const deletePokemon = async (req: Request, res: Response) => {
    try {
        const id = req.body.pokemon.id;
        const pokemonDeleted: Pokemon | null = await Pokemon.findByPk(id);
        if (pokemonDeleted) {
            await Pokemon.destroy({
                where: { id: id }
            });
            const message: string = `Le pokemon ${pokemonDeleted?.name} a été supprimé.`
            return res.json({ message, data: pokemonDeleted });
        }
        else if (pokemonDeleted === null) {
            const message = `Le pokemon n'a été trouvé avec cet identifiant`;
            return res.status(404).json({ message, data: pokemonDeleted });
        };
    } catch (error) {
        const message = `Le pokemon n'a pas pu être supprimé`;
        return res.status(500).json({ message, data: error });
    };
};