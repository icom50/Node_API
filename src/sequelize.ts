import pokemons from "./datas/mock-pokemon";
import types from "./datas/mock-types";
import sequelizeConnection from "./models/dbconfig";
import Pokemon from "./models/pokemon";
import Type from "./models/type";

const initDB = async () => {
    //CONNEXION TO DB:
    try {
        await sequelizeConnection.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    };
    //SYNC DB
    await sequelizeConnection.sync({ force: true });
    console.log('The pokédex has been synchronized successfully.');
    for (let i = 0; i < types.length; i++) {
        await Type.create({
            name: types[i]?.name,
        });
    }
    for (let i = 0; i < pokemons.length; i++) {
        await Pokemon.create({
            name: pokemons[i]?.name,
            hp: pokemons[i]?.hp,
            cp: pokemons[i]?.cp,
            picture: pokemons[i]?.picture,
            types: pokemons[i]?.types,
            created: pokemons[i]?.created
        });
    }
    // types.forEach(async (type: Type) => {
    //     await Type.create({
    //         name: type?.name,
    //     });
    // });
    // pokemons.forEach(async (pokemon: Pokemon) => {
    //     await Pokemon.create({
    //         name: pokemon?.name,
    //         hp: pokemon?.hp,
    //         cp: pokemon?.cp,
    //         picture: pokemon?.picture,
    //         types: pokemon?.types,
    //         created: pokemon?.created
    //     });
    // });
};
export default initDB