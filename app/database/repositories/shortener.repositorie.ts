import { CreateShortenerDTO } from '@/dto/system/create-shortener-dto';
import { prisma } from '..';
import { nanoid } from 'nanoid';

export class ShortenerRepository {
  public async createShortener(data: CreateShortenerDTO) {
    const shortCode = nanoid(6);

    await prisma.shortener.create({
      data: {
        shortCode,
        originalurl: data.originalUrl,
      },
    });
  }
}
