import { Sequelize } from 'sequelize'

const dbName = 'pokedex';
const dbUser = 'root'
const dbHost = 'localhost'
const dbDriver = 'mysql'
const dbPassword = 'root'

const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: dbDriver,
    logging: false,
    dialectOptions: {
        timezone: 'local'
    }
});
export default sequelizeConnection