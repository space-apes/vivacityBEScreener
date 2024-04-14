import {Request, Response, NextFunction} from 'express';
import sequelizeConnection from '../sequelizeConnection';
import { Console } from 'console';


const create = async (req: Request, res: Response, next: NextFunction) => {

   
    //if i had more time i would use more robust validation and error handling flow
    if (!req.body.name || !req.body.age || !req.body.favBoardGame){
        return res.status(400).json({msg: 'missing required fields'})
    }

    try {
        const Applicants = sequelizeConnection.models.Applicant;
        
        const newApplicant = Applicants.build({
            name: req.body.name,
            age: req.body.age,
            favBoardGame: req.body.favBoardGame
        });

        await newApplicant.save();

        return res.status(201).json({msg: 'applicant successfully created', id: newApplicant.dataValues.id});
    //for now throw generic errors to generic error handling middleware
    }catch(err){
        next(err);
    }
}



const getById = async (req: Request, res: Response, next: NextFunction) => {



    if (Number.isNaN(parseInt(req.params.id))){
        return res.status(400).json({msg: 'need id'})
    }

    const pk: number = parseInt(req.params.id);

    try {

        const Applicants = sequelizeConnection.models.Applicant;
        
        const applicant = await Applicants.findByPk(pk);

        if(!applicant){
            return res.status(404).json({msg: 'not found'})
        }

        return res.status(200).json(applicant.dataValues)
    }catch(err){
        next(err);
    }
}

const getAll = async (req: Request, res: Response, next: NextFunction) => {
    
    try {
        const Applicants = sequelizeConnection.models.Applicant; 
        
        const applicantsArr = (await Applicants.findAll()).map(app=>app.dataValues);

        return res.status(200).json({msg: 'retrieved all applicants', applicants: applicantsArr})
    }catch(err){
        next(err);
    }
}

const update = async (req: Request, res: Response, next: NextFunction) => {
    
    if (Number.isNaN(parseInt(req.params.id))){
        return res.status(400).json({msg: 'need id'})
    }

    if(req.body.age && Number.isNaN(parseInt(req.body.age))){
        return res.status(400).json({msg:'age needs to be numeric'})
    }

    const pk: number = parseInt(req.params.id);
   

    try {
        const Applicants = sequelizeConnection.models.Applicant; 
        
        let applicant = await Applicants.findByPk(pk);

        
        if(!applicant){
            return res.status(404).json({msg: 'not found'})
        }

        for (let field of ['name', 'age', 'favBoardGame']){
            if (req.body[field] && applicant.dataValues[field] != req.body[field]){
                applicant.set(field, req.body[field]);
            }
        }

        //save will not occur unless a field was updated
        await applicant.save()

        return res.status(200).json({msg: 'updated applicant', applicant: applicant})
    }catch(err){
        next(err);
    }
}

const deleteApplicant = async (req: Request, res: Response, next: NextFunction) => {

    if (Number.isNaN(parseInt(req.params.id))){
        return res.status(400).json({msg: 'need id'})
    }

    const pk: number = parseInt(req.params.id);

    try{
        const Applicants = sequelizeConnection.models.Applicant; 
        
        const rowDeleteCount: number = await Applicants.destroy({
            where: {
                id: pk
            }
        });

        if (rowDeleteCount == 0){
            return res.status(404).json({msg: 'no known applicant with that id'})
        }

        return res.status(200).json({msg: 'applicant deleted'});
    }catch(err){
        next(err);
    }
}


export {create, getById, getAll, update, deleteApplicant};