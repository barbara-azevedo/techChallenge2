import { Autor2 } from "@/entities/autor.entities.typeorm";
import { IAutor } from "@/entities/models/autor.interface.typeorm";
import { appDataBase } from "@/lib/typeorm/typeorm";
import { Like, Repository } from "typeorm";
import { IAutorTypeormRepository } from "../autor.repository.interface.typeorm";

export class AutorTypeormRepository implements IAutorTypeormRepository {
    private repo: Repository<IAutor>
    constructor() {
        this.repo = appDataBase.getRepository(Autor2);
    }

    async createAutorTypeorm(autor: IAutor): Promise<IAutor | undefined> {
        return this.repo.save(autor);
    }

    async updateAutorTypeorm(autor: IAutor): Promise<IAutor | undefined> {
        return this.repo.save(autor);
    }

    async removeAutorTypeorm(autor: IAutor): Promise<void> {
        await this.repo.delete(autor)
    }

    async findAllAutorTypeorm(page: number, limit: number): Promise<IAutor[] | undefined> {
        return this.repo.find({
            skip: (page - 1) * limit,
            take: limit,
            order: {
                dtCriacao: "DESC",
            }
        });
    }

    async findOneAutorTypeorm(id: number): Promise<IAutor | null> {
        return this.repo.findOne({
            where: { id_autor: id }
        })
    }

    async findAutorSearchNomeTypeorm(nome: string): Promise<IAutor[] | undefined> {
        return this.repo.find({
            where: [
                {
                    nome: Like(`%${nome}%`)
                },
            ],
        });
    }
}