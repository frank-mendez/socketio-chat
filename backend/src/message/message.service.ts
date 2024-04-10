import {Injectable, NotFoundException} from '@nestjs/common';
import {SendServiceDto} from "./dto/send-service.dto";
import {InjectRepository} from "@mikro-orm/nestjs";
import {ConversationEntity, MessageEntity, UserEntity} from "../db/entities";
import {EntityRepository, FindOptions, wrap} from "@mikro-orm/postgresql";
import {EntityManager} from "@mikro-orm/core";

@Injectable()
export class MessageService {
    constructor(
        @InjectRepository(MessageEntity)
        private readonly messageRepository: EntityRepository<MessageEntity>,
        @InjectRepository(ConversationEntity)
        private readonly conversationEntity: EntityRepository<ConversationEntity>,
        @InjectRepository(UserEntity)
        private readonly userEntity: EntityRepository<UserEntity>,
        private readonly em: EntityManager
    ) {
    }

    async sendMessage(sendServiceDto: SendServiceDto) {
        try {
            const {receiver, message, sender} = sendServiceDto;

            const userReceiver = await this.userEntity.findOne({id: receiver});
            const userSender = await this.userEntity.findOne({id: sender});

            if (!userReceiver) {
                throw new Error('Receiver not found');
            }

            if (!userSender) {
                throw new Error('Sender not found');
            }
            // Check if conversation already exists
            let conversationExist = await this.conversationEntity.findOne({
                $and: [
                    {participants: {id: userSender.id}},
                    {participants: {id: userReceiver.id}}
                ]
            });

            console.log('conversationExist', conversationExist);
            const newMessage = new MessageEntity({
                message,
                sender: userSender,
                receiver: userReceiver
            });

            await this.em.persistAndFlush(newMessage);

            if(!conversationExist) {
                console.log('does not exist');
                const newConversation = new ConversationEntity();
                newConversation.participants.add(userSender);
                newConversation.participants.add(userReceiver);
                newConversation.messages.add(newMessage);
                await this.em.persistAndFlush(newConversation);
            } else {
                console.log('exists');
                conversationExist.messages.add(newMessage);
                await this.em.persistAndFlush(conversationExist);
            }

        } catch (e) {
            throw new NotFoundException(e.message);
        }

    }
}
