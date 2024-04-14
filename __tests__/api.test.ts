import supertest from 'supertest';
import express from 'express';
import { applicantsRouter } from '../routes';

const app = express(); 

app.use([
    express.json(),
]);

//attach applicants routes
app.use('/awesome/applicants', applicantsRouter);



describe('/applicants routes', ()=>{
    describe ('POST /applicants', ()=>{
        describe('if given all required fields: 1', ()=>{
            it('should respond 201 and response should contain id ', async ()=>{
                
                const res = await supertest(app)
                .post('/awesome/applicants')
                .set('content-type', 'application/json')
                .send({
                    name: 'brian',
                    age: 41,
                    favBoardGame: 'munchkin'
                });


                expect(res.status).toBe(201);
                expect(res.body).toHaveProperty('id');
                expect(res.body.id > 0);
            });
        });

        describe('if given all required fields: 2', ()=>{
            it('should respond 201 and response should contain id ', async ()=>{
                
                const res = await supertest(app)
                .post('/awesome/applicants')
                .set('content-type', 'application/json')
                .send({
                    name: 'jane',
                    age: 34,
                    favBoardGame: 'uno'
                });


                expect(res.status).toBe(201);
                expect(res.body).toHaveProperty('id');
                expect(res.body.id > 0);
            });
        });

        describe('if missing a required fields', ()=>{
            it('should respond 400', async ()=>{
                
                const res = await supertest(app)
                .post('/awesome/applicants')
                .set('content-type', 'application/json')
                .send({
                    age: 41,
                    favBoardGame: 'munchkin'
                });

                expect(res.status).toBe(400);
            });
        });
    });

    describe ('GET /applicants/:id', ()=>{
        describe('if given valid id', ()=>{
            it('should return 200 and response should data fields of applicant ', async ()=>{
                
                const res = await supertest(app)
                .get('/awesome/applicants/1')
                .set('content-type', 'application/json')


                expect(res.status).toBe(200);
                expect(res.body).toHaveProperty('id');
                expect(res.body).toHaveProperty('name');
                expect(res.body).toHaveProperty('favBoardGame');
                expect(res.body).toHaveProperty('age');
            });
        });

        describe('if given non numeric id', ()=>{
            it('should respond 400', async ()=>{
                
                const res = await supertest(app)
                .get('/awesome/applicants/hi')
                .set('content-type', 'application/json')


                expect(res.status).toBe(400);
            });
        });
    });

    describe ('GET /applicants', ()=>{
        describe('given correctly formed request', ()=>{
            it('should return 200 and response should contain more than 1 applicant', async ()=>{
                
                const res = await supertest(app)
                .get('/awesome/applicants')
                .set('content-type', 'application/json')


                expect(res.status).toBe(200);
                expect(res.body).toHaveProperty('applicants');
                expect(res.body.applicants.length > 1);
                expect(res.body.applicants[0]).toHaveProperty('id');
                expect(res.body.applicants[0]).toHaveProperty('name');
                expect(res.body.applicants[1]).toHaveProperty('favBoardGame');
                expect(res.body.applicants[1]).toHaveProperty('age');
            });
        });

        describe('if given non numeric id', ()=>{
            it('should respond 400', async ()=>{
                
                const res = await supertest(app)
                .get('/awesome/applicants/hi')
                .set('content-type', 'application/json')


                expect(res.status).toBe(400);
            });
        });
    });



    describe ('PUT /applicants/:id', ()=>{
        describe('given correctly formed request to existing resource', ()=>{
            it('should return 200 and respond with all fields', async ()=>{
                
                const res = await supertest(app)
                .put('/awesome/applicants/1')
                .set('content-type', 'application/json')
                .send({age: 42, name: 'potatoMaster'})


                expect(res.status).toBe(200);
                expect(res.body).toHaveProperty('applicant');

                expect(res.body.applicant).toHaveProperty
                expect(res.body.applicant).toHaveProperty('name');
                expect(res.body.applicant).toHaveProperty('favBoardGame');
                expect(res.body.applicant).toHaveProperty('age');
                expect(res.body.applicant.age).toBe(42);
                expect(res.body.applicant.name).toBe('potatoMaster');
                expect(res.body.applicant.favBoardGame).toBe('munchkin');
            });
        });

        describe('if given non numeric id', ()=>{
            it('should respond 400', async ()=>{
                
                const res = await supertest(app)
                .put('/awesome/applicants/hi')
                .set('content-type', 'application/json')
                .send({age: 42, name: 'potatoMaster'})


                expect(res.status).toBe(400);
            });
        });

        describe('if given a id of applicant that does not exist', ()=>{
            it('should respond 404', async ()=>{
                
                const res = await supertest(app)
                .put('/awesome/applicants/231231')
                .set('content-type', 'application/json')
                .send({age: 42, name: 'potatoMaster'})


                expect(res.status).toBe(404);
            });
        });
    });

    describe ('DELETE /applicants/:id', ()=>{
        describe('given a valid existing applicant it', ()=>{
            it('should respond 200. GET with same id should respond 404', async ()=>{
                
                const deleteRes = await supertest(app)
                .delete('/awesome/applicants/1')
                .set('content-type', 'application/json');


                expect(deleteRes.status).toBe(200);
                expect(deleteRes.body).toHaveProperty('msg');

                const getRes = await supertest(app)
                .get('/awesome/applicants/1')
                .set('content-type', 'application/json');

                expect(getRes.status).toBe(404);
            });
        });

        describe('given non-numeric id', ()=>{
            it('should respond 400', async ()=>{
                const res = await supertest(app)
                .delete('/awesome/applicants/hi')
                .set('content-type', 'application/json');

                expect(res.status).toBe(400);
            });
        });

        describe('given id of non existent applicant', ()=>{
            it('should respond 404', async ()=>{
                const res = await supertest(app)
                .delete('/awesome/applicants/123141414')
                .set('content-type', 'application/json');

                expect(res.status).toBe(404);
            });

        });
    });
});

