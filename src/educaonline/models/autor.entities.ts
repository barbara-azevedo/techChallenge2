import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { IAutor } from './interfaces/autor.interface';

export type AutorDocument = HydratedDocument<Autor>;

@Schema()
export class Autor implements IAutor {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  id?: string;
  @Prop()
  nome?: string;
  @Prop({ type: mongoose.Schema.Types.Date })
  dtCriacao?: Date;
  @Prop({ type: mongoose.Schema.Types.Date })
  dtModificacao?: Date;
}

export const AutorSchema = SchemaFactory.createForClass(Autor);
