import express, { Application } from 'express';
import morgan from 'morgan';
import favicon from 'serve-favicon';
import compression from 'compression';
import initDB from "./src/sequelize";
import { findAllPokemons } from './src/routes/findAllPokemons';
import { findPokemonByPK } from './src/routes/findPokemonByPK';
import { createPokemon } from './src/routes/createPokemon';
import { updatePokemon } from './src/routes/updatePokemon';
import { deletePokemon } from './src/routes/deletePokemon';

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

//ROUTINGS
findAllPokemons(app);
findPokemonByPK(app);
createPokemon(app);
updatePokemon(app);
deletePokemon(app);

//ERROR URL INVALD
app.use(({ res }) => {
    if (res) {
        const message: string = "The URL is not valid.";
        res.status(404).json({ message });
    };
});

app.listen(port, () => console.log(`The application is on : http://localhost:${port}`));