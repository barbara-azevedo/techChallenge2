
import { IAutor } from "@/entities/models/autor.interface";
import { IAutorRepository } from "@/repositories/autor.repository.interface";
import { ResourcesNotFoundErrors } from "./erros/resource-not-found-erros";

export class CreateAutorUseCase {
    constructor(private repo: IAutorRepository) { }
    async handler(autor: IAutor): Promise<IAutor | undefined> {
        autor.dtCriacao = new Date();
        autor.dtModificacao = new Date();
        const p = await this.repo.createAutor(autor);
        if (!p)
            throw new ResourcesNotFoundErrors();
        return p;
    }
}

export class UpdateAutorUseCase {
    constructor(private repo: IAutorRepository) { }
    async handler(autor: IAutor): Promise<IAutor | undefined> {
        autor.dtModificacao = new Date();
        return this.repo.updateAutor(autor);
    }
}

export class RemoveAutorUseCase {
    constructor(private repo: IAutorRepository) { }
    async handler(autor: IAutor): Promise<void> {
        await this.repo.removeAutor(autor);
    }
}

export class FindAllAutorUseCase {
    constructor(private repo: IAutorRepository) { }
    async handler(page: number, limit: number): Promise<IAutor[] | undefined> {
        return this.repo.findAllAutor(page, limit);
    }
}

export class FindOneAutorUseCase {
    constructor(private repo: IAutorRepository) { }
    async handler(id: number): Promise<IAutor | null> {
        return this.repo.findOneAutor(id);
    }
}

export class FindSearchAutorUseCase {
    constructor(private repo: IAutorRepository) { }
    async handler(search: string): Promise<IAutor[] | undefined> {
        return this.repo.findAutorSearchNome(search);
    }
}