import { CreateShortenerDTO } from '@/dto/system/create-shortener-dto';
import { prisma } from '..';
import { Shortener } from '@/models/shortener.model';

export class ShortenerRepository {
  public async createShortener(
    data: CreateShortenerDTO,
    shortCode: string
  ): Promise<Shortener> {
    const shortener = await prisma.shortener.create({
      data: {
        shortCode,
        originalurl: data.originalUrl,
      },
    });

    return shortener;
  }
}
