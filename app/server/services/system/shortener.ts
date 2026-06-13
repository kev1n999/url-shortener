import { ShortenerRepository } from '@/database/repositories/shortener.repositorie';
import { CreateShortenerDTO } from '@/dto/system/create-shortener-dto';
import { Shortener } from 'generated/prisma/client';
import { nanoid } from 'nanoid';

export class ShortenerService {
  public constructor(private shortenerRepository = new ShortenerRepository()) {}

  public async create({ originalUrl }: CreateShortenerDTO): Promise<Shortener> {
    const shortCode = nanoid(6);

    const shortener = await this.shortenerRepository.createShortener(
      { originalUrl },
      shortCode
    );
    return shortener;
  }

  public async findByCode(shortCode: string): Promise<Shortener | null> {
    return this.shortenerRepository.findByCode(shortCode);
  }
}
