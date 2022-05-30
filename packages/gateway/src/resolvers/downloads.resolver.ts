import {
  Args,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import {
  Download,
  GetDownloadsArgs,
  PaginatedDownload,
} from '../models/download';
import { File } from '../models/file';
import { DownloadsService } from '../services/downloads.service';
import { FilesService } from '../services/files.service';

@Resolver(() => Download)
export class DownloadsResolver {
  constructor(
    private readonly downloadsService: DownloadsService,
    private readonly filesService: FilesService,
  ) {}

  @Query(() => Download, { name: 'file', nullable: true })
  getOne(@Args('id', { type: () => ID }) id: string): Promise<Download> {
    return this.downloadsService.getOne(id);
  }

  @Query(() => PaginatedDownload, { name: 'files' })
  getMany(@Args() args: GetDownloadsArgs): Promise<PaginatedDownload> {
    return this.downloadsService.getMany(args);
  }

  @ResolveField('file', () => File)
  getFile(@Parent() download: Download): Promise<File> {
    return this.filesService.getOne(download.fileId);
  }
}
