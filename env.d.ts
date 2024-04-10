declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      PORT: string;
      PGHOST: string;
      PGDATABASE: string;
      PGUSER: string;
      PGPASSWORD: string;
    }
  }
}

export {};