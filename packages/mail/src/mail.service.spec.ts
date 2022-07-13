import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { MailService } from './mail.service';
import { TRANSPORTER_TOKEN } from './providers/transporter.provider';
import { TEMPLATE_BUILDER_TOKEN } from './providers/template-builder.provider';
import { ITransporter } from './interfaces/transporter.interface';
import { ITemplateBuilder } from './interfaces/template-builder.interface';
import {
  email,
  linkToFileBuildInput,
  linkToFileHtml,
  linkToFileInput,
  linkToFileSendInput,
} from './fixtures';
import { MailType } from './mail-type';

describe('MailService', () => {
  let mailService: MailService;
  let transporter: ITransporter;
  let templateBuilder: ITemplateBuilder;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        MailService,
        {
          provide: TRANSPORTER_TOKEN,
          useFactory: () => ({
            send: jest.fn(),
          }),
        },
        {
          provide: TEMPLATE_BUILDER_TOKEN,
          useFactory: () => ({
            build: jest.fn(),
          }),
        },
        {
          provide: ConfigService,
          useFactory: () => ({
            get: () => ({ email }),
          }),
        },
      ],
    }).compile();

    mailService = moduleRef.get(MailService);
    transporter = moduleRef.get(TRANSPORTER_TOKEN);
    templateBuilder = moduleRef.get(TEMPLATE_BUILDER_TOKEN);
  });

  it('should be defined', () => {
    expect(mailService).toBeDefined();
  });

  it('should send link to file', async () => {
    const sendSpy = jest.spyOn(transporter, 'send').mockResolvedValue();
    const buildSpy = jest
      .spyOn(templateBuilder, 'build')
      .mockResolvedValue(linkToFileHtml);
    const result = await mailService.sendLinkToFile(linkToFileInput);
    expect(result).toBeUndefined();
    expect(sendSpy).toBeCalledWith(linkToFileSendInput);
    expect(buildSpy).toBeCalledWith(
      MailType.LINK_TO_FILE,
      linkToFileBuildInput,
    );
  });
});
