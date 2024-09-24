import { IAutor } from "@/entities/models/autor.interface"

export interface IAutorRepository {
    createAutor(autor: IAutor): Promise<IAutor | undefined>
    updateAutor(autor: IAutor): Promise<IAutor | undefined>
    removeAutor(autor: IAutor): Promise<void>
   
    findAllAutor(page: number, limit: number): Promise<IAutor[] | undefined>
    findOneAutor(id: number): Promise<IAutor | null>
    findAutorSearchNome(nome: string): Promise<IAutor[] | undefined>
}