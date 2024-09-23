import { IAutor } from "@/entities/models/autor.interface.typeorm";


export interface IAutorTypeormRepository {
    createAutorTypeorm(autor: IAutor): Promise<IAutor | undefined>
    updateAutorTypeorm(autor: IAutor): Promise<IAutor | undefined>
    removeAutorTypeorm(autor: IAutor): Promise<void>
   
    findAllAutorTypeorm(page: number, limit: number): Promise<IAutor[] | undefined>
    findOneAutorTypeorm(id: number): Promise<IAutor | null>
    findAutorSearchNomeTypeorm(nome: string): Promise<IAutor[] | undefined>
}