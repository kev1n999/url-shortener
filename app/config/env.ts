export const env = {
  serverPort: Number(process.env.SERVER_PORT),
  databaseUrl: process.env.DATABASE_URL,
  jwtSecretKey: process.env.JWT_SECRET_KEY,
};
