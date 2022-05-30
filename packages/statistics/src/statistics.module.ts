import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { StatisticsController } from './statistics.controller';
import { MongooseDatabaseModule } from './database/mongoose-database.module';
import { StatisticsService } from './statistics.service';
import { downloadsRepositoryProvider } from './providers/downloads.repository.provider';
import { filesRepositoryProvider } from './providers/files.repository.provider';
import { Download, DownloadSchema } from './schemas/download.schema';
import { File, FileSchema } from './schemas/file.schema';
import config from './config/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    MongooseDatabaseModule,
    MongooseModule.forFeature([
      { name: Download.name, schema: DownloadSchema },
      { name: File.name, schema: FileSchema },
    ]),
  ],
  providers: [
    StatisticsService,
    downloadsRepositoryProvider,
    filesRepositoryProvider,
  ],
  controllers: [StatisticsController],
})
export class StatisticsModule {}
