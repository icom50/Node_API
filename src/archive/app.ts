// import express, { Application, Request, Response } from 'express';
// import morgan from 'morgan';
// import favicon from 'serve-favicon'
// import pokemons from './src/datas/mock-pokemon';
// import { Pokemon } from "./src/models/pokemon";
// import initDB from "./src/sequelize";
// import { success, getUniquePokemonId } from "./src/helper";

// //USE INTERMEDIAIRE VARIABLE FOR CHANGE THE IMPOT LIST
// let pokemonList: Pokemon[] = pokemons;

// const success = (message: string, data: any) => {
//     return { message, data }
// };

// const app: Application = express();
// const port: number = 3000;

// //SYNCHRO DB
// initDB();

// //MIDDLEWARES
// app
//     .use(favicon(__dirname + '/src/assets/favicon.ico'))
//     .use(morgan('dev'))
//     //GET JSON PARAMS
//     .use(express.urlencoded({ extended: true }))
//     .use(express.json());

// //ROUTING
// //ACCUEIL
// app.get('/', (req: Request, res: Response) => res.send(`Page d'accueil`));
// //RETRIEVE POKEMONS LIST
// app.get('/api/pokemons', (req: Request, res: Response) => {
//     if (pokemonList?.length > 0) {
//         const message: string = `Il y a au total ${pokemonList?.length} pokemons`;
//         res.json(success(message, pokemonList));
//     }
//     else {
//         const message: string = "Aucun pokémon n'a été trouvé.";
//         res.status(404).json(success(message, []));
//     }
// });
// //RETRIEVE A POKEMON
// app.get('/api/pokemons/:id', (req: Request, res: Response) => {
//     const id: number = parseInt(req.params.id);
//     const pokemon: Pokemon | undefined = pokemonList.find((pokemon: Pokemon) => pokemon.id === id);
//     if (pokemon) {
//         const message: string = "Un pokemon a bien été trouvé.";
//         res.json(success(message, pokemon));
//     }
//     else {
//         const message: string = "Le pokémon n'a pas été trouvé.";
//         res.status(404).json(success(message, pokemon));
//     }
// });
// //INSERT POKEMON IN THE LIST
// app.post('/api/pokemons', (req, res) => {
//     const id = getUniquePokemonId(pokemonList);
//     const pokemonInserted: Pokemon = { ...req.body.pokemon, ...{ id: id, created: new Date() } };
//     pokemonList.push(pokemonInserted);
//     const message: string = `Le pokemon ${pokemonInserted?.name} a bien été créé.`;
//     res.json(success(message, pokemonInserted));
// });
// //UPDATE POKEMON IN THE LIST
// app.put('/api/pokemons/:id', (req, res) => {
//     const id: number = parseInt(req.params.id);
//     const dateCreation: Date = pokemonList.filter((pokemon: Pokemon) => pokemon.id === id)[0]?.created;
//     const pokemonUpdated: Pokemon = { ...req.body.pokemon, ...{ id: id, created: dateCreation } };
//     pokemonList = pokemonList.map((pokemon: Pokemon) => {
//         return pokemon.id === id ? pokemonUpdated : pokemon;
//     });
//     const message: string = `Le pokemon ${pokemonUpdated?.name} a bien été modifié.`;
//     res.json(success(message, pokemonUpdated));
// });
// //DELETE POKEMON IN THE LIST
// app.delete('/api/pokemons/:id', (req, res) => {
//     const id: number = parseInt(req.params.id);
//     const pokemonDeleted: Pokemon | undefined = pokemonList.find((pokemon: Pokemon) => pokemon.id === id);
//     if (pokemonDeleted) {
//         pokemonList = pokemonList.filter((pokemon: Pokemon) => pokemon.id !== id);
//         const message: string = `Le pokemon ${pokemonDeleted?.name} a bien été supprimé.`;
//         res.json(success(message, pokemonDeleted));
//     }
//     else {
//         const message: string = "Le pokémon n'a pas été trouvé.";
//         res.status(404).json(success(message, pokemonDeleted));
//     }
// });

// app.listen(port, () => console.log(`The application is on : http://localhost:${port}`));