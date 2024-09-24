import { IUsuarioRepository } from "@/repositories/usuario.repository.interface";
import { InvalidCrendtialsError } from "./erros/invalid-creadential-error";

export class SigninUseCase {
    constructor(private readonly repo: IUsuarioRepository) { }
    async handler(email: string) {
        const user = await this.repo.findByUsername(email);
        if (!user)
            throw new InvalidCrendtialsError();

        return user;
    }
}