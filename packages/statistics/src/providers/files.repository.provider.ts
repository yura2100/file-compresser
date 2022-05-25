import { ClassProvider } from '@nestjs/common';
import { IFilesRepository } from '../interfaces/files.repository.interface';
import { MongooseFilesRepository } from '../repositories/mongoose-files.repository';

export const FILES_REPOSITORY_TOKEN = Symbol('FILES_REPOSITORY_TOKEN');

export const filesRepositoryProvider: ClassProvider<IFilesRepository> = {
  provide: FILES_REPOSITORY_TOKEN,
  useClass: MongooseFilesRepository,
};
