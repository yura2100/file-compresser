import { registerEnumType } from '@nestjs/graphql';

export enum DownloadStatus {
  STARTED,
  FINISHED,
  CANCELED,
}

registerEnumType(DownloadStatus, {
  name: 'DownloadStatus',
});
