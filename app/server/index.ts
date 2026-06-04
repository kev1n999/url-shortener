import express from 'express';
import { env } from "../config/env";
import { router } from './routes';

const port = env.serverPort;

export const app = express();

app.use(express.json());
app.use("/api", router);

export async function bootstrap() {
    app.listen(port, () => {
        console.log(`Listening on: http://localhost:${port}`)
    });
}