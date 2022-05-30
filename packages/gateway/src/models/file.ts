import {
  ArgsType,
  Field,
  GraphQLISODateTime,
  ID,
  Int,
  ObjectType,
} from '@nestjs/graphql';
import { FileMeta } from './file-meta';
import { Paginated, PaginationArgs } from './paginated';
import { PaginatedDownload } from './download';

@ObjectType()
export class File {
  @Field(() => ID)
  id!: string;

  @Field(() => GraphQLISODateTime)
  createdAt!: Date;

  @Field(() => ID)
  userId!: string;

  @Field(() => FileMeta)
  meta!: FileMeta;

  @Field(() => Int)
  downloadsCount!: number;

  @Field(() => PaginatedDownload)
  downloads?: PaginatedDownload;
}

@ObjectType()
export class PaginatedFile extends Paginated(File) {}

@ArgsType()
export class GetFilesArgs extends PaginationArgs {
  @Field(() => ID)
  userId!: string;
}
