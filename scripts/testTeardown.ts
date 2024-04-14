import sequelizeConnection from '../sequelizeConnection';



const testTeardown = async () => {
    await sequelizeConnection.close();
}

export default testTeardown;



