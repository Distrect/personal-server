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
import { create } from 'html-pdf';
import { resolve } from 'path';
import puppeteer, { PDFOptions } from 'puppeteer';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: new Logger() });
  const env = app.get(EnvironmentService);
  const logger = new Logger();

  app.useGlobalPipes(new CustomValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter());

  app.use(helmet({ xXssProtection: true }));
  app.use(cookieParser(env.getCookieSecret()));
  app.use(compressor());

  await app.listen((env.getAppConfig() as any).port);
  logger.log(
    `App is listening from the Port ${(env.getAppConfig() as any).port}`,
    'Development',
  );
}

const ev = () => {
  console.log('DOC', document);
};

const pup = async () => {
  const opts: PDFOptions = { printBackground: true };

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.setContent(
    readFileSync('C:/Users/myfor/Desktop/den/cv.html', 'utf-8'),
    { waitUntil: 'load' },
  );

  const z = await page.evaluate(() => {
    const body = document.body;
    const html = document.documentElement;
    const height = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight,
    );
    return height;
  });
  const [width, height] = await page.evaluate(() => [
    document.documentElement.offsetWidth,
    document.documentElement.offsetHeight,
  ]);
  console.log('Z', z);

  await Promise.all([
    page.addStyleTag({ path: 'C:/Users/myfor/Desktop/den/root.css' }),
    page.addStyleTag({ path: 'C:/Users/myfor/Desktop/den/util.css' }),
    page.addStyleTag({ path: 'C:/Users/myfor/Desktop/den/reset.css' }),
    page.addStyleTag({ path: 'C:/Users/myfor/Desktop/den/typography.css' }),
    page.addStyleTag({ path: 'C:/Users/myfor/Desktop/den/style.css' }),
  ]);

  const p = await page.pdf({
    ...opts,
    width,
    height: +height + 1,
    pageRanges: '1',
  });

  writeFileSync('./z.pdf', p);

  console.log('x    x   x       ', p);
};

bootstrap().then(pup).catch(console.error);
