import { Router } from 'express';
import path from 'node:path';
import { AuthController } from '../controllers/auth/auth';
import { ShortenerController } from '../controllers/system/shortener';
import { authMiddleware } from '../middlewares/auth/auth';

export const router = Router();
export const midRouter = Router();

midRouter.use(authMiddleware);

const authController = new AuthController();
const shortenerController = new ShortenerController();

midRouter.get('/shortener/create', (_req, res) => {
  return res.sendFile(path.join(__dirname, '../../public/shortener.html'));
});

midRouter.post('/shortener/create', shortenerController.create);

router.get('/:shortCode', shortenerController.redirect);
router.post('/auth/signup', authController.register);
router.post('/auth/signin', authController.login);
