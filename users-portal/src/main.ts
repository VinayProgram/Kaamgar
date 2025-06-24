import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{cors: true});

app.enableCors({
  origin: 'http://localhost:3000', // <-- ✅ must match Referer/Origin
  credentials: true,
});
  app.use(cookieParser());

  await app.listen(process.env.PORT ?? 1234);
}
bootstrap();
