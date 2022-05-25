import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { StatisticsService } from './statistics.service';
import {
  CancelDownloadInput,
  FinishDownloadInput,
  SaveFileInput,
  StartDownloadInput,
} from './inputs';
import { StatisticsType } from './statistics-type';

@Controller()
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @MessagePattern(StatisticsType.SAVE_FILE)
  saveFile(input: SaveFileInput): Promise<string> {
    return this.statisticsService.saveFile(input);
  }

  @MessagePattern(StatisticsType.START_DOWNLOAD)
  startDownload(input: StartDownloadInput): Promise<string> {
    return this.statisticsService.startDownload(input);
  }

  @EventPattern(StatisticsType.FINISH_DOWNLOAD)
  finishDownload(input: FinishDownloadInput): Promise<void> {
    return this.statisticsService.finishDownload(input);
  }

  @EventPattern(StatisticsType.CANCEL_DOWNLOAD)
  cancelDownload(input: CancelDownloadInput): Promise<void> {
    return this.statisticsService.cancelDownload(input);
  }
}
