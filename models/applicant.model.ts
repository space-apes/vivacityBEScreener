import {Table, Column, Model } from 'sequelize-typescript';

@Table({timestamps: true})
class Applicant extends Model {
    @Column
    declare name: string; 

    @Column
    declare age: number;

    @Column
    declare favBoardGame: string; 

}

export default Applicant;