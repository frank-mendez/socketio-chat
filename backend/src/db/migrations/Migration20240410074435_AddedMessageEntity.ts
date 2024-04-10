import { Migration } from '@mikro-orm/migrations';

export class Migration20240410074435_AddedMessageEntity extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "messages" ("id" serial primary key, "sender_id_id" int not null, "receiver_id_id" int not null, "message" varchar(255) not null, "created_at" date not null, "updated_at" date not null);');
    this.addSql('alter table "messages" add constraint "messages_sender_id_id_unique" unique ("sender_id_id");');
    this.addSql('alter table "messages" add constraint "messages_receiver_id_id_unique" unique ("receiver_id_id");');

    this.addSql('alter table "messages" add constraint "messages_sender_id_id_foreign" foreign key ("sender_id_id") references "users" ("id") on update cascade;');
    this.addSql('alter table "messages" add constraint "messages_receiver_id_id_foreign" foreign key ("receiver_id_id") references "users" ("id") on update cascade;');
  }

}
