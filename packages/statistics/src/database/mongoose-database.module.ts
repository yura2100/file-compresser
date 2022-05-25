import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      // TODO: Add config service
      useFactory: () => ({ uri: process.env.MONGODB_URI }),
    }),
  ],
})
export class MongooseDatabaseModule {}
