export interface IUsuario {
  id?: string;
  nome?: string;
  email: string;
  senha: string;
  tipoAcesso?: string;
  dtCriacao?: Date;
  dtModificacao?: Date;
}
