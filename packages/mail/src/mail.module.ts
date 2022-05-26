import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { transporterProvider } from './providers/transporter.provider';
import { templateBuilderProvider } from './providers/template-builder.provider';
import config from './config/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, load: [config] })],
  providers: [MailService, transporterProvider, templateBuilderProvider],
  controllers: [MailController],
})
export class MailModule {}
