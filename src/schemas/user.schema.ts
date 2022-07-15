import { IsEmail, IsInt, IsString, MaxLength, Min, MinLength } from "class-validator";


export class UserSchema {

    @IsString()
    @MaxLength(120)
    name: string;
    
    @IsString()
    @MaxLength(255)
    @IsEmail()
    email:string;

    @IsString()
    @MaxLength(255)
    @MinLength(8)
    password: string;
}