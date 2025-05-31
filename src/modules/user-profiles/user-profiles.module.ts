import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserProfileEntity, UserProfileSchema } from './entities/user-profile.entity';
import { UserProfilesService } from './user-profiles.service';
import { UserProfilesController } from './user-profiles.controller';

@Module({
    imports: [MongooseModule.forFeature([{ name: UserProfileEntity.name, schema: UserProfileSchema }])],
    exports: [MongooseModule],
    providers: [UserProfilesService],
    controllers: [UserProfilesController],
})
export class UserProfilesModule {}
