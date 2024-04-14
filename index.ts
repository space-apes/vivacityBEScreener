import express, {Response, Request, NextFunction} from 'express';
import http from 'http';
import sequelizeConnection from './sequelizeConnection';
import {applicantsRouter} from './routes';

const port = process.env.EXPRESS_PORT || 80;
const app = express(); 

//add global middlewares
//should add better cors policy here
app.use([
	express.json(),
]);

//basic test route
app.get('/', (req: Request, res: Response, next: NextFunction)=>{
	return res.send('hello world!');
});

// add applicants routes
app.use('/awesome/applicants', applicantsRouter);


//generic error handling middleware
app.use((err:Error, req:Request, res: Response)=>{
	console.log(err.message);
	console.log(err.stack);
	return res.status(500).json({msg: 'server error', error: err.message})
});


const server = http.createServer(app); 


const start = async () => {
	try {

		//sync models/db 
		await sequelizeConnection.sync();

		console.log(`sequelize models synced with db`);

		//start listening for http connections
		server.listen(port, ()=>{
			console.log(`listening on port ${port}`)
		});
	}catch(err){
		console.error(err);
		process.exit(1);
	}
}

start(); 




