import { FileMeta } from '../types';
import { Paginated } from '../outputs';

export type FindManyFilesInput = {
  skip: number;
  limit: number;
};

export type CreateFileInput = {
  userId: string;
  meta: FileMeta;
};

export type FileOutput = {
  id: string;
  userId: string;
  createdAt: Date;
  meta: FileMeta;
};

export interface IFilesRepository {
  findById(fileId: string): Promise<FileOutput | null>;

  findByKey(key: string): Promise<FileOutput | null>;

  findMany(input: FindManyFilesInput): Promise<Paginated<FileOutput>>;

  create(input: CreateFileInput): Promise<string>;
}
