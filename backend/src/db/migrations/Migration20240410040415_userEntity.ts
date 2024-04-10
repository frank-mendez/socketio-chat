import { Migration } from '@mikro-orm/migrations';

export class Migration20240410040415_userEntity extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "users" ("id" serial primary key, "username" varchar(255) not null, "password" varchar(255) not null);');
    this.addSql('alter table "users" add constraint "users_username_unique" unique ("username");');
  }

}
