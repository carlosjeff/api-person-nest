import { PersonModule } from './modules/person.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    PersonModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Cjb@2015',
      database: 'person',
      entities: ["dist/**/*.model.js"],
      synchronize: true,
    }),
  ]
})
export class AppModule { }
