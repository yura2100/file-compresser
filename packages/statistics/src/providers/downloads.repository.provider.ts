import { ClassProvider } from '@nestjs/common';
import { IDownloadsRepository } from '../interfaces/downloads.repository.interface';
import { MongooseDownloadsRepository } from '../repositories/mongoose-downloads.repository';

export const DOWNLOADS_REPOSITORY_TOKEN = Symbol('DOWNLOADS_REPOSITORY_TOKEN');

export const downloadsRepositoryProvider: ClassProvider<IDownloadsRepository> =
  {
    provide: DOWNLOADS_REPOSITORY_TOKEN,
    useClass: MongooseDownloadsRepository,
  };
