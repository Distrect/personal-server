import { readFileSync } from 'fs';
import { join } from 'path';
import * as yaml from 'js-yaml';

const CONFIG_FILE_NAME: string = 'app.config.yaml';

export default () =>
  yaml.load(readFileSync(join(__dirname, CONFIG_FILE_NAME), 'utf8')) as Record<
    string,
    any
  >;

export interface AppConfig {
  app: {
    port: number;
  };
  database: {
    port: number;
    usarname: string;
    password: string;
    host: string;
  };
  jwt: {
    secret: string;
  };

  cookie: {
    secret: string;
  };
}
