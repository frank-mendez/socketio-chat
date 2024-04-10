import {Entity, PrimaryKey, Property, Unique} from "@mikro-orm/core";

@Entity({tableName: 'users'})
export class UserEntity {
    @PrimaryKey()
    id: number;

    @Property()
    @Unique()
    username: string;

    @Property()
    password: string;
}