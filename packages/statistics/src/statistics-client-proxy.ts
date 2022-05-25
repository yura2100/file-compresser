import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import {
  CancelDownloadInput,
  FinishDownloadInput,
  SaveFileInput,
  StartDownloadInput,
} from './inputs';
import { StatisticsType } from './statistics-type';

export class StatisticsClientProxy {
  constructor(private readonly clientProxy: ClientProxy) {}

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
