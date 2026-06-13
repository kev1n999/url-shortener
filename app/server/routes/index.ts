import { Router } from 'express';
import { AuthController } from '../controllers/auth/auth';
import { ShortenerController } from '../controllers/system/shortener';

export const router = Router();

const authController = new AuthController();
const shortenerController = new ShortenerController();

router.get('/', (req, res) => res.status(200).send('Hello World!'));
router.get('/shortener');
router.post('/shortener/create', shortenerController.create);
router.post('/auth/signup', authController.register);
router.post('/auth/signin', authController.login);
