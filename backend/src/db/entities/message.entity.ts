import {
    Collection,
    Entity, ManyToMany,
    ManyToOne,
    PrimaryKey,
    Property
} from "@mikro-orm/core";
import {UserEntity} from "./user.entity";
import {ConversationEntity} from "./conversation.entity";

@Entity({tableName: 'messages'})
export class MessageEntity {
    constructor(dto: Partial<MessageEntity>) {
        Object.assign(this, dto);
    }

    @PrimaryKey()
    id: number;

    @ManyToOne(() => UserEntity, {name: 'sender_id', nullable: false})
    sender: UserEntity;

    @ManyToOne(() => UserEntity, {name: 'receiver_id', nullable: false})
    receiver: UserEntity;

    @Property()
    message: string;

    @ManyToMany(() => ConversationEntity, (conversation) => conversation.messages, {nullable: false, owner: true})
    conversations = new Collection<ConversationEntity>(this);

    @Property({type: 'datetime'})
    createdAt = new Date();

    @Property({onUpdate: () => new Date(), type: 'datetime'})
    updatedAt = new Date();
}