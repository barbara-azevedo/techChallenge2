import { IUsuario } from "@/entities/models/usuario.interface";
import { Usuario } from "@/entities/usuario.entities";
import { IUsuarioRepository } from "@/repositories/usuario.repository.interface";

export class CreateUsuarioUseCase {
    constructor(private repo: IUsuarioRepository) { }
    async handler(user: IUsuario): Promise<Usuario | undefined> {
        return this.repo.createUsuario(user)
    }
}

export class FindOneUsuarioUseCase {
    constructor(private repo: IUsuarioRepository) { }
    async handler(email: string): Promise<Usuario | null> {
        return this.repo.findByUsername(email)
    }
}