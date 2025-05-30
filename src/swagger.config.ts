import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes';
import { API_BEARER_AUTH_SCHEME } from '@common/constants/names.tokens.ts';

export const setupSwagger = (app: INestApplication): void => {
    const title = 'G Tasks';
    const config = new DocumentBuilder()
        .setTitle(title)
        .setDescription('API documentation')
        .setVersion('1.0')
        .setContact(title, 'https://www.joelestumano.com', 'joelestumano@gmail.com')
        .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, API_BEARER_AUTH_SCHEME)
        .build();

    const document = SwaggerModule.createDocument(app, config);
    const theme = new SwaggerTheme();
    const options = {
        explorer: false,
        customCss: theme.getBuffer(SwaggerThemeNameEnum.DARK),
        swaggerOptions: {
            persistAuthorization: true,
        },
        customSiteTitle: title,
    };
    SwaggerModule.setup('swagger', app, document, options);
};
