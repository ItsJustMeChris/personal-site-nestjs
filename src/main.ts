import { NestFactory } from '@nestjs/core';
import { AppModule } from './Modules/app.module';
import * as fs from 'fs';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const corsorigins = process.env.CORSORIGIN.split(',');

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
      origin: function (origin, callback) {
        if (!origin || corsorigins.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      optionsSuccessStatus: 200,
    });

    const rawBodyBuffer = (req, res, buffer, encoding) => {
      if (!req.headers['x-hub-signature-256']) {
        return;
      }

      if (buffer && buffer.length) {
        req.rawBody = buffer.toString(encoding || 'utf8');
      }
    };

    app.use(
      bodyParser.urlencoded({
        verify: rawBodyBuffer,
        extended: true,
        limit: '50mb',
        parameterLimit: 100000,
      }),
    );
    app.use(bodyParser.json({ verify: rawBodyBuffer, limit: '50mb' }));

    await app.listen(process.env.PORT || 3000);
  } else {
    const app = await NestFactory.create(AppModule, {
      bodyParser: false,
    });

    app.enableCors({
      origin: function (origin, callback) {
        if (!origin || corsorigins.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      optionsSuccessStatus: 200,
    });

    const rawBodyBuffer = (req, res, buffer, encoding) => {
      if (!req.headers['x-hub-signature-256']) {
        return;
      }

      if (buffer && buffer.length) {
        req.rawBody = buffer.toString(encoding || 'utf8');
      }
    };

    app.use(bodyParser.urlencoded({ verify: rawBodyBuffer, extended: true }));
    app.use(bodyParser.json({ verify: rawBodyBuffer }));

    await app.listen(process.env.PORT || 3000);
  }
}
bootstrap();
