import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Autor } from './autor.entities';
import { IEducaOnline } from './interfaces/educaonline.interface';

export type EducaOnlineDocument = HydratedDocument<EducaOnline>;

@Schema()
export class EducaOnline implements IEducaOnline {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  id?: string;
  @Prop()
  titulo?: string;
  @Prop()
  conteudo?: string;
  @Prop({ type: mongoose.Schema.Types.Date })
  dtCriacao?: Date;
  @Prop({ type: mongoose.Schema.Types.Date })
  dtModificacao?: Date;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Autor' }] })
  autor: Autor;
}

export const EducaOnlineSchema = SchemaFactory.createForClass(EducaOnline);
