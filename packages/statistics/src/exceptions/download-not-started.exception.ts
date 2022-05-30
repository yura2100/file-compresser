import { RpcException } from '@nestjs/microservices';

export class DownloadNotStartedException extends RpcException {
  constructor() {
    super('Download Not Started');
  }
}
