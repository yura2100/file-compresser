import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { DownloadStatus } from '../types';

export type DownloadDocument = Download & Document;

@Schema()
export class Download {
  @Prop({ type: String, required: true })
  userId!: string;

  @Prop({ type: Date, required: true })
  createdAt!: Date;

  @Prop({ type: Date, required: false, default: null })
  finishedAt!: Date | null;

  @Prop({
    type: String,
    required: false,
    enum: [
      DownloadStatus.STARTED,
      DownloadStatus.FINISHED,
      DownloadStatus.CANCELLED,
    ],
    default: DownloadStatus.STARTED,
  })
  status!: DownloadStatus;

  @Prop({ type: String, required: true })
  fileId!: string;
}

export const DownloadSchema = SchemaFactory.createForClass(Download);
