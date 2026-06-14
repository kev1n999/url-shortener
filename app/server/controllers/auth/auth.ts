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
        message: err.message,
      });
    }
  };

  public login = async (req: Request, res: Response) => {
    const data = req.body;

    try {
      const token = await this.authService.userLogin(data);

      res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: '/',
      });

      return res.status(201).json({
        message: 'LOGIN_SUCCESS',
      });
    } catch (err: any) {
      return res.status(505).json({
        message: err.message,
      });
    }
  };
}
