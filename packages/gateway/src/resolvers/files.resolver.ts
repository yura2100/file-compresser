import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { File, GetFilesArgs, PaginatedFile } from '../models/file';
import { FileMeta } from '../models/file-meta';
import { PaginatedDownload } from '../models/download';
import { PaginationArgs } from '../models/paginated';
import { DownloadsService } from '../services/downloads.service';
import { FilesService } from '../services/files.service';

@Resolver(() => File)
export class FilesResolver {
  constructor(
    private readonly filesService: FilesService,
    private readonly downloadsService: DownloadsService,
  ) {}

  @Query(() => File, { name: 'file', nullable: true })
  getOne(@Args('id', { type: () => ID }) id: string): Promise<File> {
    return this.filesService.getOne(id);
  }

  @Query(() => PaginatedFile, { name: 'files' })
  getMany(@Args() args: GetFilesArgs): Promise<PaginatedFile> {
    return this.filesService.getMany(args);
  }

  @ResolveField('downloads', () => PaginatedDownload)
  getDownloads(
    @Parent() file: File,
    @Args() args: PaginationArgs,
  ): Promise<PaginatedDownload> {
    return this.downloadsService.getMany({ fileId: file.id, ...args });
  }

  @Mutation(() => File, { name: 'uploadFile' })
  async upload(
    @Args('file', { type: () => GraphQLUpload }) file: FileUpload,
  ): Promise<File> {
    const fileId = await this.filesService.upload();
    return this.filesService.getOne(fileId);
  }
}
