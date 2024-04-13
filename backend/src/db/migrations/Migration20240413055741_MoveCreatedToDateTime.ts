import { Migration } from '@mikro-orm/migrations';

export class Migration20240413055741_MoveCreatedToDateTime extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "conversations" alter column "created_at" type timestamptz using ("created_at"::timestamptz);');
    this.addSql('alter table "conversations" alter column "updated_at" type timestamptz using ("updated_at"::timestamptz);');

    this.addSql('alter table "users" alter column "created_at" type timestamptz using ("created_at"::timestamptz);');
    this.addSql('alter table "users" alter column "updated_at" type timestamptz using ("updated_at"::timestamptz);');

    this.addSql('alter table "messages" alter column "created_at" type timestamptz using ("created_at"::timestamptz);');
    this.addSql('alter table "messages" alter column "updated_at" type timestamptz using ("updated_at"::timestamptz);');
  }

  async down(): Promise<void> {
    this.addSql('alter table "conversations" alter column "created_at" type date(0) using ("created_at"::date(0));');
    this.addSql('alter table "conversations" alter column "updated_at" type date(0) using ("updated_at"::date(0));');

    this.addSql('alter table "messages" alter column "created_at" type date(0) using ("created_at"::date(0));');
    this.addSql('alter table "messages" alter column "updated_at" type date(0) using ("updated_at"::date(0));');

    this.addSql('alter table "users" alter column "created_at" type date(0) using ("created_at"::date(0));');
    this.addSql('alter table "users" alter column "updated_at" type date(0) using ("updated_at"::date(0));');
  }

}
