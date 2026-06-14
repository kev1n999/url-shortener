import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '@/config/env';

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authorization = req.headers['authorization'];
  const bearerToken = authorization?.startsWith('Bearer ')
    ? authorization.slice(7)
    : authorization;
  const token = getCookieValue(req.headers.cookie, 'token') || bearerToken;

  if (!token) {
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }

  jwt.verify(token, env.jwtSecretKey, (err) => {
    if (err) {
      return res.status(403).json({
        message: 'Unauthorized',
      });
    }

    next();
  });
}

function getCookieValue(cookieHeader: string | undefined, name: string) {
  if (!cookieHeader) {
    return null;
  }

  const cookies = cookieHeader.split(';').map((cookie) => cookie.trim());
  const cookie = cookies.find((item) => item.startsWith(`${name}=`));

  if (!cookie) {
    return null;
  }

  return decodeURIComponent(cookie.slice(name.length + 1));
}
