import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { IUsuario } from './interfaces/usuario.interface';

export type UsuraioDocument = HydratedDocument<Usuario>;

@Schema()
export class Usuario implements IUsuario {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  id: string;

  @Prop()
  email: string;
  @Prop()
  senha: string;
  @Prop({ type: mongoose.Schema.Types.Date })
  dtCriacao?: Date;
  @Prop({ type: mongoose.Schema.Types.Date })
  dtModificacao?: Date;
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
