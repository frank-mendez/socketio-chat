import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import {MikroOrmModule} from "@mikro-orm/nestjs";
import {UserService} from "./user.service";
import {UserEntity} from "../db/entities";
import {JwtModule} from "@nestjs/jwt";

@Module({
  imports: [
      JwtModule.register({
        secret  : process.env.JWT_SECRET,
        signOptions: { expiresIn: '1d' },
      }),
      MikroOrmModule.forFeature([UserEntity])
  ],
  controllers: [UserController],
  providers:[UserService],
  exports: [UserService]
})
export class UserModule {}
