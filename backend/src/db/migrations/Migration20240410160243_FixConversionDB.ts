import { Migration } from '@mikro-orm/migrations';

export class Migration20240410160243_FixConversionDB extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "messages_conversations" ("message_entity_id" int not null, "conversation_entity_id" int not null, constraint "messages_conversations_pkey" primary key ("message_entity_id", "conversation_entity_id"));');

    this.addSql('create table "users_conversations" ("user_entity_id" int not null, "conversation_entity_id" int not null, constraint "users_conversations_pkey" primary key ("user_entity_id", "conversation_entity_id"));');

    this.addSql('alter table "messages_conversations" add constraint "messages_conversations_message_entity_id_foreign" foreign key ("message_entity_id") references "messages" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "messages_conversations" add constraint "messages_conversations_conversation_entity_id_foreign" foreign key ("conversation_entity_id") references "conversations" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "users_conversations" add constraint "users_conversations_user_entity_id_foreign" foreign key ("user_entity_id") references "users" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "users_conversations" add constraint "users_conversations_conversation_entity_id_foreign" foreign key ("conversation_entity_id") references "conversations" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "users" drop constraint "users_conversations_id_foreign";');

    this.addSql('alter table "users" drop column "conversations_id";');

    this.addSql('alter table "messages" drop constraint "messages_receiver_id_unique";');
    this.addSql('alter table "messages" drop constraint "messages_sender_id_unique";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "messages" add constraint "messages_receiver_id_unique" unique ("receiver_id");');
    this.addSql('alter table "messages" add constraint "messages_sender_id_unique" unique ("sender_id");');

    this.addSql('alter table "users" add column "conversations_id" int4 null;');
    this.addSql('alter table "users" add constraint "users_conversations_id_foreign" foreign key ("conversations_id") references "conversations" ("id") on update cascade on delete set null;');
  }

}
