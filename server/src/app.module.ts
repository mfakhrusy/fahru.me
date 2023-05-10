import { Module } from '@nestjs/common';
import { PingModule } from './ping/ping.module';
import { GuestBookModule } from './guest_book/guest-book.module';

@Module({
  imports: [PingModule, GuestBookModule],
})
export class AppModule {}
