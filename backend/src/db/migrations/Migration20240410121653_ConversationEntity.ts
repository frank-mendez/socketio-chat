import { Migration } from '@mikro-orm/migrations';

export class Migration20240410121653_ConversationEntity extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "conversations" ("id" serial primary key, "created_at" date not null, "updated_at" date not null);');

    this.addSql('alter table "users" add column "conversations_id" int null;');
    this.addSql('alter table "users" add constraint "users_conversations_id_foreign" foreign key ("conversations_id") references "conversations" ("id") on update cascade on delete set null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "users" drop constraint "users_conversations_id_foreign";');

    this.addSql('alter table "users" drop column "conversations_id";');
  }

}
