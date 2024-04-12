import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import configuration from "../config/configuration";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const globalPrefix = 'api';

    app.enableCors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 204,
    });
    app.setGlobalPrefix(globalPrefix);
    await app.listen(configuration().port);
    console.log(`Server running on http://localhost:${configuration().port}/${globalPrefix}`)
}

bootstrap();
