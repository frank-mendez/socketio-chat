import {Body, Controller, Post, UseGuards, Request} from '@nestjs/common';
import {JwtAuthGuard} from "../auth/jwt/jwt.auth.guard";
import {SendMessageDto} from "./dto/send-message.dto";
import {MessageService} from "./message.service";
import {AuthGuard} from "../auth/auth.guard";

@Controller('message')
export class MessageController {

    constructor(private messageService: MessageService) {
    }

    @UseGuards(AuthGuard)
    @Post('send')
    async sendMessage(@Body() sendMessageDto: SendMessageDto, @Request() req)  {
        return await this.messageService.sendMessage({
            sender: req.user.id,
            receiver: sendMessageDto.receiver,
            message: sendMessageDto.message
        });
    }

}
