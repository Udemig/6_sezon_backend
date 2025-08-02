declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGODB_URI: string;
      PORT: string;
      JWT_SECRET: string;
      RABBITMQ_URL: string;
      RATE_LIMIT_WINDOW: string;
      RATE_LIMIT_MAX_REQ: string;
    }
  }
}

export {};
