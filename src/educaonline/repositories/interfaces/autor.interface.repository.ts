import { IAutor } from 'src/educaonline/models/interfaces/autor.interface';

export abstract class IAutorRepository {
  abstract getAllAutor(limit: number, page: number): Promise<IAutor[]>;
  abstract getOneAutor(autorId: string): Promise<IAutor>;
  abstract getAllAutorSearch(search: string): Promise<IAutor[]>;
  abstract createAutor(autor: IAutor): Promise<void>;
  abstract updateAutor(autorId: string, autor: IAutor): Promise<void>;
  abstract deleteAutor(autorId: string): Promise<void>;
  abstract getFindAutorSearch(search: string): Promise<IAutor[]>;
}
