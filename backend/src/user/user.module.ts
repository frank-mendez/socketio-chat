import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import {MikroOrmModule} from "@mikro-orm/nestjs";
import {UserEntity} from "../db/entities/user.entity";
import {UserService} from "./user.service";
import {JwtModule} from "@nestjs/jwt";

@Module({
  imports: [
      MikroOrmModule.forFeature([UserEntity])
  ],
  controllers: [UserController],
  providers:[UserService],
  exports: [UserService]
})
export class UserModule {}
