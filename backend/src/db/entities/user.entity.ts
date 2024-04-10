import {Entity, PrimaryKey, Property, Unique} from "@mikro-orm/core";
import {GenderEnum} from "../../enums/gender.enum";

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

    @Property()
    password: string;

    @Property()
    gender: GenderEnum;

    @Property()
    profilePicture: string;

    @Property({ name: 'created_at' })
    createdAt = new Date();

}