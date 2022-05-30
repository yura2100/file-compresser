import { RpcException } from '@nestjs/microservices';

export class DownloadNotFoundException extends RpcException {
  constructor() {
    super('Download Not Found');
  }
}
