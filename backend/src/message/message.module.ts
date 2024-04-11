import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import {AuthModule} from "../auth/auth.module";
import {UserModule} from "../user/user.module";
import {JwtModule} from "@nestjs/jwt";
import * as dotenv from 'dotenv'
import {MikroOrmModule} from "@mikro-orm/nestjs";
import {ConversationEntity, MessageEntity, UserEntity} from "../db/entities";
dotenv.config()

@Module({
  imports: [
      AuthModule,
      UserModule,
      JwtModule.register({
          secret  : process.env.JWT_SECRET,
          signOptions: { expiresIn: '1d' },
      }),
      MikroOrmModule.forFeature([UserEntity, MessageEntity, ConversationEntity])
  ],
  providers: [MessageService],
  controllers: [MessageController]
})
export class MessageModule {}
