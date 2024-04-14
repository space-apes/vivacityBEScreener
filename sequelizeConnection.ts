import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
dotenv.config();

const sequelizeConnection = new Sequelize({
    database: process.env.POSTGRES_DATABASE,
    dialect: 'postgres',
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    models: [__dirname + '/models/*.model.ts']
});

export default sequelizeConnection;