import { Test } from '@nestjs/testing';
import { StatisticsService } from './statistics.service';
import { IDownloadsRepository } from './interfaces/downloads.repository.interface';
import { IFilesRepository } from './interfaces/files.repository.interface';
import { DOWNLOADS_REPOSITORY_TOKEN } from './providers/downloads.repository.provider';
import { FILES_REPOSITORY_TOKEN } from './providers/files.repository.provider';
import {
  cancelDownloadInput,
  fileOutput,
  finishDownloadInput,
  finishedDownloadOutput,
  id,
  saveFileInput,
  startDownloadInput,
  startedDownloadOutput,
} from './fixtures';
import { FileNotFoundException } from './exceptions/file-not-found.exception';
import { DownloadStatus } from './types';
import { DownloadNotFoundException } from './exceptions/download-not-found.exception';
import { DownloadNotStartedException } from './exceptions/download-not-started.exception';

describe('StatisticsService', () => {
  const now = new Date();

  let statisticsService: StatisticsService;
  let downloadsRepository: IDownloadsRepository;
  let filesRepository: IFilesRepository;

  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(now);
  });

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        StatisticsService,
        {
          provide: FILES_REPOSITORY_TOKEN,
          useFactory: () => ({
            findByKey: jest.fn(),
            create: jest.fn(),
          }),
        },
        {
          provide: DOWNLOADS_REPOSITORY_TOKEN,
          useFactory: () => ({
            findById: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
          }),
        },
      ],
    }).compile();

    statisticsService = moduleRef.get(StatisticsService);
    downloadsRepository = moduleRef.get(DOWNLOADS_REPOSITORY_TOKEN);
    filesRepository = moduleRef.get(FILES_REPOSITORY_TOKEN);
  });

  it('should be defined', () => {
    expect(statisticsService).toBeDefined();
  });

  it('should save file', async () => {
    const createFileSpy = jest
      .spyOn(filesRepository, 'create')
      .mockResolvedValue(id);
    const result = await statisticsService.saveFile(saveFileInput);
    expect(result).toEqual(id);
    expect(createFileSpy).toBeCalledWith(saveFileInput);
  });

  it('should start download', async () => {
    const findFileByIdSpy = jest
      .spyOn(filesRepository, 'findByKey')
      .mockResolvedValue(fileOutput);
    const createDownloadSpy = jest
      .spyOn(downloadsRepository, 'create')
      .mockResolvedValue(id);
    const result = await statisticsService.startDownload(startDownloadInput);
    expect(result).toEqual(id);
    expect(findFileByIdSpy).toBeCalledWith(startDownloadInput.key);
    expect(createDownloadSpy).toBeCalledWith({
      userId: startDownloadInput.userId,
      fileId: fileOutput.id,
    });
  });

  it('should not start download, file not found', async () => {
    const findFileByIdSpy = jest
      .spyOn(filesRepository, 'findByKey')
      .mockRejectedValue(new FileNotFoundException());
    await expect(async () => {
      await statisticsService.startDownload(startDownloadInput);
    }).rejects.toBeInstanceOf(FileNotFoundException);
    expect(findFileByIdSpy).toBeCalledWith(startDownloadInput.key);
  });

  it('should finish download', async () => {
    const findDownloadByIdSpy = jest
      .spyOn(downloadsRepository, 'findById')
      .mockResolvedValue(startedDownloadOutput);
    const updateDownloadSpy = jest
      .spyOn(downloadsRepository, 'update')
      .mockResolvedValue();
    const result = await statisticsService.finishDownload(finishDownloadInput);
    expect(result).toBeUndefined();
    expect(findDownloadByIdSpy).toBeCalledWith(finishDownloadInput.downloadId);
    expect(updateDownloadSpy).toBeCalledWith(finishDownloadInput.downloadId, {
      status: DownloadStatus.FINISHED,
      finishedAt: now,
    });
  });

  it('should not finish download, download not found', async () => {
    const findDownloadByIdSpy = jest
      .spyOn(downloadsRepository, 'findById')
      .mockResolvedValue(null);
    await expect(async () => {
      await statisticsService.finishDownload(finishDownloadInput);
    }).rejects.toBeInstanceOf(DownloadNotFoundException);
    expect(findDownloadByIdSpy).toBeCalledWith(finishDownloadInput.downloadId);
  });

  it('should not finish download, download not started', async () => {
    const findDownloadByIdSpy = jest
      .spyOn(downloadsRepository, 'findById')
      .mockResolvedValue(finishedDownloadOutput);
    await expect(async () => {
      await statisticsService.finishDownload(finishDownloadInput);
    }).rejects.toBeInstanceOf(DownloadNotStartedException);
    expect(findDownloadByIdSpy).toBeCalledWith(finishDownloadInput.downloadId);
  });

  it('should cancel download', async () => {
    const findDownloadByIdSpy = jest
      .spyOn(downloadsRepository, 'findById')
      .mockResolvedValue(startedDownloadOutput);
    const updateDownloadSpy = jest
      .spyOn(downloadsRepository, 'update')
      .mockResolvedValue();
    const result = await statisticsService.cancelDownload(cancelDownloadInput);
    expect(result).toBeUndefined();
    expect(findDownloadByIdSpy).toBeCalledWith(cancelDownloadInput.downloadId);
    expect(updateDownloadSpy).toBeCalledWith(cancelDownloadInput.downloadId, {
      status: DownloadStatus.CANCELLED,
    });
  });

  it('should not cancel download, download not found', async () => {
    const findDownloadByIdSpy = jest
      .spyOn(downloadsRepository, 'findById')
      .mockResolvedValue(null);
    await expect(async () => {
      await statisticsService.cancelDownload(cancelDownloadInput);
    }).rejects.toBeInstanceOf(DownloadNotFoundException);
    expect(findDownloadByIdSpy).toBeCalledWith(cancelDownloadInput.downloadId);
  });

  it('should not cancel download, download not started', async () => {
    const findDownloadByIdSpy = jest
      .spyOn(downloadsRepository, 'findById')
      .mockResolvedValue(finishedDownloadOutput);
    await expect(async () => {
      await statisticsService.cancelDownload(cancelDownloadInput);
    }).rejects.toBeInstanceOf(DownloadNotStartedException);
    expect(findDownloadByIdSpy).toBeCalledWith(cancelDownloadInput.downloadId);
  });
});
