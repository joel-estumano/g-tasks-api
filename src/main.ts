import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './swagger.config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const logger = new Logger('main');

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true, // Remove automaticamente propriedades desconhecidas que não estão definidas nos DTOs.
            transform: true, // Converte os valores para os tipos esperados nos DTOs, por exemplo, de string para número.
        }),
    );

    setupSwagger(app);

    await app.listen(process.env.PORT || 3000);
    logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
