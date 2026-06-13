import { ShortenerRepository } from '@/database/repositories/shortener.repositorie';
import { CreateShortenerDTO } from '@/dto/system/create-shortener-dto';
import { nanoid } from 'nanoid';
import { Shortener } from '@/models/shortener.model';

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
}
