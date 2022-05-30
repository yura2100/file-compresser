import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { StatisticsService } from './statistics.service';
import {
  CancelDownloadInput,
  FindManyDownloadsInput,
  FindManyInput,
  FinishDownloadInput,
  SaveFileInput,
  StartDownloadInput,
} from './inputs';
import { StatisticsType } from './statistics-type';
import { FileOutput } from './interfaces/files.repository.interface';
import { Paginated } from './outputs';
import { DownloadOutput } from './interfaces/downloads.repository.interface';

@Controller()
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @MessagePattern(StatisticsType.FIND_FILE_BY_ID)
  findFileById(@Payload() fileId: string): Promise<FileOutput | null> {
    return this.statisticsService.findFileById(fileId);
  }

  @MessagePattern(StatisticsType.FIND_MANY_FILES)
  findManyFiles(
    @Payload() input: FindManyInput,
  ): Promise<Paginated<FileOutput>> {
    return this.statisticsService.findManyFiles(input);
  }

  @MessagePattern(StatisticsType.FIND_DOWNLOAD_BY_ID)
  findDownloadById(
    @Payload() downloadId: string,
  ): Promise<DownloadOutput | null> {
    return this.statisticsService.findDownloadById(downloadId);
  }

  @MessagePattern(StatisticsType.FIND_MANY_DOWNLOADS)
  findManyDownloads(
    @Payload() input: FindManyDownloadsInput,
  ): Promise<Paginated<DownloadOutput>> {
    return this.statisticsService.findManyDownloads(input);
  }

  @MessagePattern(StatisticsType.SAVE_FILE)
  saveFile(@Payload() input: SaveFileInput): Promise<string> {
    return this.statisticsService.saveFile(input);
  }

  @MessagePattern(StatisticsType.START_DOWNLOAD)
  startDownload(@Payload() input: StartDownloadInput): Promise<string> {
    return this.statisticsService.startDownload(input);
  }

  @EventPattern(StatisticsType.FINISH_DOWNLOAD)
  finishDownload(@Payload() input: FinishDownloadInput): Promise<void> {
    return this.statisticsService.finishDownload(input);
  }

  @EventPattern(StatisticsType.CANCEL_DOWNLOAD)
  cancelDownload(@Payload() input: CancelDownloadInput): Promise<void> {
    return this.statisticsService.cancelDownload(input);
  }
}
