import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { dbConfig, jwtConfig, jwtRefreshConfig } from './common/configs';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth/jwt-auth.guard';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksModule } from './modules/tasks/tasks.module';
import { UsersModule } from './modules/users/users.module';

@Module({
    imports: [
        // 🔐 Módulo de autenticação, responsável por login e controle de acesso
        AuthModule,

        // 👤 Módulo de usuários, gerencia operações como criação e atualização de perfis
        UsersModule,

        // ✅ Módulo de tarefas, usado para criar, listar e gerenciar atividades
        TasksModule,

        // ⚙️ Configuração global do ambiente com variáveis do arquivo .env.local
        ConfigModule.forRoot({
            envFilePath: ['.env.local'], // 📂 Arquivo de variáveis de ambiente
            isGlobal: true, // 🌎 Torna acessível em toda a aplicação
            load: [dbConfig, jwtConfig, jwtRefreshConfig], // ⚡️ Carrega configurações do banco, JWT e refresh token
        }),

        // 🛢️ Configuração assíncrona do banco de dados usando Mongoose (MongoDB)
        MongooseModule.forRootAsync({
            inject: [dbConfig.KEY], // 🔑 Injeta chave de configuração do banco de dados
            useFactory: (dbConfigKey: ConfigType<typeof dbConfig>) => ({
                uri: dbConfigKey.uri, // 🌐 Define a URL do banco de dados
            }),
        }),
    ],

    controllers: [
        // 🎮 Controlador principal da aplicação, gerencia as rotas e lógica principal
        AppController,
    ],

    providers: [
        // ⚙️ Serviço principal da aplicação, responsável por lógica de negócios
        AppService,
        {
            // 🛡️ Define um guardião global de autenticação usando JWT
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        },
    ],
})
export class AppModule {}
