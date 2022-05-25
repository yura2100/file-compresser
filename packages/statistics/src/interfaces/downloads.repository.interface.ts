import { DownloadStatus } from '../types';

export type CreateDownloadInput = {
  userId: string;
  fileId: string;
};

export type UpdatedownloadInput = {
  status?: DownloadStatus;
  finishedAt?: Date;
};

export type DownloadOutput = {
  id: string;
  userId: string;
  createdAt: Date;
  finishedAt: Date | null;
  status: DownloadStatus;
  fileId: string;
};

export interface IDownloadsRepository {
  findById(downloadId: string): Promise<DownloadOutput | null>;

  create(input: CreateDownloadInput): Promise<string>;

  update(downloadId: string, input: UpdatedownloadInput): Promise<void>;
}
