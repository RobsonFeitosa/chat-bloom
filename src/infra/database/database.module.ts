import { Module } from '@nestjs/common';
import { TypeormUsersRepository } from './typeorm/repositories/typeorm-users-repository';

import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmService } from './typeorm/typeorm.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: process.env.DB_MYSQL_HOST,
        port: Number(process.env.DB_MYSQL_PORT),
        username: process.env.DB_MYSQL_USERNAME,
        password: process.env.DB_MYSQL_PASSWORD,
        database: process.env.DB_MYSQL_DATABASE,
        entities: [__dirname + '/../../app/entities/*{.ts,.js}'],
        migrations: [__dirname + '/migrations/*{.ts,.js}'],
        synchronize: false,
      }),
    }),
  ],
  providers: [TypeOrmService, TypeormUsersRepository],
  exports: [TypeOrmService, TypeormUsersRepository],
})
export class DatabaseModule {}
