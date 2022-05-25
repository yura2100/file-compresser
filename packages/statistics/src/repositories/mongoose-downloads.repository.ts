import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreateDownloadInput,
  DownloadOutput,
  IDownloadsRepository,
  UpdatedownloadInput,
} from '../interfaces/downloads.repository.interface';
import { Download, DownloadDocument } from '../schemas/download.schema';

export class MongooseDownloadsRepository implements IDownloadsRepository {
  constructor(
    @InjectModel(Download.name)
    private readonly downloadModel: Model<DownloadDocument>,
  ) {}

  async findById(downloadId: string): Promise<DownloadOutput | null> {
    const download = await this.downloadModel.findById(downloadId).exec();

    if (!download) {
      return null;
    }

    return {
      id: download.id,
      userId: download.userId,
      createdAt: download.createdAt,
      finishedAt: download.finishedAt,
      status: download.status,
      fileId: download.fileId,
    };
  }

  async create(input: CreateDownloadInput): Promise<string> {
    const download = await this.downloadModel.create({
      ...input,
      createdAt: new Date(),
    });
    return download.id;
  }

  async update(downloadId: string, input: UpdatedownloadInput): Promise<void> {
    await this.downloadModel.updateOne({ id: downloadId }, { ...input }).exec();
  }
}
