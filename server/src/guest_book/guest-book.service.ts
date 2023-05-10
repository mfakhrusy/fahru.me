import { Injectable } from '@nestjs/common';
import { GuestBook } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { ReturnData } from '../type/return-data';
import { ErrorCode } from 'src/type/error';

@Injectable()
export class GuestBookService {
  constructor(private prisma: PrismaService) {}

  async create(data: GuestBook): Promise<ReturnData<GuestBook>> {
    if (!data) {
      return {
        data: {
          error_code: ErrorCode.GUEST_BOOK_IS_EMPTY,
          message: 'Guest book is empty',
        },
      };
    }

    if (!data.name) {
      return {
        data: {
          error_code: ErrorCode.GUEST_BOOK_NAME_IS_EMPTY,
          message: 'Name is empty',
        },
      };
    }

    if (!data.message) {
      return {
        data: {
          error_code: ErrorCode.GUEST_BOOK_MESSAGE_IS_EMPTY,
          message: 'Message is empty',
        },
      };
    }

    const guestBook = await this.prisma.guestBook.create({
      data,
    });
    return { data: guestBook };
  }

  async delete(id: number): Promise<ReturnData<GuestBook>> {
    const guestBook = await this.prisma.guestBook.delete({
      where: { id },
    });
    return { data: guestBook };
  }

  async findAll(): Promise<ReturnData<GuestBook[]>> {
    const guestBooks = await this.prisma.guestBook.findMany();
    return { data: guestBooks };
  }

  async findOne(id: number): Promise<ReturnData<GuestBook>> {
    const guestBook = await this.prisma.guestBook.findUnique({
      where: { id },
    });
    return { data: guestBook };
  }
}
