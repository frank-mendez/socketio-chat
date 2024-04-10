import {defineConfig} from "@mikro-orm/postgresql";
import 'dotenv/config';
import {UserEntity} from "./db/entities/user.entity";
import * as path from "node:path";
import { SeedManager } from '@mikro-orm/seeder';
import {Migrator} from "@mikro-orm/migrations";

const config = defineConfig({
    dbName: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    // Migrations configuration
    migrations: {
        tableName: 'mikro_orm_migrations',
        path: path.resolve(__dirname, './db/migrations'),
        transactional: true,
        allOrNothing: true,
        dropTables: false,
        glob: '!(*.d).{js,ts}', // how to match migration files (all .js and .ts files, but not .d.ts)
        safe: false,
        emit: 'ts',
    },
    // Seeder configuration
    seeder: {
        path: path.resolve(__dirname, './db/seeders'),
        defaultSeeder: 'InitialSeeder',
        glob: '!(*.d).{js,ts}', // how to match seeder files (all .js and .ts files, but not .d.ts)
        emit: 'ts', // seeder generation mode
        fileName: (className: string) => className, // seeder file naming convention
    },
    // Entities configuration
    entities: [UserEntity],
    // Extensions configuration
    extensions: [SeedManager, Migrator],
    allowGlobalContext: true,
})

export default config