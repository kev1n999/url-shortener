import { Router } from 'express';
import { AuthController } from '../controllers/auth/auth';
import { ShortenerController } from '../controllers/system/shortener';

export const router = Router();

const authController = new AuthController();
const shortenerController = new ShortenerController();

router.get('/:shortCode', shortenerController.redirect);
router.post('/shortener/create', shortenerController.create);
router.post('/auth/signup', authController.register);
router.post('/auth/signin', authController.login);
