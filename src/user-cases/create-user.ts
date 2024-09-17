import { Usuario } from "@/entities/usuario.entities";
import { UsuarioRepo } from "@/repositories/user.repo";

export class CreateUsuarioUseCase {

    constructor(private repo: UsuarioRepo) { }
    async handler(user: Usuario): Promise<Usuario | undefined> {
        return this.repo.create(user);
    }

}