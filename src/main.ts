import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const publicPath = join(__dirname, '../../', 'front-build');

  const port = 8080
  console.log(`[Nest] Server port: ${port}`)

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204,
    "allowedHeaders": "*",
    "exposedHeaders": "*"
  })
  app.useGlobalPipes(new ValidationPipe({ 
    whitelist: true,
    transform: true
  }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useStaticAssets(publicPath);
  await app.listen(port);
}
bootstrap();
