import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { MailType } from './mail-type';
import { LinkToFileInput } from './inputs';

export class MailClientProxy {
  constructor(private readonly clientProxy: ClientProxy) {}

  sendLinkToFile(input: LinkToFileInput): Promise<void> {
    const observable = this.clientProxy.send<void>(
      MailType.LINK_TO_FILE,
      input,
    );
    return lastValueFrom(observable);
  }
}
