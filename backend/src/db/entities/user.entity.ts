import {
    BeforeCreate,
    BeforeUpdate,
    Collection,
    Entity, ManyToMany,
    PrimaryKey,
    Property,
    Unique
} from "@mikro-orm/core";
import {GenderEnum} from "../../enums/gender.enum";
import {ConversationEntity} from "./conversation.entity";

@Entity({tableName: 'users'})
export class UserEntity {
    constructor(dto: Partial<UserEntity>) {
        Object.assign(this, dto);
    }

    @PrimaryKey()
    id: number;

    @Property()
    @Unique()
    username: string;

    @Property()
    fullName: string;

    @Property({ hidden: true})
    password: string;

    @Property()
    gender: GenderEnum;

    @Property()
    profilePicture: string;

    @ManyToMany(() => ConversationEntity, (conversation) => conversation.participants, { nullable: false, owner: true})
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