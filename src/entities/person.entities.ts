export class Person {
    id?: number
    cpf: string | undefined
    name: string | undefined
    bith: Date | undefined
    email: string | undefined
    usuario_id?: number

    constructor(id: number, cpf: string, name: string, bith: Date, email: string, usuario_id: number) {
        this.id = id;
        this.cpf = cpf;
        this.name = name;
        this.bith = bith;
        this.email = email;
        this.usuario_id = usuario_id;
    }
}