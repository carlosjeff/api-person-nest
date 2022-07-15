import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from 'src/models/user.model';
import { Repository } from 'typeorm/repository/Repository';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService { 

    constructor(
        @InjectRepository(UserModel) private model: Repository<UserModel>
    ) { }

    public async create(user: UserModel): Promise<UserModel> {

        return this.hashing(user.password)
        .then(hash => user.password = hash)
        .then(() => this.model.save(user));
    }

    public async getOne(id: number): Promise<UserModel> {

        const user = await this.isExist(id);

        if(!user) throw new NotFoundException(`O id ${id} solicidado não foi encontrado!`);

        return user;
    }

    public async getAll(): Promise<UserModel[]> {
        return await this.model.find();
    }

    public async update(id: number, user: UserModel): Promise<UserModel> {

        if(!(await this.isExist(id))) throw new NotFoundException(`O id ${id} solicidado não foi encontrado!`);

        await this.model.update({ id }, user);

        return {id, ...user} as UserModel ;
    }

    public async delete(id: number): Promise<string> {

        if(!(await this.isExist(id))) throw new NotFoundException(`O id ${id} solicidado não foi encontrado!`);

        await this.model.delete(id)

        return `A pessoa com o id ${id} foi deletada com sucesso!`;
    }


    private async isExist(id: number){

        return await this.model.findOne( { where: {id} } );
    }


    private async hashing(password: string){
        const saltOrRounds = await bcrypt.genSalt();;
        const hash = await bcrypt.hash(password, saltOrRounds);
        return hash;
    }
}
