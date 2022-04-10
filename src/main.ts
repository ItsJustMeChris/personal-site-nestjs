import { NestFactory } from '@nestjs/core';
import { AppModule } from './Modules/app.module';
import * as fs from 'fs';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  if (process.env.SSLKEY && process.env.SSLCERT) {
    const httpsOptions = {
      key: fs.readFileSync(process.env.SSLKEY),
      cert: fs.readFileSync(process.env.SSLCERT),
    };
    const app = await NestFactory.create(AppModule, {
      httpsOptions,
      bodyParser: false,
    });
    app.enableCors({
      origin: process.env.CORSORIGIN,
      optionsSuccessStatus: 200,
    });
    await app.listen(process.env.PORT || 3000);

    const rawBodyBuffer = (req, res, buffer, encoding) => {
      if (!req.headers['X-Hub-Signature-256']) {
        return;
      }

      if (buffer && buffer.length) {
        req.rawBody = buffer.toString(encoding || 'utf8');
      }
    };

    app.use(bodyParser.urlencoded({ verify: rawBodyBuffer, extended: true }));
    app.use(bodyParser.json({ verify: rawBodyBuffer }));
  } else {
    const app = await NestFactory.create(AppModule, {
      bodyParser: false,
    });
    app.enableCors({
      origin: process.env.CORSORIGIN,
      optionsSuccessStatus: 200,
    });
    await app.listen(process.env.PORT || 3000);

    const rawBodyBuffer = (req, res, buffer, encoding) => {
      if (!req.headers['X-Hub-Signature-256']) {
        return;
      }

      if (buffer && buffer.length) {
        req.rawBody = buffer.toString(encoding || 'utf8');
      }
    };

    app.use(bodyParser.urlencoded({ verify: rawBodyBuffer, extended: true }));
    app.use(bodyParser.json({ verify: rawBodyBuffer }));
  }
}
bootstrap();
