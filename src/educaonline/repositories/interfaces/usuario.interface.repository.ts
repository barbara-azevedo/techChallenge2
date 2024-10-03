import { IUsuario } from '../../models/interfaces/usuario.interface';

export abstract class IUsuarioRepository {
  abstract getOneUser(email: IUsuario): Promise<IUsuario>;
  abstract createUser(user: IUsuario): Promise<void>;
  abstract updateUser(user: IUsuario): Promise<void>;
}
