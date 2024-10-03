import { IAutor } from './autor.interface';

export interface IEducaOnline {
  id?: string;
  titulo?: string;
  conteudo?: string;
  dtCriacao?: Date;
  dtModificacao?: Date;
  autor: IAutor;
}
