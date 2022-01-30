import pokemons from "./datas/mock-pokemon";
import types from "./datas/mock-types";
import sequelizeConnection from "./models/dbconfig";
import Pokemon from "./models/pokemon";
import Type from "./models/type";
import User from "./models/user";
import bcrypt from 'bcrypt';

const initDB = async () => {
    //CONNEXION TO DB:
    try {
        await sequelizeConnection.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    };
    //SYNC DB
    try {
        await sequelizeConnection.sync({ force: true });
        for (let i = 0; i < types.length; i++) {
            await Type.create({
                name: types[i]?.name,
            });
        };
        for (let i = 0; i < pokemons.length; i++) {
            await Pokemon.create({
                name: pokemons[i]?.name,
                hp: pokemons[i]?.hp,
                cp: pokemons[i]?.cp,
                picture: pokemons[i]?.picture,
                types: pokemons[i]?.types,
                created: pokemons[i]?.created
            });
        };
        const passwordHashed: string = await bcrypt.hash('root', 10);
        await User.create({
            userName: 'romainhaas@hotmail.be',
            password: passwordHashed,
        });
        console.log('The pokédex has been synchronized successfully.');
    } catch (error) {
        console.error('Unable synchronize sequelize to database:', error);
    };
};
export default initDB