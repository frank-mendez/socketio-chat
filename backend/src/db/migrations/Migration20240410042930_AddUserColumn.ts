import { Migration } from '@mikro-orm/migrations';

export class Migration20240410042930_AddUserColumn extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "users" add column "full_name" varchar(255) not null, add column "gender" varchar(255) not null, add column "profile_picture" varchar(255) not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "users" drop column "full_name", drop column "gender", drop column "profile_picture";');
  }

}
