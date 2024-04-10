import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import {MikroOrmModule} from "@mikro-orm/nestjs";
import {UserService} from "./user.service";
import {UserEntity} from "../db/entities";

@Module({
  imports: [
      MikroOrmModule.forFeature([UserEntity])
  ],
  controllers: [UserController],
  providers:[UserService],
  exports: [UserService]
})
export class UserModule {}
