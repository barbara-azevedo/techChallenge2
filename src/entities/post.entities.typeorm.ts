import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IPost } from "./models/post.interface.typeorm";

@Entity({
    name: "post2"
})
export class Post2 implements IPost {

    @PrimaryGeneratedColumn('increment', {
        name: 'id_post'
    })
    id_post?: number;

    @Column({
        name: 'titulo',
        type: 'varchar'
    })
    titulo?: string;

    @Column({
        name: 'conteudo',
        type: 'varchar'
    })
    conteudo?: string;

    @Column({
        name: 'dt_criacao',
        type: 'timestamp without time zone',
        default: () => 'CURRENT_TIMESTAMP'
    })
    dtCriacao?: Date;

    @Column({
        name: 'dt_modificacao',
        type: 'timestamp without time zone',
        default: () => 'CURRENT_TIMESTAMP'
    })
    dtModificacao?: Date;

    @Column({
        name: 'id_autor',
        type: 'int'
    })
    id_autor!: number;

    constructor() { }
}