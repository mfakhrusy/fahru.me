import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GuestBookService } from './guest-book.service';
import { GuestBook } from '@prisma/client';
import { ReturnData } from 'src/type/return-data';

@Controller('guest_book')
export class GuestBookController {
  constructor(private readonly guestBookService: GuestBookService) {}

  @Get()
  async getGuestBooks(): Promise<ReturnData<GuestBook[]>> {
    return await this.guestBookService.findAll();
  }

  @Get(':id')
  async getGuestBook(@Param('id') id: string): Promise<ReturnData<GuestBook>> {
    return await this.guestBookService.findOne(parseInt(id));
  }

  @Post()
  async createGuestBook(
    @Body() data: GuestBook,
  ): Promise<ReturnData<GuestBook>> {
    return await this.guestBookService.create(data);
  }
}
