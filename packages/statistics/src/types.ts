export enum DownloadStatus {
  STARTED = 'STARTED',
  FINISHED = 'FINISHED',
  CANCELLED = 'CANCELLED',
}

export type FileMeta = {
  size: number;
  mime: string;
  name: string;
  link: string;
  key: string;
};
