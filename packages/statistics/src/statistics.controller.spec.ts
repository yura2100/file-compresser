import { Test } from '@nestjs/testing';
import { StatisticsController } from './statistics.controller';
import { StatisticsService } from './statistics.service';
import { FileNotFoundException } from './exceptions/file-not-found.exception';
import { DownloadNotFoundException } from './exceptions/download-not-found.exception';
import { DownloadNotStartedException } from './exceptions/download-not-started.exception';
import {
  cancelDownloadInput,
  fileOutput,
  findManyDownloadsInput,
  findManyInput,
  finishDownloadInput,
  finishedDownloadOutput,
  id,
  manyDownloadsOutput,
  manyFilesOutput,
  saveFileInput,
  startDownloadInput,
} from './fixtures';

describe('StatisticsController', () => {
  let statisticsController: StatisticsController;
  let statisticsService: StatisticsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        StatisticsController,
        {
          provide: StatisticsService,
          useFactory: () => ({
            findFileById: jest.fn(),
            findManyFiles: jest.fn(),
            findDownloadById: jest.fn(),
            findManyDownloads: jest.fn(),
            saveFile: jest.fn(),
            startDownload: jest.fn(),
            finishDownload: jest.fn(),
            cancelDownload: jest.fn(),
          }),
        },
      ],
    }).compile();

    statisticsController = moduleRef.get(StatisticsController);
    statisticsService = moduleRef.get(StatisticsService);
  });

  it('should be defined', () => {
    expect(statisticsController).toBeDefined();
  });

  it('should find one file by id', async () => {
    const findFileByIdSpy = jest
      .spyOn(statisticsService, 'findFileById')
      .mockResolvedValue(fileOutput);
    const result = await statisticsController.findFileById(id);
    expect(result).toEqual(fileOutput);
    expect(findFileByIdSpy).toBeCalledWith(id);
  });

  it('should not find one file by id and return null', async () => {
    const findFileByIdSpy = jest
      .spyOn(statisticsService, 'findFileById')
      .mockResolvedValue(null);
    const result = await statisticsController.findFileById(id);
    expect(result).toBeNull();
    expect(findFileByIdSpy).toBeCalledWith(id);
  });

  it('should find many files', async () => {
    const findManyFilesSpy = jest
      .spyOn(statisticsService, 'findManyFiles')
      .mockResolvedValue(manyFilesOutput);
    const result = await statisticsController.findManyFiles(findManyInput);
    expect(result).toEqual(manyFilesOutput);
    expect(findManyFilesSpy).toBeCalledWith(findManyInput);
  });

  it('should find one download by id', async () => {
    const findDownloadByIdSpy = jest
      .spyOn(statisticsService, 'findDownloadById')
      .mockResolvedValue(finishedDownloadOutput);
    const result = await statisticsController.findDownloadById(id);
    expect(result).toEqual(finishedDownloadOutput);
    expect(findDownloadByIdSpy).toBeCalledWith(id);
  });

  it('should not find one download by id and return null', async () => {
    const findDownloadByIdSpy = jest
      .spyOn(statisticsService, 'findDownloadById')
      .mockResolvedValue(null);
    const result = await statisticsController.findDownloadById(id);
    expect(result).toBeNull();
    expect(findDownloadByIdSpy).toBeCalledWith(id);
  });

  it('should find many downloads', async () => {
    const findManyFilesSpy = jest
      .spyOn(statisticsService, 'findManyDownloads')
      .mockResolvedValue(manyDownloadsOutput);
    const result = await statisticsController.findManyDownloads(
      findManyDownloadsInput,
    );
    expect(result).toEqual(manyDownloadsOutput);
    expect(findManyFilesSpy).toBeCalledWith(findManyDownloadsInput);
  });

  it('should save file', async () => {
    const saveFileSpy = jest
      .spyOn(statisticsService, 'saveFile')
      .mockResolvedValue(id);
    const result = await statisticsController.saveFile(saveFileInput);
    expect(result).toEqual(id);
    expect(saveFileSpy).toBeCalledWith(saveFileInput);
  });

  it('should start download', async () => {
    const startDownloadSpy = jest
      .spyOn(statisticsService, 'startDownload')
      .mockResolvedValue(id);
    const result = await statisticsController.startDownload(startDownloadInput);
    expect(result).toEqual(id);
    expect(startDownloadSpy).toBeCalledWith(startDownloadInput);
  });

  it('should not start download, file not found', async () => {
    const startDownloadSpy = jest
      .spyOn(statisticsService, 'startDownload')
      .mockRejectedValue(new FileNotFoundException());
    await expect(async () => {
      await statisticsController.startDownload(startDownloadInput);
    }).rejects.toBeInstanceOf(FileNotFoundException);
    expect(startDownloadSpy).toBeCalledWith(startDownloadInput);
  });

  it('should finish download', async () => {
    const finishDownloadSpy = jest
      .spyOn(statisticsService, 'finishDownload')
      .mockResolvedValue();
    const result = await statisticsController.finishDownload(
      finishDownloadInput,
    );
    expect(result).toBeUndefined();
    expect(finishDownloadSpy).toBeCalledWith(finishDownloadInput);
  });

  it('should not finish download, download not found', async () => {
    const finishDownloadSpy = jest
      .spyOn(statisticsService, 'finishDownload')
      .mockRejectedValue(new DownloadNotFoundException());
    await expect(async () => {
      await statisticsController.finishDownload(finishDownloadInput);
    }).rejects.toBeInstanceOf(DownloadNotFoundException);
    expect(finishDownloadSpy).toBeCalledWith(finishDownloadInput);
  });

  it('should not finish download, download not started', async () => {
    const finishDownloadSpy = jest
      .spyOn(statisticsService, 'finishDownload')
      .mockRejectedValue(new DownloadNotStartedException());
    await expect(async () => {
      await statisticsController.finishDownload(finishDownloadInput);
    }).rejects.toBeInstanceOf(DownloadNotStartedException);
    expect(finishDownloadSpy).toBeCalledWith(finishDownloadInput);
  });

  it('should cancel download', async () => {
    const cancelDownloadSpy = jest
      .spyOn(statisticsService, 'cancelDownload')
      .mockResolvedValue();
    const result = await statisticsController.cancelDownload(
      cancelDownloadInput,
    );
    expect(result).toBeUndefined();
    expect(cancelDownloadSpy).toBeCalledWith(cancelDownloadInput);
  });

  it('should not cancel download, download not found', async () => {
    const cancelDownloadSpy = jest
      .spyOn(statisticsService, 'cancelDownload')
      .mockRejectedValue(new DownloadNotFoundException());
    await expect(async () => {
      await statisticsController.cancelDownload(cancelDownloadInput);
    }).rejects.toBeInstanceOf(DownloadNotFoundException);
    expect(cancelDownloadSpy).toBeCalledWith(cancelDownloadInput);
  });

  it('should not cancel download, download not started', async () => {
    const cancelDownloadSpy = jest
      .spyOn(statisticsService, 'cancelDownload')
      .mockRejectedValue(new DownloadNotStartedException());
    await expect(async () => {
      await statisticsController.cancelDownload(cancelDownloadInput);
    }).rejects.toBeInstanceOf(DownloadNotStartedException);
    expect(cancelDownloadSpy).toBeCalledWith(cancelDownloadInput);
  });
});
