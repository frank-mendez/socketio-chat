import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import configuration from "../config/configuration";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(configuration().port);
  console.log(`Server running on http://localhost:${configuration().port}`)
}
bootstrap();
