import { Module } from '@nestjs/common';
import { StatisticsController } from './statistics.controller';
import { MongooseDatabaseModule } from './database/mongoose-database.module';
import { StatisticsService } from './statistics.service';
import { downloadsRepositoryProvider } from './providers/downloads.repository.provider';
import { filesRepositoryProvider } from './providers/files.repository.provider';
import { MongooseModule } from '@nestjs/mongoose';
import { Download, DownloadSchema } from './schemas/download.schema';
import { File, FileSchema } from './schemas/file.schema';

@Module({
  imports: [
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
