import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000', // ✅ exact frontend origin
    credentials: true, // ✅ allow cookies
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: [
      'Authorization',
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
    ],
  });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  app.use(cookieParser());

  await app.listen(process.env.PORT ?? 1234);
}
bootstrap();
