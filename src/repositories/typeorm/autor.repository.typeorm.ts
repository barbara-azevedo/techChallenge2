
import { Autor } from "@/entities/autor.entities";
import { IAutor } from "@/entities/models/autor.interface";
import { appDataBase } from "@/lib/typeorm/typeorm";
import { Like, Repository } from "typeorm";
import { IAutorRepository } from "../autor.repository.interface";

export class AutorRepository implements IAutorRepository {
    private repo: Repository<IAutor>
    constructor() {
        this.repo = appDataBase.getRepository(Autor);
    }

    async createAutor(autor: IAutor): Promise<IAutor | undefined> {
        return this.repo.save(autor);
    }

    async updateAutor(autor: IAutor): Promise<IAutor | undefined> {
        return this.repo.save(autor);
    }

    async removeAutor(autor: IAutor): Promise<void> {
        await this.repo.delete(autor)
    }

    async findAllAutor(page: number, limit: number): Promise<IAutor[] | undefined> {
        return this.repo.find({
            skip: (page - 1) * limit,
            take: limit,
            order: {
                dtCriacao: "DESC",
            }
        });
    }

    async findOneAutor(id: number): Promise<IAutor | null> {
        return this.repo.findOne({
            where: { id_autor: id }
        })
    }

    async findAutorSearchNome(nome: string): Promise<IAutor[] | undefined> {
        return this.repo.find({
            where: [
                {
                    nome: Like(`%${nome}%`)
                },
            ],
        });
    }
}