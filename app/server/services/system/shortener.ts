import { ShortenerRepository } from '@/database/repositories/shortener.repositorie';
import { CreateShortenerDTO } from '@/dto/system/create-shortener-dto';

export class ShortenerService {
  public constructor(private shortenerRepository = new ShortenerRepository()) {}

  public async create(data: CreateShortenerDTO) {
    await this.shortenerRepository.createShortener(data);
  }
}
