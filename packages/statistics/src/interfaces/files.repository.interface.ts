import { FileMeta } from '../types';

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
  findByKey(key: string): Promise<FileOutput | null>;

  create(input: CreateFileInput): Promise<string>;
}
