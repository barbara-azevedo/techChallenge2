import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IAutor } from "./models/autor.interface";

@Entity({
    name: 'autor'
})
export class Autor implements IAutor{

    @PrimaryGeneratedColumn('increment', {
        name: 'id_autor'
    })
    id_autor?: number | undefined;

    @Column({
        name: 'nome',
        type: 'varchar'
    })
    nome?: string;

    @Column({
        name: 'dt_criacao',
        type: 'timestamp without time zone',
        default: ()=>'CURRENT_TIMESTAMP'
    })
    dtCriacao?: Date;

    @Column({
        name: 'dt_modificacao',
        type: 'timestamp without time zone',
        default: ()=>'CURRENT_TIMESTAMP'
    })
    dtModificacao?: Date;

    constructor() {
    }
}