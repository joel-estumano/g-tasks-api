import { Controller, Get, Redirect } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { Public } from './modules/auth/decorators/public.decorator';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Public()
    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Public()
    @Get('docs')
    @ApiExcludeEndpoint()
    @Redirect('/swagger', 302) // Redireciona para a rota do Swagger
    redirectToSwagger() {
        return;
    }
}
