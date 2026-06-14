import express from 'express';
import { env } from '../config/env';
import { router, midRouter } from './routes';
import path from 'node:path';

const port = env.serverPort;

export const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/api', router);
app.use(midRouter);

export async function bootstrap() {
  app.listen(port, () => {
    console.log(`Listening on: ${env.baseUrl(env.serverPort)}`);
    console.log(`API: ${env.baseUrl(env.serverPort)}/api`);
  });
}
