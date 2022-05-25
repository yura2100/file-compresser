import { Test } from '@nestjs/testing';
import { StatisticsController } from './statistics.controller';
import { StatisticsService } from './statistics.service';
import { FileNotFoundException } from './exceptions/file-not-found.exception';
import { DownloadNotFoundException } from './exceptions/download-not-found.exception';
import { DownloadNotStartedException } from './exceptions/download-not-started.exception';
import {
  cancelDownloadInput,
  finishDownloadInput,
  id,
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
