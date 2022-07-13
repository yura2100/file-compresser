import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ITransporter } from './interfaces/transporter.interface';
import { ITemplateBuilder } from './interfaces/template-builder.interface';
import { MailType } from './mail-type';
import { LinkToFileInput } from './inputs';
import { TRANSPORTER_TOKEN } from './providers/transporter.provider';
import { TEMPLATE_BUILDER_TOKEN } from './providers/template-builder.provider';
import { ServerConfig } from './config/config';

@Injectable()
export class MailService {
  private readonly from: string;

  constructor(
    @Inject(TRANSPORTER_TOKEN)
    private readonly transporter: ITransporter,
    @Inject(TEMPLATE_BUILDER_TOKEN)
    private readonly templateBuilder: ITemplateBuilder,
    configService: ConfigService,
  ) {
    const serverConfig = configService.get<ServerConfig>('server');
    this.from = serverConfig?.email as string;
  }

  async sendLinkToFile(input: LinkToFileInput): Promise<void> {
    const { email, firstName, lastName, link } = input;
    const name = lastName ? `${firstName} ${lastName}` : firstName;
    const html = await this.templateBuilder.build(MailType.LINK_TO_FILE, {
      name,
      link,
    });
    return this.transporter.send({
      from: this.from,
      to: email,
      subject: 'Link to download your compressed file',
      html,
    });
  }
}
