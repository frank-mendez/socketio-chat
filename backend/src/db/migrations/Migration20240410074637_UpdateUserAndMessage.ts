import { Migration } from '@mikro-orm/migrations';

export class Migration20240410074637_UpdateUserAndMessage extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "messages" drop constraint "messages_sender_id_id_foreign";');
    this.addSql('alter table "messages" drop constraint "messages_receiver_id_id_foreign";');

    this.addSql('alter table "users" add column "updated_at" date not null;');
    this.addSql('alter table "users" alter column "created_at" type date using ("created_at"::date);');

    this.addSql('alter table "messages" drop constraint "messages_sender_id_id_unique";');
    this.addSql('alter table "messages" drop constraint "messages_receiver_id_id_unique";');
    this.addSql('alter table "messages" drop column "sender_id_id", drop column "receiver_id_id";');

    this.addSql('alter table "messages" add column "sender_id" int not null, add column "receiver_id" int not null;');
    this.addSql('alter table "messages" add constraint "messages_sender_id_foreign" foreign key ("sender_id") references "users" ("id") on update cascade;');
    this.addSql('alter table "messages" add constraint "messages_receiver_id_foreign" foreign key ("receiver_id") references "users" ("id") on update cascade;');
    this.addSql('alter table "messages" add constraint "messages_sender_id_unique" unique ("sender_id");');
    this.addSql('alter table "messages" add constraint "messages_receiver_id_unique" unique ("receiver_id");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "messages" drop constraint "messages_sender_id_foreign";');
    this.addSql('alter table "messages" drop constraint "messages_receiver_id_foreign";');

    this.addSql('alter table "users" drop column "updated_at";');

    this.addSql('alter table "users" alter column "created_at" type timestamptz using ("created_at"::timestamptz);');

    this.addSql('alter table "messages" drop constraint "messages_sender_id_unique";');
    this.addSql('alter table "messages" drop constraint "messages_receiver_id_unique";');
    this.addSql('alter table "messages" drop column "sender_id", drop column "receiver_id";');

    this.addSql('alter table "messages" add column "sender_id_id" int not null, add column "receiver_id_id" int not null;');
    this.addSql('alter table "messages" add constraint "messages_sender_id_id_foreign" foreign key ("sender_id_id") references "users" ("id") on update cascade;');
    this.addSql('alter table "messages" add constraint "messages_receiver_id_id_foreign" foreign key ("receiver_id_id") references "users" ("id") on update cascade;');
    this.addSql('alter table "messages" add constraint "messages_sender_id_id_unique" unique ("sender_id_id");');
    this.addSql('alter table "messages" add constraint "messages_receiver_id_id_unique" unique ("receiver_id_id");');
  }

}
