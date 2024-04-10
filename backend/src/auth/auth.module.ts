import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {JwtModule, JwtService} from "@nestjs/jwt";
import {JwtStrategy} from "./jwt/jwt.auth";
import {PassportModule} from "@nestjs/passport";
import * as dotenv from 'dotenv'
import {LocalStrategy} from "./local.auth";
import {UserModule} from "../user/user.module";
import {MikroOrmModule} from "@mikro-orm/nestjs";
import {UserEntity} from "../db/entities/user.entity";
dotenv.config()

@Module({
  imports: [
      UserModule,
      PassportModule,
      JwtModule.register({
            secret  : process.env.JWT_SECRET,
          signOptions: { expiresIn: '1d' },
      }),
      MikroOrmModule.forFeature([UserEntity])
  ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    exports: [AuthService]
})
export class AuthModule {}
