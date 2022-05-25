import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { FileMeta } from '../types';

export type FileDocument = File & Document;

@Schema()
export class File {
  @Prop({ type: String, required: true })
  userId!: string;

  @Prop({ type: Date, required: true })
  createdAt!: Date;

  @Prop(
    raw({
      size: { type: Number, required: true },
      mime: { type: String, required: true },
      name: { type: String, required: true },
      link: { type: String, required: true },
      key: { type: String, required: true },
    }),
  )
  meta!: FileMeta;
}

export const FileSchema = SchemaFactory.createForClass(File);
