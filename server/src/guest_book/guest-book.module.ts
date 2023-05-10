import { Module } from '@nestjs/common';
import { GuestBookController } from './guest-book.controller';
import { GuestBookService } from './guest-book.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [],
  controllers: [GuestBookController],
  providers: [GuestBookService, PrismaService],
})
export class GuestBookModule {}
