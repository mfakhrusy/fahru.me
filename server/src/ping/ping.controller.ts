import { Controller, Get, HttpCode } from '@nestjs/common';
import { PingService } from './ping.service';

@Controller('ping')
export class PingController {
  constructor(private readonly pingService: PingService) {}

  @Get()
  @HttpCode(200)
  findAll(): { data: string } {
    return this.pingService.getPing();
  }
}
