import bunyan from 'bunyan';
import dotenv from 'dotenv';

dotenv.config({});

class Config {
  public DATABASE_URL: string | undefined;
  public JWT_TOKEN: string | undefined;
  public NODE_ENV: string | undefined;
  public COOKIE_SECRET_ONE: string | undefined;
  public COOKIE_SECRET_TWO: string | undefined;
  public CLIENT_URL: string | undefined;

  constructor() {
    this.DATABASE_URL = process.env.DATABASE_URL;
    this.JWT_TOKEN = process.env.JWT_TOKEN;
    this.NODE_ENV = process.env.NODE_ENV;
    this.COOKIE_SECRET_ONE = process.env.COOKIE_SECRET_ONE;
    this.COOKIE_SECRET_TWO = process.env.COOKIE_SECRET_TWO;
    this.CLIENT_URL = process.env.CLIENT_URL;
  }
  public createLogger(name: string): bunyan {
    return bunyan.createLogger({ name: name, level: 'debug' });
  }
  public validateConfig(): void {
    for (const [key, value] of Object.entries(this)) {
      if (value === undefined) {
        throw new Error(`Configuration ${key} is undefined`);
      }
    }
  }
}

export const config: Config = new Config();
