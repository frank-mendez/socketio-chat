import {
    BeforeCreate,
    BeforeUpdate, Collection,
    Entity, ManyToMany,
    ManyToOne,
    OneToMany,
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

    @ManyToOne(() => UserEntity, { name: 'sender_id', nullable: false })
    sender: UserEntity;

    @ManyToOne(() => UserEntity, { name: 'receiver_id', nullable: false })
    receiver: UserEntity;

    @Property()
    message: string;

    @ManyToMany(() => ConversationEntity, (conversation) => conversation.messages, { nullable: false, owner: true})
    conversations = new Collection<ConversationEntity>(this);

    @Property({ type: 'date' })
    createdAt = new Date();

    @Property({ onUpdate: () => new Date(), type: 'date' })
    updatedAt = new Date();

    @BeforeCreate()
    protected onBeforeCreate(): void {
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    @BeforeUpdate()
    protected onBeforeUpdate(): void {
        this.updatedAt = new Date();
    }
}