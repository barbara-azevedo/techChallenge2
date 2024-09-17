import { Person } from "@/entities/person.entities";
import { Usuario } from "@/entities/usuario.entities";
import { UsuarioRepo } from "@/repositories/user.repo";

export class FindWithPersonUserCase {

    constructor(private userRepo: UsuarioRepo) { }

    async handler(userId: number): Promise<Usuario & Person | undefined> {
        return this.userRepo.findWithPerson(userId);
    }
}