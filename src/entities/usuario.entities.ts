import { Column, Entity, PrimaryColumn } from "typeorm";
import { IUsuario } from "./models/usuario.interface";

@Entity({
    name: 'usuario'
})
export class Usuario implements IUsuario {
    @PrimaryColumn({
        name: 'email',
        type: 'varchar'
    })
    email: string;

    @Column({
        name: 'senha',
        type: 'varchar'
    })
    senha: string;

    constructor(email: string, senha: string) {
        this.email = email;
        this.senha = senha;
    }
}