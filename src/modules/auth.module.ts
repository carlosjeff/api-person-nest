import { AuthController } from './../controllers/auth.controller';
import { Module } from '@nestjs/common';
import { LocalStrategy } from './../services/local.strategy';
import { AuthService } from './../services/auth.service';
import { UserModule } from './user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './../services/jwt-strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/services/constants';

@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: {expiresIn: '240s'}
        })
    ],
    controllers: [
        AuthController,],
    providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy
    ],
})
export class AuthModule { }
