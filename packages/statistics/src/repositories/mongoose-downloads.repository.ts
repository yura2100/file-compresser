import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreateDownloadInput,
  DownloadOutput,
  FindManyDownloadsInput,
  IDownloadsRepository,
  UpdatedownloadInput,
} from '../interfaces/downloads.repository.interface';
import { Paginated } from '../outputs';
import { Download, DownloadDocument } from '../schemas/download.schema';

export class MongooseDownloadsRepository implements IDownloadsRepository {
  constructor(
    @InjectModel(Download.name)
    private readonly downloadModel: Model<DownloadDocument>,
  ) {}

  private transform(download: DownloadDocument | null): DownloadOutput | null {
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

  async findById(downloadId: string): Promise<DownloadOutput | null> {
    const download = await this.downloadModel.findById(downloadId).exec();
    return this.transform(download);
  }

  async findMany({
    skip,
    limit,
    fileId,
  }: FindManyDownloadsInput): Promise<Paginated<DownloadOutput>> {
    const [downloads, count] = await Promise.all([
      this.downloadModel
        .find()
        .where({ fileId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec(),
      this.downloadModel.count().exec(),
    ]);
    return {
      data: downloads.map(
        (download) => this.transform(download) as DownloadOutput,
      ),
      count,
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
