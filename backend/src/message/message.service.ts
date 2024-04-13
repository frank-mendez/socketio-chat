import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@mikro-orm/nestjs";
import {ConversationEntity, MessageEntity, UserEntity} from "../db/entities";
import {EntityRepository} from "@mikro-orm/postgresql";
import {EntityManager} from "@mikro-orm/core";
import {GetMessagesDto, SendServiceDto} from "./dto";
import {AppGateway} from "../app.gateway";

@Injectable()
export class MessageService {
    constructor(
        @InjectRepository(MessageEntity)
        private readonly messageRepository: EntityRepository<MessageEntity>,
        @InjectRepository(ConversationEntity)
        private readonly conversationEntity: EntityRepository<ConversationEntity>,
        @InjectRepository(UserEntity)
        private readonly userEntity: EntityRepository<UserEntity>,
        private readonly em: EntityManager,
        private readonly appGateway: AppGateway
    ) {
    }

    async sendMessage(sendServiceDto: SendServiceDto) {
        try {
            const {receiver, message, sender} = sendServiceDto;

            // Verify if sender and receiver exist
            const {userReceiver, userSender} = await this.verifyUserConversation(sender, receiver);

            // Check if conversation already exists
            let conversationExist = await this.conversationEntity.findOne({
                $and: [
                    {participants: {id: userSender.id}},
                    {participants: {id: userReceiver.id}}
                ]
            });

            const newMessage = new MessageEntity({
                message,
                sender: userSender,
                receiver: userReceiver
            });

            await this.em.persistAndFlush(newMessage);

            if (!conversationExist) {
                const newConversation = new ConversationEntity();
                newConversation.participants.add(userSender);
                newConversation.participants.add(userReceiver);
                newConversation.messages.add(newMessage);
                await this.em.persistAndFlush(newConversation);
            } else {
                conversationExist.messages.add(newMessage);
                await this.em.persistAndFlush(conversationExist);
            }

            // Socket.io will be implemented here
            const receiverSocket = this.appGateway.getReceiverSocketId(receiver.toString());
            if (receiverSocket) {
                console.log('receiverSocket', receiverSocket);
                this.appGateway.server.to(receiverSocket).emit('newMessage', newMessage);
            }

            return {
                id: newMessage.id,
                sender,
                receiver,
                message: newMessage.message,
                createdAt: newMessage.createdAt,
                updatedAt: newMessage.updatedAt,
                conversations: newMessage.conversations
            }

        } catch (e) {
            throw new NotFoundException(e.message);
        }

    }

    async getMessages(getMessageDto: GetMessagesDto) {
        const {receiverId, senderId} = getMessageDto;
        try {
            // Verify if sender and receiver exist
            const {userReceiver, userSender} = await this.verifyUserConversation(senderId, receiverId);

            return await this.conversationEntity.findOne({
                $and: [
                    {participants: {id: userReceiver.id}},
                    {participants: {id: userSender.id}}
                ]
            }, {populate: ['messages']});
        } catch (e) {
            throw new NotFoundException('Conversation not found');
        }
    }

    async verifyUserConversation(senderId: number, receiverId: number): Promise<{
        userReceiver: UserEntity,
        userSender: UserEntity
    }> {
        const userReceiver = await this.userEntity.findOne({id: receiverId});
        const userSender = await this.userEntity.findOne({id: senderId});

        if (!userReceiver) {
            throw new NotFoundException('Receiver not found')
        }

        if (!userSender) {
            throw new NotFoundException('Sender not found');
        }

        return {
            userReceiver,
            userSender
        };
    }
}
