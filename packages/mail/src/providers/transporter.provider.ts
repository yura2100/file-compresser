import { ClassProvider } from '@nestjs/common';
import { ITransporter } from '../interfaces/transporter.interface';
import { NodemailerSmtpTransporter } from '../transporters/nodemailer-smtp-transporter';

export const TRANSPORTER_TOKEN = Symbol('TRANSPORTER_TOKEN');

export const transporterProvider: ClassProvider<ITransporter> = {
  provide: TRANSPORTER_TOKEN,
  useClass: NodemailerSmtpTransporter,
};
