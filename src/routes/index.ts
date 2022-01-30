import { Router } from 'express';
import auth from '../auth/auth';
import { findAllPokemons } from './findAllPokemons';
import { findPokemonByPK } from './findPokemonByPK';
import { createPokemon } from './createPokemon';
import { updatePokemon } from './updatePokemon';
import { deletePokemon } from './deletePokemon';
import { login } from './login';

export const routes = Router();

//PUBLIC ROUTE
routes.use('/api/login', login);
//PRIVATE ROUTES
routes.use('/api/pokemons/create', auth, createPokemon);
routes.use('/api/pokemons/update', auth, updatePokemon);
routes.use('/api/pokemons/delete', auth, deletePokemon);
routes.use("/api/pokemons", auth, findAllPokemons);
routes.use("/api/pokemon", auth, findPokemonByPK);

