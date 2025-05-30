import { API_BEARER_AUTH_SCHEME } from '@common/constants/names.tokens.ts';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes';

export const setupSwagger = (app: INestApplication): void => {
    // 📌 Define o título da documentação da API
    const title = 'G Tasks';

    // 🏗️ Configura os detalhes da documentação Swagger
    const config = new DocumentBuilder()
        .setTitle(title) // 📝 Define o título da API
        .setDescription('API documentation') // 📄 Adiciona uma breve descrição
        .setVersion('1.0') // 🔢 Define a versão da API
        .setContact(title, 'https://www.joelestumano.com', 'joelestumano@gmail.com') // 📧 Adiciona informações de contato
        .addBearerAuth(
            // 🔑 Configura autenticação Bearer para segurança
            { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
            API_BEARER_AUTH_SCHEME,
        )
        .build();

    // 📜 Cria o documento Swagger com base na configuração definida
    const document = SwaggerModule.createDocument(app, config);

    // 🎨 Configuração do tema para personalizar a aparência do Swagger
    const theme = new SwaggerTheme();
    const options = {
        explorer: false, // 🔍 Desativa a opção de exploração automática da API
        customCss: theme.getBuffer(SwaggerThemeNameEnum.DARK), // 🌑 Aplica tema escuro ao Swagger
        swaggerOptions: {
            persistAuthorization: true, // 🔒 Mantém a autorização persistente entre sessões
        },
        customSiteTitle: title, // 🏷️ Define o título personalizado no Swagger UI
    };

    // 🚀 Configura e inicia o Swagger na aplicação
    SwaggerModule.setup('swagger', app, document, options);
};
