import { Controller, Get, Redirect } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiExcludeEndpoint, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Public } from './modules/auth/decorators/public.decorator';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Public()
    @Get()
    @ApiOperation({
        summary: 'Returns a greeting message',
        description: 'This endpoint returns a simple "Hello World" message as a response.',
    })
    @ApiOkResponse({
        description: 'A successful response containing the greeting message.',
        type: String,
    })
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
