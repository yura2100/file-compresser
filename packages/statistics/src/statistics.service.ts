import { Inject, Injectable } from '@nestjs/common';
import { IFilesRepository } from './interfaces/files.repository.interface';
import { IDownloadsRepository } from './interfaces/downloads.repository.interface';
import {
  CancelDownloadInput,
  FinishDownloadInput,
  SaveFileInput,
  StartDownloadInput,
} from './inputs';
import { FileNotFoundException } from './exceptions/file-not-found.exception';
import { DownloadNotFoundException } from './exceptions/download-not-found.exception';
import { DownloadNotStartedException } from './exceptions/download-not-started.exception';
import { FILES_REPOSITORY_TOKEN } from './providers/files.repository.provider';
import { DOWNLOADS_REPOSITORY_TOKEN } from './providers/downloads.repository.provider';
import { DownloadStatus } from './types';

@Injectable()
export class StatisticsService {
  constructor(
    @Inject(FILES_REPOSITORY_TOKEN)
    private readonly filesRepository: IFilesRepository,
    @Inject(DOWNLOADS_REPOSITORY_TOKEN)
    private readonly downloadsRepository: IDownloadsRepository,
  ) {}

  saveFile(input: SaveFileInput): Promise<string> {
    return this.filesRepository.create(input);
  }

  async startDownload({ userId, key }: StartDownloadInput): Promise<string> {
    const file = await this.filesRepository.findByKey(key);

    if (!file) {
      throw new FileNotFoundException();
    }

    return this.downloadsRepository.create({ userId, fileId: file.id });
  }

  async finishDownload({ downloadId }: FinishDownloadInput): Promise<void> {
    const download = await this.downloadsRepository.findById(downloadId);

    if (!download) {
      throw new DownloadNotFoundException();
    }

    if (download.status !== DownloadStatus.STARTED) {
      throw new DownloadNotStartedException();
    }

    await this.downloadsRepository.update(downloadId, {
      status: DownloadStatus.FINISHED,
      finishedAt: new Date(),
    });
  }

  async cancelDownload({ downloadId }: CancelDownloadInput): Promise<void> {
    const download = await this.downloadsRepository.findById(downloadId);

    if (!download) {
      throw new DownloadNotFoundException();
    }

    if (download.status !== DownloadStatus.STARTED) {
      throw new DownloadNotStartedException();
    }

    await this.downloadsRepository.update(downloadId, {
      status: DownloadStatus.CANCELLED,
    });
  }
}
