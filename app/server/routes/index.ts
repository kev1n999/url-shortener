import { Router } from 'express';
import { AuthController } from '../controllers/auth/auth';

export const router = Router();

const authController = new AuthController();

router.get('/', (req, res) => res.status(200).send('Hello World!'));
router.post('/auth/signup', authController.register);
router.post('/auth/signin', authController.login);