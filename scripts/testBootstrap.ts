import pg from 'pg';
import dotenv from 'dotenv';
import sequelizeConnection from '../sequelizeConnection';
dotenv.config();



const testBootStrap = async () => {
    try {

        const {Client} = pg; 
        const client = new Client({
            user: process.env.POSTGRES_USER,
            host: process.env.POSTGRES_HOST,
            database: process.env.POSTGRES_DATABASE,
            password: process.env.POSTGRES_PASSWORD,
            port: parseInt(process.env.POSTGRES_PORT as string) 

        });
        
        await client.connect();


        const dbResponse = await client.query(`
        DROP TABLE IF EXISTS "Applicants" CASCADE;
        `);

        await client.end();

    
        await sequelizeConnection.sync();

        await sequelizeConnection.close();

    }catch(err){
        console.log(err);
    }
}

export default testBootStrap;



