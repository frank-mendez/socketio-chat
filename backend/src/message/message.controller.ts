import {Body, Controller, Post, UseGuards, Request, Get, Param, MethodNotAllowedException} from '@nestjs/common';
import {MessageService} from "./message.service";
import {AuthGuard} from "../auth/auth.guard";
import {SendMessageDto} from "./dto";

@Controller('messages')
export class MessageController {

    constructor(private messageService: MessageService) {
    }

    @UseGuards(AuthGuard)
    @Post('send')
    async sendMessage(@Body() sendMessageDto: SendMessageDto, @Request() req) {
        // Validate the request user and receiver id
        if (+req.user.id === +sendMessageDto.receiver) {
            throw new MethodNotAllowedException('You cannot send message to yourself');
        }

        return await this.messageService.sendMessage({
            sender: req.user.id,
            receiver: sendMessageDto.receiver,
            message: sendMessageDto.message
        });
    }

    @UseGuards(AuthGuard)
    @Get('/:id')
    async getMessages(@Param('id') id: number, @Request() req) {
        // Validate the request user and receiver id
        if (+req.user.id === +id) {
            throw new MethodNotAllowedException('You cannot get messages from yourself');
        }

        return await this.messageService.getMessages({
            senderId: req.user.id,
            receiverId: id
        });
    }

}
