import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreateFileInput,
  FileOutput,
  FindManyFilesInput,
  IFilesRepository,
} from '../interfaces/files.repository.interface';
import { Paginated } from '../outputs';
import { File, FileDocument } from '../schemas/file.schema';

export class MongooseFilesRepository implements IFilesRepository {
  constructor(
    @InjectModel(File.name)
    private readonly fileModel: Model<FileDocument>,
  ) {}

  private transform(file: FileDocument | null): FileOutput | null {
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

  async findById(fileId: string): Promise<FileOutput | null> {
    const file = await this.fileModel.findById(fileId).exec();
    return this.transform(file);
  }

  async findByKey(key: string): Promise<FileOutput | null> {
    const file = await this.fileModel.findOne({ meta: { key } }).exec();
    return this.transform(file);
  }

  async findMany({
    skip,
    limit,
  }: FindManyFilesInput): Promise<Paginated<FileOutput>> {
    const [files, count] = await Promise.all([
      this.fileModel
        .find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec(),
      this.fileModel.count().exec(),
    ]);
    return {
      data: files.map((file) => this.transform(file) as FileOutput),
      count,
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
