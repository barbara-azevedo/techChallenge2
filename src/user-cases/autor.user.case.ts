import { Autor } from "@/entities/autor.entities";
import { IAutorRepository } from "@/repositories/autor.interface";
import { ResourcesNotFoundErrors } from "./erros/resource-not-found-erros";

export class CreateAutorUseCase {
    constructor(private repo: IAutorRepository) { }
    async handler(Autor: Autor): Promise<Autor | undefined> {
        const p = await this.repo.createAutor(Autor);
        if (!p)
            throw new ResourcesNotFoundErrors();
        return p;
    }
}

export class UpdateAutorUseCase {
    constructor(private repo: IAutorRepository) { }
    async handler(autor: Autor): Promise<Autor | undefined> {
        return this.repo.update(autor);
    }
}

export class RemoveAutorUseCase {
    constructor(private repo: IAutorRepository) { }
    async handler(id: number): Promise<Autor | undefined> {
        return this.repo.remove(id);
    }
}

export class FindAllAutorUseCase {
    constructor(private repo: IAutorRepository) { }
    async handler(): Promise<Autor[] | undefined> {
        return this.repo.findAllAutor();
    }
}

export class FindIdAutorUseCase {
    constructor(private repo: IAutorRepository) { }
    async handler(id_autor: number): Promise<Autor | undefined> {
        const p = await this.repo.findAutorId(id_autor);
        if (!p) throw new ResourcesNotFoundErrors();
        return p;
    }
}

export class FindSearchAutorUseCase {
    constructor(private repo: IAutorRepository) { }
    async handler(search: string): Promise<Autor[] | undefined> {
        return this.repo.findAutorSearchNome(search);
    }
}