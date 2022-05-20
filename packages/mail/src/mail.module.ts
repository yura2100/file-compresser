import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { transporterProvider } from './providers/transporter.provider';
import { templateBuilderProvider } from './providers/template-builder.provider';

@Module({
  providers: [MailService, transporterProvider, templateBuilderProvider],
  controllers: [MailController],
})
export class MailModule {}
