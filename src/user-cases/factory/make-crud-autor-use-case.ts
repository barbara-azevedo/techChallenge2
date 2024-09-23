import { AutorRepository } from "@/repositories/autor.repository";
import { CreateAutorUseCase, FindAllAutorUseCase, FindIdAutorUseCase, FindSearchAutorUseCase, RemoveAutorUseCase, UpdateAutorUseCase } from "../autor.user.case";

export function MakeCrudCreateAutor() {
    const repo = new AutorRepository();
    const createAutorUseCase = new CreateAutorUseCase(repo);
    return createAutorUseCase;
}

export function MakeCrudUpdateAutor() {
    const repo = new AutorRepository();
    const updateAutorUseCase = new UpdateAutorUseCase(repo);
    return updateAutorUseCase;
}

export function MakeCrudRemoverAutor() {
    const repo = new AutorRepository();
    const removeAutorUseCase = new RemoveAutorUseCase(repo);
    return removeAutorUseCase;
}

export function MakeCrudFindIdAutor() {
    const repo = new AutorRepository();
    const findIdAutorUseCase = new FindIdAutorUseCase(repo);
    return findIdAutorUseCase;
}

export function MakeCrudFindAlldAutor() {
    const repo = new AutorRepository();
    const findAllAutorUseCase = new FindAllAutorUseCase(repo);
    return findAllAutorUseCase;
}

export function MakeCrudFindSearchdAutor() {
    const repo = new AutorRepository();
    const findSearchAutorUseCase = new FindSearchAutorUseCase(repo);
    return findSearchAutorUseCase;
}