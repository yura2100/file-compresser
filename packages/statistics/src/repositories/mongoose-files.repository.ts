import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreateFileInput,
  FileOutput,
  IFilesRepository,
} from '../interfaces/files.repository.interface';
import { File, FileDocument } from '../schemas/file.schema';

export class MongooseFilesRepository implements IFilesRepository {
  constructor(
    @InjectModel(File.name)
    private readonly fileModel: Model<FileDocument>,
  ) {}

  async findByKey(key: string): Promise<FileOutput | null> {
    const file = await this.fileModel.findOne({ meta: { key } }).exec();

    if (!file) {
      return null;
    }

    return {
      id: file.id,
      createdAt: file.createdAt,
      userId: file.userId,
      meta: {
        size: file.meta.size,
        mime: file.meta.mime,
        name: file.meta.name,
        link: file.meta.link,
        key: file.meta.key,
      },
    };
  }

  async create(input: CreateFileInput): Promise<string> {
    const file = await this.fileModel.create({
      ...input,
      createdAt: new Date(),
    });
    return file.id;
  }
}
