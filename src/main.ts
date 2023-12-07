import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PosMiddleware } from './room-information/middleware/pos.middleware';
import bodyParser from 'body-parser';
import xmlParser from 'body-parser-xml';

// This is necessary because body-parser-xml adds an xml method to the bodyParser object
xmlParser(bodyParser);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(PosMiddleware); // Apply globally
  app.use(bodyParser.xml());
  await app.listen(3000);
}
bootstrap();
