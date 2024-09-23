import { IAutor } from "@/entities/models/autor.interface.typeorm";
import { IAutorTypeormRepository } from "@/repositories/autor.repository.interface.typeorm";
import { ResourcesNotFoundErrors } from "./erros/resource-not-found-erros";

export class CreateAutorTypeormUseCase {
    constructor(private repo: IAutorTypeormRepository) { }
    async handler(autor: IAutor): Promise<IAutor | undefined> {
        autor.dtCriacao = new Date();
        autor.dtModificacao = new Date();
        const p = await this.repo.createAutorTypeorm(autor);
        if (!p)
            throw new ResourcesNotFoundErrors();
        return p;
    }
}

export class UpdateAutorTypeormUseCase {
    constructor(private repo: IAutorTypeormRepository) { }
    async handler(autor: IAutor): Promise<IAutor | undefined> {
        autor.dtModificacao = new Date();
        return this.repo.updateAutorTypeorm(autor);
    }
}

export class RemoveAutorTypeormUseCase {
    constructor(private repo: IAutorTypeormRepository) { }
    async handler(autor: IAutor): Promise<void> {
        await this.repo.removeAutorTypeorm(autor);
    }
}

export class FindAllAutorTypeormUseCase {
    constructor(private repo: IAutorTypeormRepository) { }
    async handler(page: number, limit: number): Promise<IAutor[] | undefined> {
        return this.repo.findAllAutorTypeorm(page, limit);
    }
}

export class FindOneAutorTypeormUseCase {
    constructor(private repo: IAutorTypeormRepository) { }
    async handler(id: number): Promise<IAutor | null> {
        return this.repo.findOneAutorTypeorm(id);
    }
}


export class FindSearchAutorTypeormUseCase {
    constructor(private repo: IAutorTypeormRepository) { }
    async handler(search: string): Promise<IAutor[] | undefined> {
        return this.repo.findAutorSearchNomeTypeorm(search);
    }
}