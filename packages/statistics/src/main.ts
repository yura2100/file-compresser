import { NestFactory } from '@nestjs/core';
import { TcpOptions, Transport } from '@nestjs/microservices';
import { StatisticsModule } from './statistics.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<TcpOptions>(
    StatisticsModule,
    {
      transport: Transport.TCP,
    },
  );
  await app.listen();
}
bootstrap();
