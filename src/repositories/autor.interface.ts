import { Autor } from "@/entities/autor.entities";

export interface IAutorRepository {
    update({ id_autor, nome }: Autor): Promise<Autor | undefined>
    createAutor({ nome }: Autor): Promise<Autor | undefined>
    remove(id: number): Promise<Autor | undefined>
    findAllAutor(): Promise<Autor[] | undefined>
    findAutorId(autorId: number): Promise<Autor | undefined>;
    findAutorSearchNome(search: string): Promise<Autor[] | undefined>;
}