import { Injectable } from '@nestjs/common';
import { Download, GetDownloadsArgs, PaginatedDownload } from '../models/download';

@Injectable()
export class DownloadsService {
  getOne(id: string): Promise<Download> {

  }

  getMany(args: GetDownloadsArgs): Promise<PaginatedDownload> {

  }
}
