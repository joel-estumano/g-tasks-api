import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { dbConfig, jwtConfig, jwtRefreshConfig } from './common/configs';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth/jwt-auth.guard';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { TasksModule } from './modules/tasks/tasks.module';

@Module({
    imports: [
        AuthModule,
        UsersModule,
        TasksModule,
        ConfigModule.forRoot({
            envFilePath: ['.env.local'],
            isGlobal: true,
            load: [dbConfig, jwtConfig, jwtRefreshConfig],
        }),
        MongooseModule.forRootAsync({
            inject: [dbConfig.KEY],
            useFactory: (dbConfigKey: ConfigType<typeof dbConfig>) => ({
                uri: dbConfigKey.uri,
            }),
        }),
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        },
    ],
})
export class AppModule {}
