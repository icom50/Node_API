import { DataTypes, Model } from 'sequelize';
import sequelizeConnection from './dbconfig';
import Type from './type';

class Pokemon extends Model {
    public id!: number;
    public name!: string;
    public hp!: number;
    public cp!: number;
    public picture!: string;
    public types!: string[] | string;
    public readonly created!: Date;
};
//DATATYPE + VALIDATORS
Pokemon.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(),
        allowNull: false,
        unique: { name: 'name', msg: 'The name of pokemon already exist' },
        validate: {
            notNull: { msg: "Name is required." },
            notEmpty: { msg: "Name cannot be empty." },
            len: { args: [1, 25], msg: "The name cannot exceed 25 characters." },
        }
    },
    hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: { msg: "Hp have to be a number." },
            notNull: { msg: "Hp is required." },
            min: { args: [0], msg: "Hp is required." },
            max: { args: [999], msg: "Hp is required." }
        }
    },
    cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: { msg: "Cp have to be a number." },
            notNull: { msg: "Cp is required." },
            min: { args: [0], msg: "Hp is required." },
            max: { args: [99], msg: "Hp is required." }
        }
    },
    picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isUrl: { msg: "Picture have to be an url." },
            notNull: { msg: "Picture is required." }
        }
    },
    types: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            //CUSTOM VALIDATOR
            async isTypesValid(value: string) {
                if (!value) throw new Error('The pokemon have to be a type');
                if (value.split(',').length > 2) throw new Error('The Pokemon cannot have more than 3 types');
                //CHECK IF THE TYPE EXIST IN DB
                const types: Type[] = await Type.findAll();
                value.split(',').forEach((type: string) => {
                    if (!types.some((typeDB: Type) => typeDB?.name === type)) throw new Error('The type is invalid');
                });
            }
        },
        get() {
            const types = this.getDataValue('types');
            return typeof types === 'string' ? types.split(',') : types;
        },
        set(types: string[]) {
            this.setDataValue('types', typeof types === 'string' ? types : types.join());
        }
    }
}, {
    timestamps: true,
    createdAt: 'created',
    updatedAt: false,
    sequelize: sequelizeConnection
});
export default Pokemon;