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

    const rawBodyBuffer = (req, res, buffer, encoding) => {
      console.log(req.headers);
      if (!req.headers['x-hub-signature-256']) {
        console.log('no here');

        return;
      }
      console.log('testing');

      if (buffer && buffer.length) {
        console.log('other');

        req.rawBody = buffer.toString(encoding || 'utf8');
      }
    };

    app.use(bodyParser.urlencoded({ verify: rawBodyBuffer, extended: true }));
    app.use(bodyParser.json({ verify: rawBodyBuffer }));

    await app.listen(process.env.PORT || 3000);
  } else {
    const app = await NestFactory.create(AppModule, {
      bodyParser: false,
    });
    app.enableCors({
      origin: process.env.CORSORIGIN,
      optionsSuccessStatus: 200,
    });

    const rawBodyBuffer = (req, res, buffer, encoding) => {
      console.log(req.headers);

      if (!req.headers['x-hub-signature-256']) {
        console.log('no here');
        return;
      }
      console.log('testing');

      if (buffer && buffer.length) {
        console.log('other');
        req.rawBody = buffer.toString(encoding || 'utf8');
      }
    };

    app.use(bodyParser.urlencoded({ verify: rawBodyBuffer, extended: true }));
    app.use(bodyParser.json({ verify: rawBodyBuffer }));

    await app.listen(process.env.PORT || 3000);
  }
}
bootstrap();
