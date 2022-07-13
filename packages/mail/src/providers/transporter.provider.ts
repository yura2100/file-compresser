import { FactoryProvider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ITransporter } from '../interfaces/transporter.interface';
import { NodemailerSmtpTransporter } from '../transporters/nodemailer-smtp-transporter';

export const TRANSPORTER_TOKEN = Symbol('TRANSPORTER_TOKEN');

export const transporterProvider: FactoryProvider<ITransporter> = {
  provide: TRANSPORTER_TOKEN,
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    return new NodemailerSmtpTransporter(configService);
  },
};
