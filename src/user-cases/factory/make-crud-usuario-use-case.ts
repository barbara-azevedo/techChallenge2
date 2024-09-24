import { UsuarioRepository } from "@/repositories/typeorm/usuario.repository";
import { CreateUsuarioUseCase, FindOneUsuarioUseCase } from "../usuario-use-case";

export function MakeCreateUsuarioUseCase() {
    const repo = new UsuarioRepository();
    const createUsuarioUseCase = new CreateUsuarioUseCase(repo);
    return createUsuarioUseCase;
}

export function MakeFindOneUsuarioUseCase() {
    const repo = new UsuarioRepository();
    const findOneUsuarioUseCase = new FindOneUsuarioUseCase(repo);
    return findOneUsuarioUseCase;
}