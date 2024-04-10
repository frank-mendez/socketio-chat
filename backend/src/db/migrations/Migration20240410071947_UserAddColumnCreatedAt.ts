import { Migration } from '@mikro-orm/migrations';

export class Migration20240410071947_UserAddColumnCreatedAt extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "users" add column "created_at" timestamptz not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "users" drop column "created_at";');
  }

}
