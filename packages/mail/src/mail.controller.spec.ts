import { Test } from '@nestjs/testing';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';

describe('MailController', () => {
  let mailController: MailController;
  let mailService: MailService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        MailController,
        {
          provide: MailService,
          useFactory: () => ({
            sendLinkToFile: jest.fn(),
          }),
        },
      ],
    }).compile();

    mailController = moduleRef.get(MailController);
    mailService = moduleRef.get(MailService);
  });

  it('should be defined', () => {
    expect(mailController).toBeDefined();
  });

  it('should send link to file', async () => {
    jest.spyOn(mailService, 'sendLinkToFile').mockResolvedValue();
    const result = await mailController.sendLinkToFile({
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'email',
      link: 'link',
    });
    expect(result).toBeUndefined();
  });
});
