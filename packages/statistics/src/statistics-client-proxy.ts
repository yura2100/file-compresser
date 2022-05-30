import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import {
  CancelDownloadInput,
  FindManyDownloadsInput,
  FindManyInput,
  FinishDownloadInput,
  SaveFileInput,
  StartDownloadInput,
} from './inputs';
import { Paginated } from './outputs';
import { StatisticsType } from './statistics-type';
import { FileOutput } from './interfaces/files.repository.interface';
import { DownloadOutput } from './interfaces/downloads.repository.interface';

export class StatisticsClientProxy {
  constructor(private readonly clientProxy: ClientProxy) {}

  findFileById(fileId: string): Promise<FileOutput | null> {
    const observable = this.clientProxy.send<FileOutput | null>(
      StatisticsType.FIND_FILE_BY_ID,
      fileId,
    );
    return lastValueFrom(observable);
  }

  findManyFiles(input: FindManyInput): Promise<Paginated<FileOutput>> {
    const observable = this.clientProxy.send<Paginated<FileOutput>>(
      StatisticsType.FIND_MANY_FILES,
      input,
    );
    return lastValueFrom(observable);
  }

  findDownloadById(downloadId: string): Promise<DownloadOutput | null> {
    const observable = this.clientProxy.send<DownloadOutput | null>(
      StatisticsType.FIND_DOWNLOAD_BY_ID,
      downloadId,
    );
    return lastValueFrom(observable);
  }

  findManyDownloads(
    input: FindManyDownloadsInput,
  ): Promise<Paginated<DownloadOutput>> {
    const observable = this.clientProxy.send<Paginated<DownloadOutput>>(
      StatisticsType.FIND_MANY_DOWNLOADS,
      input,
    );
    return lastValueFrom(observable);
  }

  saveFile(input: SaveFileInput): Promise<string> {
    const observable = this.clientProxy.send<string>(
      StatisticsType.SAVE_FILE,
      input,
    );
    return lastValueFrom(observable);
  }

  startDownload(input: StartDownloadInput): Promise<string> {
    const observable = this.clientProxy.send<string>(
      StatisticsType.START_DOWNLOAD,
      input,
    );
    return lastValueFrom(observable);
  }

  finishDownload(input: FinishDownloadInput): Promise<void> {
    const observable = this.clientProxy.emit<void>(
      StatisticsType.FINISH_DOWNLOAD,
      input,
    );
    return lastValueFrom(observable);
  }

  cancelDownload(input: CancelDownloadInput): Promise<void> {
    const observable = this.clientProxy.emit<void>(
      StatisticsType.CANCEL_DOWNLOAD,
      input,
    );
    return lastValueFrom(observable);
  }
}
