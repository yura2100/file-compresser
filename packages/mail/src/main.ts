import { NestFactory } from '@nestjs/core';
import { TcpOptions, Transport } from '@nestjs/microservices';
import { MailModule } from './mail.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<TcpOptions>(MailModule, {
    transport: Transport.TCP,
    options: {},
  });
  await app.listen();
}
bootstrap();
