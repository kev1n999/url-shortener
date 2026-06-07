declare namespace NodeJS {
  interface ProcessEnv {
    SERVER_PORT: string;
    DATABASE_URL: string;
    JWT_SECRET_KEY: string;
  }
}
