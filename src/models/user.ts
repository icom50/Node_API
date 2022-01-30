import { DataTypes, Model } from 'sequelize';
import sequelizeConnection from './dbconfig';

class User extends Model {
    public id!: number;
    public userName!: string;
    public password!: string;
    public readonly created!: Date;
};
//DATATYPE + VALIDATORS
User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userName: {
        type: DataTypes.STRING(),
        unique: { name: 'userName', msg: 'The user name already exist' },
    },
    password: {
        type: DataTypes.STRING(),
    },
}, {
    timestamps: true,
    createdAt: 'created',
    updatedAt: false,
    sequelize: sequelizeConnection
});
export default User;