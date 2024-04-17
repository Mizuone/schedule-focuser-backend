declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      DATABASE_URL: string;
      POSTGRES_HOST: string
      POSTGRES_DATABASE: string
      POSTGRES_USER: string
      POSTGRES_PASSWORD: string
    }
  }
}

export {};