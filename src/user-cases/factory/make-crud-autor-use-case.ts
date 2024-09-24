import { AutorRepository } from "@/repositories/typeorm/autor.repository.typeorm";
import {
    CreateAutorUseCase,
    FindAllAutorUseCase,
    FindOneAutorUseCase,
    FindSearchAutorUseCase,
    RemoveAutorUseCase,
    UpdateAutorUseCase
} from "../autor.user.case.typeorm";

export function MakeCreateAutor() {
    const repo = new AutorRepository;
    const createAutorUseCase = new CreateAutorUseCase(repo);
    return createAutorUseCase;
}

export function MakeUpdateAutor() {
    const repo = new AutorRepository();
    const updateAutorUseCase = new UpdateAutorUseCase(repo);
    return updateAutorUseCase;
}

export function MakeRemoverAutor() {
    const repo = new AutorRepository();
    const removeAutorUseCase = new RemoveAutorUseCase(repo);
    return removeAutorUseCase;
}

export function MakeFindAlldAutor() {
    const repo = new AutorRepository();
    const findAllAutorUseCase = new FindAllAutorUseCase(repo);
    return findAllAutorUseCase;
}

export function MakeFindIdAutor() {
    const repo = new AutorRepository();
    const findIdAutorUseCase = new FindOneAutorUseCase(repo);
    return findIdAutorUseCase;
}

export function MakeFindSearchdAutor() {
    const repo = new AutorRepository();
    const findSearchAutorUseCase = new FindSearchAutorUseCase(repo);
    return findSearchAutorUseCase;
}