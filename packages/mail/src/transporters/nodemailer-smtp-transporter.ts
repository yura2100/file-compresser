import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { ITransporter, SendInput } from '../interfaces/transporter.interface';
import { SmtpConfig } from '../config/config';

export class NodemailerSmtpTransporter implements ITransporter {
  private readonly transporter: nodemailer.Transporter;

  constructor(configService: ConfigService) {
    const smtpConfig = configService.get<SmtpConfig>('smtp');
    this.transporter = nodemailer.createTransport({
      host: smtpConfig?.host,
      port: smtpConfig?.port,
      auth: {
        user: smtpConfig?.user,
        pass: smtpConfig?.password,
      },
    });
  }

  async send(input: SendInput): Promise<void> {
    await this.transporter.sendMail(input);
  }
}
