import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
       private userService: UserService,
       private jwtService: JwtService
    ) {}

    public async validateUser(userEmail: string, UserPassword: string) {

        const user = await this.userService.getByEmail(userEmail);
        if(!user){
            return null
        }

        const isMatch = await bcrypt.compare(UserPassword, user.password);

        if(isMatch) {
            const { id, name, email, role} = user;
            return { id, name, email, role};
        }

        return null;
    }

    public async login(user: any) {    
        const payload = { 
            sub: user.id,
            email: user.email, 
            role: user.role
        };
        return { access_token: this.jwtService.sign(payload)}
    }

 }
