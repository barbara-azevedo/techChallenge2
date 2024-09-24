import { IUsuario } from "@/entities/models/usuario.interface";
import { Usuario } from "@/entities/usuario.entities";
import { appDataBase } from "@/lib/typeorm/typeorm";
import { Repository } from "typeorm";
import { IUsuarioRepository } from "../usuario.repository.interface";


export class UsuarioRepository implements IUsuarioRepository {

    private repo: Repository<IUsuario>
    constructor() {
        this.repo = appDataBase.getRepository(Usuario);
    }

    async createUsuario(usuario: IUsuario): Promise<IUsuario | undefined> {
        return this.repo.save(usuario);
    }

    async findByUsername(email: string): Promise<IUsuario | null> {
        return this.repo.findOne({
            where: { email: email }
        })
    }
}