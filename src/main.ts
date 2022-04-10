import { NestFactory } from '@nestjs/core';
import { AppModule } from './Modules/app.module';
import * as fs from 'fs';

async function bootstrap() {
  if (process.env.SSLKEY && process.env.SSLCERT) {
    const httpsOptions = {
      key: fs.readFileSync(process.env.SSLKEY),
      cert: fs.readFileSync(process.env.SSLCERT),
    };
    const app = await NestFactory.create(AppModule, {
      httpsOptions,
    });
    app.enableCors({
      origin: process.env.CORSORIGIN,
      optionsSuccessStatus: 200,
    });
    await app.listen(process.env.PORT || 3000);
  } else {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
      origin: process.env.CORSORIGIN,
      optionsSuccessStatus: 200,
    });
    await app.listen(process.env.PORT || 3000);
  }
}
bootstrap();
