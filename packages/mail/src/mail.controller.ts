import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MailService } from './mail.service';
import { MailType } from './mail-type';
import { LinkToFileInput } from './inputs';

@Controller()
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @MessagePattern(MailType.LINK_TO_FILE)
  sendLinkToFile(@Payload() input: LinkToFileInput): Promise<void> {
    return this.mailService.sendLinkToFile(input);
  }
}
