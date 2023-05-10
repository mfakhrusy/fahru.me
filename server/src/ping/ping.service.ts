import { Injectable } from '@nestjs/common';

@Injectable()
export class PingService {
  getPing(): { data: string } {
    return { data: 'pong' };
  }
}
