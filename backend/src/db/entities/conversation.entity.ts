import {
    Collection,
    Entity, ManyToMany,
    PrimaryKey,
    Property
} from "@mikro-orm/core";
import {UserEntity} from "./user.entity";
import {MessageEntity} from "./message.entity";

@Entity({tableName: 'conversations'})
export class ConversationEntity {
    @PrimaryKey()
    id: number;

    @ManyToMany(() => UserEntity, (user) => user.conversations, {nullable: true, name: 'user'})
    participants = new Collection<UserEntity>(this);

    @ManyToMany(() => MessageEntity, (message) => message.conversations, {nullable: true, name: 'message'})
    messages = new Collection<MessageEntity>(this);


    @Property({type: 'datetime'})
    createdAt = new Date();

    @Property({onUpdate: () => new Date(), type: 'datetime'})
    updatedAt = new Date();
}