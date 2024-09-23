import { AutorTypeormRepository } from "@/repositories/typeorm/autor.repository.typeorm";
import { CreateAutorTypeormUseCase, FindAllAutorTypeormUseCase, FindOneAutorTypeormUseCase, FindSearchAutorTypeormUseCase, RemoveAutorTypeormUseCase, UpdateAutorTypeormUseCase } from "../autor.user.case.typeorm";


export function MakeCrudCreateAutorTypeorm() {
    const repo = new AutorTypeormRepository;
    const createAutorUseCase = new CreateAutorTypeormUseCase(repo);
    return createAutorUseCase;
}

export function MakeCrudUpdateAutorTypeorm() {
    const repo = new AutorTypeormRepository();
    const updateAutorUseCase = new UpdateAutorTypeormUseCase(repo);
    return updateAutorUseCase;
}

export function MakeCrudRemoverAutorTypeorm() {
    const repo = new AutorTypeormRepository();
    const removeAutorUseCase = new RemoveAutorTypeormUseCase(repo);
    return removeAutorUseCase;
}

export function MakeCrudFindAlldAutorTypeorm() {
    const repo = new AutorTypeormRepository();
    const findAllAutorUseCase = new FindAllAutorTypeormUseCase(repo);
    return findAllAutorUseCase;
}

export function MakeCrudFindIdAutorTypeorm() {
    const repo = new AutorTypeormRepository();
    const findIdAutorUseCase = new FindOneAutorTypeormUseCase(repo);
    return findIdAutorUseCase;
}

export function MakeCrudFindSearchdAutorTypeorm() {
    const repo = new AutorTypeormRepository();
    const findSearchAutorUseCase = new FindSearchAutorTypeormUseCase(repo);
    return findSearchAutorUseCase;
}