import { Body, Controller, Post, Get, Put, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { UserModel } from 'src/models/user.model';
import { UserSchema } from 'src/schemas/user.schema';
import { UserService } from 'src/services/user.service';


@Controller('/user')
export class UserController { 

    constructor(private userService: UserService,) {}

    @Post()
    public async create(@Body() body: UserSchema): Promise<UserModel>{
        return this.userService.create(body as UserModel);
    }

    @Get(':id')
    public async getOne(@Param('id', ParseIntPipe) id: number): Promise<UserModel>{
        return this.userService.getOne(id);
    }

    @Get()
    public async getAll(): Promise<UserModel[]>{
        return this.userService.getAll();
    }

    @Put(':id')
    public async update(@Param('id', ParseIntPipe) id: number, @Body() body: UserSchema): Promise<UserModel>{
        return this.userService.update(id,body as UserModel);
    }

    @Delete(':id')
    public async delete(@Param('id', ParseIntPipe) id: number): Promise<string>{
        return this.userService.delete(id);
    }


}
