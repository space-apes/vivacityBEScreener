import express, {Router} from 'express';
import {
    create,
    getById,
    getAll,
    update,
    deleteApplicant
} from './controllers/applicantsController';



//applicants router 
const applicantsRouter: Router = express.Router();

applicantsRouter.post('/', create);
applicantsRouter.get('/:id', getById);
applicantsRouter.get('/', getAll);
applicantsRouter.put('/:id', update);
applicantsRouter.delete('/:id', deleteApplicant);



export {applicantsRouter};