import express, { Application } from 'express';
import morgan from 'morgan';
import favicon from 'serve-favicon';
import compression from 'compression';
import initDB from "./src/sequelize";
import { login } from './src/routes/login';
import auth from './src/auth/auth';
import { createPokemon } from './src/routes/createPokemon';
import { updatePokemon } from './src/routes/updatePokemon';
import { deletePokemon } from './src/routes/deletePokemon';
import { findAllPokemons } from './src/routes/findAllPokemons';
import { findPokemonByPK } from './src/routes/findPokemonByPK';

const app: Application = express();
const port: number = 3000;

//MIDDLEWARES
app
    //FAV ICON
    .use(favicon(__dirname + '/src/assets/favicon.ico'))
    //LOG
    .use(morgan('dev'))
    //COMPRESSION JSON
    .use(compression())
    //GET JSON PARAMS
    .use(express.urlencoded({ extended: true }))
    .use(express.json());

//SYNCHRO DB
initDB();

//PUBLIC ROUTE
app.use('/api/login', login);
//PRIVATE app
app.use('/api/pokemons/create', auth, createPokemon);
app.use('/api/pokemons/update', auth, updatePokemon);
app.use('/api/pokemons/delete', auth, deletePokemon);
app.use("/api/pokemons", auth, findAllPokemons);
app.use("/api/pokemon", auth, findPokemonByPK);

//ERROR URL INVALD
app.use(({ res }) => {
    if (res) {
        const message: string = "The URL is not valid.";
        res.status(404).json({ message });
    };
});

app.listen(port, () => console.log(`The application is on : http://localhost:${port}`));