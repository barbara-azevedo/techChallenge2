export interface IUsuario {
  id?: string;
  email: string;
  senha: string;
  tipoAcesso?: string;
  dtCriacao?: Date;
  dtModificacao?: Date;
}
