import express, { Application } from 'express';
import morgan from 'morgan';
import favicon from 'serve-favicon';
import compression from 'compression';
import initDB from "./src/sequelize";
import { routes } from './src/routes';
import { findAllPokemons } from './src/routes/findAllPokemons';

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

// findAllPokemons(app);

try {
    app.use('', routes);

} catch (e) {
    console.log("Error on Express Node > ", e);
}

//ERROR URL INVALD
app.use(({ res }) => {
    if (res) {
        const message: string = "The URL is not valid.";
        res.status(404).json({ message });
    };
});

app.listen(port, () => console.log(`The application is on : http://localhost:${port}`));