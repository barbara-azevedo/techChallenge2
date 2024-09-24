import { IUsuario } from "@/entities/models/usuario.interface";


export interface IUsuarioRepository {
    createUsuario(usuario: IUsuario): Promise<IUsuario | undefined>
    findByUsername(email: string): Promise<IUsuario | null>
}