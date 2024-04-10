import {Entity, PrimaryKey, Property, Unique} from "@mikro-orm/core";
import {GenderEnum} from "../../enums/gender.enum";

@Entity({tableName: 'users'})
export class UserEntity {
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

}