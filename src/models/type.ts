import { DataTypes, Model } from 'sequelize';
import sequelizeConnection from './dbconfig';

class Type extends Model {
    public id!: number;
    public name!: string;
    public readonly created!: Date;
}
//DATATYPE + VALIDATORS
Type.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(),
        allowNull: false,
        unique: true,
    },
}, {
    timestamps: true,
    createdAt: 'created',
    updatedAt: false,
    sequelize: sequelizeConnection
});
export default Type;