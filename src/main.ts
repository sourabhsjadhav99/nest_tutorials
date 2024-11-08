import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true, // to avoid unknown properties
    forbidNonWhitelisted: true, // to throw error for unknown properties
    transform: true // to make instance of dto
  }))
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
