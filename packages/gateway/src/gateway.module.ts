import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import * as path from 'path';
import { FilesController } from './controllers/files.controller';
import { DownloadsResolver } from './resolvers/downloads.resolver';
import { FilesResolver } from './resolvers/files.resolver';
import { DownloadsService } from './services/downloads.service';
import { FilesService } from './services/files.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: path.join(process.cwd(), 'schema.gql'),
    }),
  ],
  controllers: [FilesController],
  providers: [DownloadsResolver, FilesResolver, DownloadsService, FilesService],
})
export class GatewayModule {}
