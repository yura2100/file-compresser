import { FileMeta } from './types';

export type SaveFileInput = {
  userId: string;
  meta: FileMeta;
};

export type StartDownloadInput = {
  userId: string;
  key: string;
};

export type FinishDownloadInput = {
  downloadId: string;
};

export type CancelDownloadInput = FinishDownloadInput;
