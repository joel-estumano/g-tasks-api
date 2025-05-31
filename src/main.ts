import { HttpExceptionFilter } from '@common/filters/http-exception.filter';

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { setupSwagger } from './swagger.config';

async function bootstrap() {
    // 🚀 Inicializa a aplicação NestJS usando o módulo principal
    const app = await NestFactory.create(AppModule);

    // 📝 Cria um logger para registrar mensagens no console
    const logger = new Logger('main');

    // ⚠️ Aplica um filtro global para captura e tratamento de exceções HTTP
    app.useGlobalFilters(new HttpExceptionFilter());

    // ✅ Configura pipes globais para validação de dados recebidos na API
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true, // ✂️ Remove automaticamente propriedades desconhecidas que não estão definidas nos DTOs
            transform: true, // 🔄 Converte valores para os tipos esperados nos DTOs (ex: string para número)
        }),
    );

    // 📜 Configura a documentação Swagger para a API, facilitando o uso e integração
    setupSwagger(app);

    // 🌍 Inicia o servidor na porta definida na variável de ambiente ou, caso não haja, na porta 3000
    await app.listen(process.env.PORT || 3000);

    // 🔎 Obtém e registra a URL da aplicação no console para facilitar o acesso
    logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
