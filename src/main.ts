import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { AllExceptionsFilter } from '@core/filters/exception.filter';
import { CustomValidationPipe } from '@core/pipes/validation.pipe';
import * as cookieParser from 'cookie-parser';
import * as compressor from 'compression';
import EnvironmentService from '@core/config/environment.service';
import helmet from 'helmet';
import { readFileSync, writeFileSync } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: new Logger() });
  const env = app.get(EnvironmentService);
  const logger = new Logger();

  app.useGlobalPipes(new CustomValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter());

  app.use(helmet({ xXssProtection: true }));
  app.use(cookieParser(env.getCookieSecret()));
  app.use(compressor());

  await app.listen(env.getAppConfig().port);
  logger.log(
    `App is listening from the Port ${env.getAppConfig().port}`,
    'Development',
  );
}

// bootstrap().catch(console.error);

const bfr = Buffer.from('Hello world');
console.log(bfr);
writeFileSync('./upload/name.jpg', bfr);

console.log(readFileSync('./upload/name.jpg'));
