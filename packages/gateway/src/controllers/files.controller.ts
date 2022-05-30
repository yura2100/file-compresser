import { Controller } from '@nestjs/common';
import { FilesService } from '../services/files.service';

@Controller()
export class FilesController {
  constructor(private readonly filesService: FilesService) {}


}
