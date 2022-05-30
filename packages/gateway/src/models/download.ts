import { ArgsType, Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import { DownloadStatus } from './download-status';
import { File } from './file';
import { Paginated, PaginationArgs } from './paginated';

@ObjectType()
export class Download {
  @Field(() => ID)
  id!: string;

  @Field(() => GraphQLISODateTime)
  createdAt!: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  finishedAt?: Date;

  @Field(() => ID)
  userId!: string;

  @Field(() => ID)
  fileId!: string;

  @Field(() => DownloadStatus)
  status!: DownloadStatus;

  @Field(() => File)
  file?: File;
}

@ObjectType()
export class PaginatedDownload extends Paginated(Download) {}

@ArgsType()
export class GetDownloadsArgs extends PaginationArgs {
  @Field(() => ID)
  fileId!: string;
}
