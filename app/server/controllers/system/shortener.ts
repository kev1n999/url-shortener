import { ShortenerService } from '@/server/services/system/shortener';
import { Request, Response } from 'express';

export class ShortenerController {
  public constructor(private service = new ShortenerService()) {}

  public create = async (req: Request, res: Response) => {
    const { originalUrl } = req.body;

    const shorted = await this.service.create({ originalUrl });

    return res
      .json({
        shorted: shorted,
      })
      .status(201);
  };
}
