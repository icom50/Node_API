import { Request, Response } from "express";
import Pokemon from "../models/pokemon";
import { Op } from 'sequelize';

export const findAllPokemons = async (req: Request, res: Response) => {
    try {
        // SEARCH BY NAME
        const limit = req.query.limit ? parseInt(req.query.limit as string) : 5
        if (req.query.name) {
            const name: string = req.query.name as string;
            if (name.length >= 2) {
                const result = await Pokemon.findAndCountAll({
                    where: {
                        name: { [Op.like]: `%${name}%` } //OPERATEUR SEQUELIZE LIKE
                    },
                    order: ["name"],
                    limit: limit
                });
                const pokemons: Pokemon[] = result.rows;
                const count: number = result.count;
                if (pokemons.length > 0) {
                    const message = `Il y a au total ${count} pokémons qui coresponde à la recherche`;
                    return res.json({ message, data: pokemons });
                } else if (pokemons.length === 0) {
                    const message = `Il n'y a aucun pokemon de ce nom dans le pokédex`;
                    return res.json({ message, data: pokemons });
                };
            }
            else {
                const message = `Le terme de recherche doit contenir au minimum  2 caractères.`;
                return res.json({ message, data: null });
            }
        }
        //SEARCH ALL
        else {
            const pokemons: Pokemon[] = await Pokemon.findAll();
            if (pokemons.length > 0) {
                const message = `La liste des ${pokemons.length} pokémons a bien été recupérée`;
                return res.json({ message, data: pokemons });
            } else if (pokemons.length === 0) {
                const message = `Il n'y a aucun pokemon dans le pokédex`;
                return res.json({ message, data: pokemons });
            };
        }
    } catch (error) {
        const message = `La liste n'a pas pu être récupérée`;
        return res.status(500).json({ message, error });
    };
};