import { Test } from '@nestjs/testing';
import { MailService } from './mail.service';
import { TRANSPORTER_TOKEN } from './providers/transporter.provider';
import { TEMPLATE_BUILDER_TOKEN } from './providers/template-builder.provider';
import { ITransporter } from './interfaces/transporter.interface';
import { ITemplateBuilder } from './interfaces/template-builder.interface';

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
    jest.spyOn(transporter, 'send').mockResolvedValue();
    jest.spyOn(templateBuilder, 'build').mockResolvedValue('<h1>Test</h1>');
    const result = await mailService.sendLinkToFile({
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'email',
      link: 'link',
    });
    expect(result).toBeUndefined();
  });
});
