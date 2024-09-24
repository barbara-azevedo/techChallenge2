import { UsuarioRepository } from "@/repositories/typeorm/usuario.repository";
import { SigninUseCase } from "../sign-use-case";


export function MakeSignUserCase() {
    const repo = new UsuarioRepository();
    const findOneUsuarioUseCase = new SigninUseCase(repo);
    return findOneUsuarioUseCase;
}