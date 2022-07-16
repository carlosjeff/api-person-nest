import { AuthModule } from './modules/auth.module';
import { UserModule } from './modules/user.module';
import { PersonModule } from './modules/person.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonModel } from './models/person.model';
import { UserModel } from './models/user.model';

@Module({
  imports: [
    AuthModule,
    UserModule,
    PersonModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Cjb@2015',
      database: 'person',
      entities: [PersonModel, UserModel],
      synchronize: true,
    }),
  ]
})
export class AppModule { }
