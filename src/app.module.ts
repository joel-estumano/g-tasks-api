import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { dbConfig } from './common/configs';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/users/users.module';

@Module({
    imports: [
        UsersModule,
        ConfigModule.forRoot({
            envFilePath: ['.env.local'],
            isGlobal: true,
            load: [dbConfig],
        }),
        MongooseModule.forRootAsync({
            inject: [dbConfig.KEY],
            useFactory: async (dbConfigKey: ConfigType<typeof dbConfig>) => ({
                uri: dbConfigKey.uri,
            }),
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
