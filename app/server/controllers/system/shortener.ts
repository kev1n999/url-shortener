import { env } from '@/config/env';
import { ShortenerService } from '@/server/services/system/shortener';
import { Request, Response } from 'express';

export class ShortenerController {
  public constructor(private service = new ShortenerService()) {}

  public create = async (req: Request, res: Response) => {
    const { originalUrl } = req.body;

    const shortener = await this.service.create({ originalUrl });

    return res.status(201).json({
      shortUrl: `${env.baseUrl(env.serverPort)}/api/${shortener.shortCode}`,
      shortCode: shortener.shortCode,
    });
  };

  public redirect = async (
    req: Request<{ shortCode: string }>,
    res: Response
  ) => {
    const { shortCode } = req.params;

    const shortener = await this.service.findByCode(shortCode);

    if (!shortener) {
      return res.status(404).send('Not Found!');
    }

    await res.redirect(shortener.originalurl);
  };
}
