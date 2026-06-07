import { AuthService } from '@/server/services/auth/auth';
import { Request, Response } from 'express';

export class AuthController {
  constructor(private authService = new AuthService()) {}

  public register = async (req: Request, res: Response) => {
    const data = req.body;
    try {
      const result = await this.authService.userRegister(data);
      return res.json(result);
    } catch (err: any) {
      return res.status(505).json({
        "message": err.message,
      })
    }
  }
}
