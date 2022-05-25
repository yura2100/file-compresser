import {
  CancelDownloadInput,
  FinishDownloadInput,
  SaveFileInput,
  StartDownloadInput,
} from './inputs';
import { FileOutput } from './interfaces/files.repository.interface';
import { DownloadOutput } from './interfaces/downloads.repository.interface';
import { DownloadStatus } from './types';

export const id = 'test id';

export const saveFileInput: SaveFileInput = {
  userId: id,
  meta: {
    size: 1,
    mime: 'mime',
    name: 'name',
    link: 'link',
    key: 'key',
  },
};

export const startDownloadInput: StartDownloadInput = {
  userId: id,
  key: 'key',
};

export const finishDownloadInput: FinishDownloadInput = {
  downloadId: id,
};

export const cancelDownloadInput: CancelDownloadInput = {
  downloadId: id,
};

export const fileOutput: FileOutput = {
  id,
  createdAt: new Date(),
  userId: id,
  meta: {
    size: 1,
    mime: 'mime',
    name: 'name',
    link: 'link',
    key: 'key',
  },
};

export const startedDownloadOutput: DownloadOutput = {
  id,
  userId: id,
  createdAt: new Date(),
  finishedAt: null,
  status: DownloadStatus.STARTED,
  fileId: id,
};

export const finishedDownloadOutput: DownloadOutput = {
  ...startedDownloadOutput,
  finishedAt: new Date(),
  status: DownloadStatus.FINISHED,
};
