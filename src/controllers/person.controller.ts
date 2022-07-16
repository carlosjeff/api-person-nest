
import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonModel } from '../models/person.model';
import { Repository } from 'typeorm/repository/Repository';
import { PersonSchema } from 'src/schemas/person.schema';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { Role } from 'src/decorators/role.decorator';
import { RoleGuard } from 'src/guard/role.guard';

@Controller('/person')
export class PersonController {

    constructor(
        @InjectRepository(PersonModel) private model: Repository<PersonModel>
        ) { }

    @Post()
    public async create(@Body() body: PersonSchema): Promise<PersonModel> {
        
        return await this.model.save(body);
    }

    @Get(':id')
    public async getOne(@Param('id', ParseIntPipe) id: number ): Promise<PersonModel> {

        const person = await this.model.findOne({ where: { id } });

        if(!person) throw new NotFoundException(`O id ${id} solicidado não foi encontrado!`);
        
        return person;
    }

    @Role(['user'])
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Get()
    public async getAll(): Promise<PersonModel[]> {

        return await this.model.find();
    }

    @Put(':id')
    public async update(@Param('id', ParseIntPipe) id: number, @Body() body: PersonSchema): Promise<PersonModel> {
        const person = await this.model.findOne({ where: { id } });

        if(!person) throw new NotFoundException(`O id ${id} solicidado não foi encontrado!`);

        await this.model.update({ id }, body);

        return { id: id, ...body } as PersonModel;
    }

    @Delete(':id')
    public async delete(@Param('id', ParseIntPipe) id: number): Promise<string> {
        const person = await this.model.findOne({ where: { id } });

        if(!person) throw new NotFoundException(`O id ${id} solicidado não foi encontrado!`);

        await this.model.delete(id);

        return `A pessoa com o id ${id} foi deletada com sucesso!`;
    }
}
