import { Injectable } from '@nestjs/common';
import { File, GetFilesArgs, PaginatedFile } from '../models/file';

@Injectable()
export class FilesService {
  getOne(id: string): Promise<File> {

  }

  getMany(args: GetFilesArgs): Promise<PaginatedFile> {

  }

  upload(): Promise<string> {

  }
}
