import { UserModel } from 'src/models/user.model';
import { UserService } from './../services/user.service';
import { UserController } from './../controllers/user.controller';


import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([UserModel])],
    controllers: [UserController,],
    providers: [UserService,],
    exports: [UserService]
})
export class UserModule { }
