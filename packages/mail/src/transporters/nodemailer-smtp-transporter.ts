import * as nodemailer from 'nodemailer';
import { ITransporter, SendInput } from '../interfaces/transporter.interface';

export class NodemailerSmtpTransporter implements ITransporter {
  private readonly transporter: nodemailer.Transporter;

  // TODO: Add ConfigService
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_ as string,
      port: Number(process.env.SMTP_PORT),
      auth: {
        user: process.env.SMTP_USER as string,
        pass: process.env.SMTP_PASSWORD as string,
      },
    });
  }

  async send(input: SendInput): Promise<void> {
    await this.transporter.sendMail(input);
  }
}
